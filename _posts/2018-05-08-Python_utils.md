---
layout: post
title:  "Python 自用工具"
categories: Python Utils
tags:  Python Utils
author: 陈超文
---

* content
{:toc}

自己编写的utils




# 打印方法调用用时，并记录在mysql数据库
```python
# coding:utf-8
'''
作用，供debug使用的装饰器
'''
import functools
import time,datetime
import sys
from types import MethodType
import re
import logging
from logging.handlers import RotatingFileHandler
from sqlalchemy import Column, String, create_engine,Integer,Float,DateTime
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


# --------------------------------------------数据路记录----------------------------------------------------------------

# 创建对象的基类:
Base = declarative_base()

# 定义User对象:
class UsedTime(Base):
    # 表的名字:
    __tablename__ = 'time_record'

    # 表的结构:
    id = Column(Integer, primary_key=True,autoincrement=True)
    created_at = Column(DateTime,default=datetime.datetime.now())
    path = Column(String(255))
    line_num = Column(Integer)
    func_name = Column(String(50))
    used_time = Column(Float)
    args = Column(String(255))
    kw = Column(String(255))

if __name__=='__main__':
    from sqlalchemy import create_engine
    # engine = create_engine('mysql+pymysql://bdcos:bdcos@172.16.6.245/bluedon',encoding='utf-8',echo=True)
    engine = create_engine('mysql+pymysql://root:c009cead45cd64be21b4@10.172.10.155:3306/test',encoding='utf-8',echo=True)
    Base.metadata.create_all(engine)

# 初始化数据库连接:
engine = create_engine('mysql+pymysql://root:c009cead45cd64be21b4@10.172.10.155:3306/test')
# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)


# --------------------------------------------日志记录----------------------------------------------------------------
logger = logging.getLogger(__name__)
logger.setLevel(level = logging.INFO)
# 定义一个RotatingFileHandler，最多备份3个日志文件，每个日志文件最大1K
# rHandler = RotatingFileHandler("openstack_dashboard/dashboards/utils/decorator/log",maxBytes = 1*1024,backupCount = 3)
rHandler = logging.FileHandler("openstack_dashboard/dashboards/utils/decorator/log")
rHandler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
rHandler.setFormatter(formatter)
logger.addHandler(rHandler)

# console = logging.StreamHandler()
# console.setLevel(logging.DEBUG)
# console.setFormatter(formatter)
# logger.addHandler(console)


# logger.info("Start print log")
# logger.debug("Do something")
# logger.warning("Something maybe fail.")
# logger.info("Finish")

def print_time(bound=0.1):
    '''
    打印此调用此方法所使用的时间
    :param func:
    :return:
    '''

    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            begin = time.time()
            result = func(*args, **kw)
            end = time.time()
            if end - begin > bound:
                logger.warning('\n%s \n%s: %s%s with %s\nusetime: %s \n##########################\n' % (
                    'horizon/'+'/'.join(func.func_code.co_filename.split('/')[6:]),func.func_code.co_firstlineno+1, func.func_code.co_name,func.func_code.co_varnames,str(args),str(end - begin)))

                # 创建session对象:
                session = DBSession()
                # 创建新User对象:
                new_user = UsedTime(path='horizon/'+'/'.join(func.func_code.co_filename.split('/')[6:]),
                                    line_num=func.func_code.co_firstlineno+1,
                                    func_name=str(func.func_code.co_name)+str(func.func_code.co_varnames),
                                    used_time=end - begin,
                                    args=str(args),
                                    kw=str(kw)
                                    )
                # 添加到session:
                session.add(new_user)
                # 提交即保存到数据库:
                session.commit()
                # 关闭session:
                session.close()
            return result
        return wrapper
    return decorator


# class TestTimeMixin(object):
#
#     def __init__(self, *args, **kwargs):
#         super(TestTimeMixin, self).__init__(*args, **kwargs)
#         for m_or_s in dir(self):
#             if callable(getattr(self,m_or_s)):
#                 if not re.match(r'^__.*',m_or_s):
#                     func = getattr(self, m_or_s)
#                     self.__setattr__(m_or_s,MethodType(func,self))
#
#     def __new__(cls, *args, **kwargs):
#         pass


# class TestTimeMetaclass(type):
#     def __new__(cls, name, bases, attrs):
#         for k, v in attrs.items():
#             if callable(v):
#                 a = v
#                 b = a
#         attrs['add'] = lambda self, value: self.append(value)
#         return type.__new__(cls, name, bases, attrs)
```
# 把obj对象转换为dict
**为了把Python对象传去前端**
## import
```python
# coding:utf-8

import traceback
from django.template.defaultfilters import safe
from HTMLParser import HTMLParser
```
## def new_obj_to_dict
```python
def default_get_result(obj,attr,to_string=True):
    '''
    默认的获取结果方法，以为attr有可能是属性或者function名，所以统一在这里获取结果,
    如attr = 'name' 、 attr = 'get_name()'
    :param obj:从此obj中获取attr相应的值，getattr(obj,attr)
    :param attr:需要获得的obj中的属性
    :param to_string:是否把获取的结果转为前端可用的类型
    :return:str
    '''
    result = ''
    if attr.find('()') == -1:  # 属性
        result = getattr(obj, attr)
    else:  # 方法
        try:
            result = getattr(obj, attr.replace('()', ''))()
        except TypeError as e:  # 并不是方法，则是属性
            result = getattr(obj, attr.replace('()', ''))
    if to_string:
        return parse_string(result)
    else:
        return result


def new_obj_to_dict(obj, dict_temp):
    '''
    吧对象转换为dict_temp类似的dict，如：
    new_obj_to_dict(action,
                                 {'method':'',
                                  'name':'',
                                  'bound_url':'',
                                  'verbose_name':'',
                                  'attr_string_nc':'',
                                  'action_type':'',
                                  'icon':'',
                                  'handles_multiple':'',
                                  'verbose_name_plural':'',
                                  'help_text':'',
                                  'table': {'name': ''},
                                  'get_param_name()':'',
                                  'get_default_classes()':'',
                                  'get_final_css()':'',
                                  }
                                 )
    建议用这个方法进行局部转换，省时
    :param obj:
    :param dict_temp:
    :return:
    '''
    # 转换
    new_dict = {}
    if isinstance(dict_temp,dict):
        for k in dict_temp:
            if not hasattr(obj, k.replace('()', '')):  # 如果obj没有这个属性，跳过
                # new_dict[ k.replace('()', '')] = 'undefined'
                continue
            if isinstance(dict_temp[k], dict):#如果值为dict,说明需要细爬
                result = default_get_result(obj,k,False)
                new_dict[k.replace('()', '')] = \
                    new_obj_to_dict(result, dict_temp[k]) if result else result
                continue
            if isinstance(dict_temp[k], list):#如果值为list
                new_dict[k.replace('()', '')] = new_obj_to_dict(default_get_result(obj,k,False),dict_temp[k])
                continue
                # if len(dict_temp[k]) == 1:#如果list里面还有dict,说明不是要每个item转成字符串，而是每个item需要继续细爬，如[{'name';'','age':''}]
                #     new_dict[k.replace('()', '')] = [new_obj_to_dict(o, dict_temp[k][0]) for o in default_get_result(obj,k,False)]
                # else:
                #     # 遍历obj，每个obj parse_string一次
                #     new_dict[k.replace('()', '')] = [parse_string(o) for o in default_get_result(obj,k)]
                # continue
            if callable(dict_temp[k]):  # 如果值为function，则说明需要把结果过滤一下
                new_dict[k.replace('()', '')] = dict_temp[k](default_get_result(obj,k,False))
                continue

            new_dict[k.replace('()', '')] = default_get_result(obj,k)

        return new_dict

    if isinstance(dict_temp, list):#如果是list
        #如果dict_temp里面还有dict,说明不是要每个item转成字符串，而是每个item需要继续细爬，如[{'name';'','age':''}]
        if len(dict_temp)==1:
            new_list = [new_obj_to_dict(o,dict_temp[0]) for o in obj]
            return new_list
        # 遍历obj，每个obj parse_string一次
        new_list = [parse_string(o) for o in obj]
        return new_list


    #Usage:
    extra_context = {'obj': json.dumps(new_obj_to_dict(self, {
            '__str__()': '',
            'needs_form_wrapper()': '',
            'get_full_url()': '',
            'get_columns()': [{
                '__str__()': '',
                'attr_string': '',
                'help_text': '',
                'get_summation()': lambda result: "&ndash;" if result == None else result
            }],
            'get_rows()': lambda rows: [
                {'attr_string': parse_string(row.attr_string),
                 'cells': [new_obj_to_dict(cell, {'inline_edit_mod': '',
                                                  'update_allowed': '',
                                                  'value': lambda v: v if isinstance(v, dict) else parse_string(v),
                                                  'column': {'form_field': {'label': ''}},
                                                  'id': '',
                                                  'wrap_list': '',
                                                  'attr_string': '',
                                                  }) for cell in row]
                 } for row in rows],
            'slugify_name()': '',
            'request': {'path()': ''},
            'css_classes()': '',
            'render_table_actions()': '',
            'breadcrumb': {'render()': ''},
            'is_browser_table()': '',
            'needs_filter_first': '',
            'get_filter_first_message()': '',
            'get_empty_message()': '',
            'footer': '',
            'has_prev_data()': '',
            'has_more_data()': '',
            'needs_summary_row': '',
            'get_prev_pagination_string()': '',
            'get_pagination_string()': lambda v: v + '&ajax=true' if self.ajax_dropdown else v,
            'ajax_dropdown':''
        })),
                         'hidden_title': self._meta.hidden_title,
                         'wrapper_slugify_name': 'wrapper_' + self.slugify_name(),
                         }
        return table_template.render(template.RequestContext(self.request, extra_context))

```

