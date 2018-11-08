---
layout: post
title:  "Python Magic"
categories: Webpack Vue
tags:  Python 工作经验
author: 陈超文
---

* content
{:toc}  

Python定制类 





# Python Magic
## 将调用转成字符创（RPC用得上）
```python
class B:
    class Magic:
        def __init__(self, attr):
            self.attr = attr

        def __getattr__(self, name):
            '''
            自动将server.a.b.c转成字符串
            :param name: 
            :return: 
            '''
            return B.Magic('%s.%s' % (self.attr, name))

        def __call__(self, *args, **kwargs):
            '''
            自动将server.A().B()转成字符串
            :param args: 
            :param kwargs: 
            :return: 
            '''
            try:
                self.attr.index(')', -1, -1)
            except ValueError:
                pass
            return B.Magic('{0}({1}{2})'.format(self.attr,
                                                ','.join([str(arg) for arg in args]),
                                                '{0}{1}'.format(',' if kwargs else '',
                                                                ','.join(['{0}={1}'.format(k, v) for k, v in
                                                                          kwargs.items()]))))

        def __str__(self):
            return self.attr

        def __repr__(self):
            return self.__str__()

    def __getattr__(self, item):
        return B.Magic(item)


print(B().a.happy(1, 2, 3, a=1, b=2)) #a.happy(1,2,3,b=2,a=1)
```