## def parse_string
```python
<pre style="background-color:#2b2b2b;color:#a9b7c6;font-family:'DejaVu Sans Mono';font-size:7.5pt;">def parse_string(result, recursive=False):
    '''
  选择性的转成字符串
 True ，False转成’true‘，’false'
 None转‘’
 tuple，set转成list，如果recursive为False(默认)里面的每个item转成字符串，如果为True，则递归转换
 dict保持不变，如果recursive为False(默认)里面的每个value转成字符串，如果为True，则递归转换
  :param result:  :return:
 '''  try:
        is_list = result.__class__ == [].__class__
        is_tuple = result.__class__ == tuple().__class__
        is_set = result.__class__ == set().__class__
        is_dict = result.__class__ == dict().__class__

        if isinstance(result, bool):
            # result = 'true' if result else 'false'
  return result
        if isinstance(result, type(None)):
            # result = ''
  return result
        if is_list or is_tuple or is_set:
            result = list(result)
            for index, item in enumerate(result):
                if recursive:
                    parse_string(result[index])
                else:
                    result[index] = str(item)
            return result
        if is_dict:
            for k, v in result.items():
                if recursive:
                    parse_string(result[k])
                else:
                    result[k] = str(v)
            return result
        result = str(result)
        return result
    except UnicodeEncodeError as e:
        result = result.encode('utf-8')
        return result
    except Exception as e:
        traceback.print_exc()</pre>

```
## def obj_to_dict
```python
def special_operactor(obj, vals, special_container={}, *args, **kwargs):
    '''
    特殊值处理器
    :param obj:需要处理的对象
    :param vals:该对象中需要特殊处理的值
    :param special_container:容器，便于递归
    :param args:
    :param kwargs:
    :return:
    '''
    for val in vals:  # 遍历所有链，如 ['student', 'student.name', 'student.student_list', 'student.student','student.print_name()']
        if len(val.split('.')) > 1:  # 如果链长大于1，如 studeng.name
            if val.split('.')[0] not in special_container:  # 如果special_container里面没有student,则给一个空的dict
                special_container[val.split('.')[0]] = {}
            else:  # 如果special_container里面有student，说明这个student可调用，把本来的值放到一个新的dict里面，且key为self
                if 'self' in special_container[val.split('.')[0]]:  # 如果student里面有self，不用动
                    pass
                else:  # student里面没有self。把本来的值放到一个新的dict里面，且key为self
                    special_container[val.split('.')[0]] = {'self': special_container[val.split('.')[0]]}
            special_container[val.split('.')[0]] = special_operactor(getattr(obj, val.split('.')[0]), [
                reduce(lambda v1, v2: v1 + v2, val.split('.')[1:])], special_container=special_container[
                val.split('.')[0]])
        else:
            if hasattr(obj, val.replace('()', '')):  # 先判断有没有该attribute
                if val.find('()') == -1:  # 如果是属性
                    special_container[val] = parse_string(getattr(obj, val))
                else:  # 如果是方法
                    try:
                        result = getattr(obj, val.replace('()', ''))()
                    except TypeError:  # 传入参数不够,传空字符串
                        result = ''
                    if isinstance(result, set) or isinstance(result, list):
                        result = list(result)
                    special_container[val.replace('()', '')] = parse_string(result)
            else:  # 没有该attribute
                if val.find('()') == -1:  # 如果是属性
                    special_container[val] = parse_string(None)
                else:  # 如果是方法
                    special_container[val.replace('()', '')] = parse_string(None)

    return special_container


def obj_to_dict(obj, deep=0, max_deep=0, special_parsers=[]):
    '''
    把对象转成dict(不推荐用，整个对象转耗时太久)
    :param obj:需要转成dict的对象
    :param deep:目前递归的深度，递归用到
    :param max_deep:最大递归深度（因为容易溢出，所以要限制）
    :param special_parsers:需要特殊转换的值
    special_parsers = [
        {'locate': lambda obj, deep, max_deep, special_parsers: deep == 2, #符合locate的就是需要特殊转换值的对象
         'vals': ['table.name', 'get_default_classes()', 'get_final_css()', 'get_link_url()']}, #需要特殊转换的值
    ]
    :return:
    '''
    try:
        # 处理需要特殊转换的值,用特殊容器obj.special_parse_container(dict)来装着
        if hasattr(obj, '__dict__') and special_parsers:  # 只有是对象才进行
            for special_parser in special_parsers:
                if special_parser['locate'](obj, deep, max_deep, special_parsers):
                    obj.special_parse_container = {}
                    special_operactor(obj, special_parser['vals'], obj.special_parse_container)

        if max_deep:
            if deep > max_deep:  # 递归深度为max_deep，防止出现RuntimeError
                return parse_string(obj)

        is_list = obj.__class__ == [].__class__
        is_tuple = obj.__class__ == tuple().__class__
        is_set = obj.__class__ == set().__class__
        is_dict = obj.__class__ == dict().__class__

        new_obj = {}

        # 如果有__dict__
        if hasattr(obj, '__dict__'):
            for attr in dir(obj):
                if not attr.startswith('_'):  # 私有方法不转dict
                    # if callable(getattr(obj,attr)):# 如果是instancemethod，直接调用，只收集参数只有self的方法
                    #     try:
                    #         new_obj[attr] = getattr(obj,attr)(obj)
                    #     except Exception:
                    #         continue
                    # else:
                    if attr == 'special_parse_container':  # special_parse_container不用转
                        new_obj[attr] = getattr(obj, attr)
                    else:
                        new_obj[attr] = obj_to_dict(getattr(obj, attr), deep=deep + 1, max_deep=max_deep,
                                                    special_parsers=special_parsers)
            # for k, v in obj.__dict__.items():
            #     new_obj[k] = obj_to_dict(v,deep = deep+1,max_deep = max_deep)
            return new_obj if new_obj else parse_string(obj)

        # 如果是list或set，遍历转
        if is_list or is_tuple or is_set:
            obj_arr = []
            for o in obj:
                # 把Object对象转换成Dict对象
                obj_arr.append(obj_to_dict(o, deep=deep + 1, max_deep=max_deep, special_parsers=special_parsers))
            return obj_arr if obj_arr else parse_string(obj)

        # 如果本来就是dict，遍历转
        if is_dict:
            for k, v in obj.items():
                new_obj[k] = obj_to_dict(v, deep=deep + 1, max_deep=max_deep, special_parsers=special_parsers)
            return new_obj if new_obj else parse_string(obj)

        # 如果都不是，直接转成str
        return parse_string(obj)

    except Exception as e:
        # 如果报错，直接转成str
        traceback.print_exc()
        return parse_string(obj)


class Teacher:
    student = ''

    def __init__(self, student):
        self.student = student


class Student:
    name = ''
    age = 0

    def __init__(self, name, age, student=None, student_list=[]):
        self.name = name
        self.age = age
        self.student = student
        self.student_list = student_list

    def print_name(self):
        print(self.name)


# if __name__ == '__main__':
#     xixi = Student('xixi', 15)
#     t = Teacher(Student('haha ', 90,
#                         student=xixi,
#                         student_list=[xixi, xixi, xixi, xixi]))
#     print(t)
#     d = obj_to_dict(t)
#     print(d)
#     print(obj_to_dict([1, 2, 3, 4]))
#     print(obj_to_dict((1, 2, 3, 4)))
#     print(obj_to_dict(set([1, 2, 3, 4])))
#     print(obj_to_dict([]))


if __name__ == '__main__':
    import json

    xixi = Student('xixi', 15)
    t = Teacher(Student('haha ', 90,
                        student=xixi,
                        student_list=[xixi, xixi, xixi, xixi]))
    dic = {}
    con = special_operactor(t, ['student', 'student.name', 'student.student_list', 'student.student',
                                'student.print_name()'], dic)

    special_parsers = [
        {'locate': lambda obj, deep, max_deep, special_parsers: isinstance(obj, Teacher),
         'vals': ['student', 'student.name', 'student.student_list', 'student.student',
                  'student.print_name()']},
    ]
    b = obj_to_dict(t, special_parsers=special_parsers)
    c = json.dumps(b)
    a = 1

```
