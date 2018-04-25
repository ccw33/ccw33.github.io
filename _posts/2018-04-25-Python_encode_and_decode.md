---
layout: post
title:  "Python编码问题"
categories: Python
tags:  Python 编码
author: 陈超文
---

* content
{:toc}


理清python编码问题





编码与解码的问题

## 底层和程序的编码解码

计算机底层的编码与解码，和我们程序的编码解码不一样

计算机底层的是文字对应0101，程序中的是utf-8，ascii等与unicode之间的转换

# 历史：

## 底层编码解码的出现
| 人类语言－－>0101（通用）  | 解码  |  编成码 |
| :------------: | :------------: | :------------: |
|  0101（通用）－－>人类语言 |解码   | 解成字  |


## 人类编码解码的出现

### ascii

ascii出现，专门服务于美国人，一个字节表示一个英文字母

### unicode(标准)

后来不够用，出现了unicode标准，所有字符都用两个字节表示（包括英文字母），标准但是浪费内存

因为标准这个特性成为机器运行的时候统一使用的编码（类似于0101是展示给计算机底层的标准，unicode是运行展现时的标准，记住，unicode就是标准）

### utf-8(存储)

但是由于unicode浪费内存，所以根据unicode标准发明了英文一个字节表示一个字符，其他语言多个字节表示一个字符的变长编码，其中最著名的是utf-8

由于utf-8变长，而且包含了世界各地的语言，因此成为了存储内容时所用的编码。

### 程序编码之间的转换

记住：utf-8是根据unicode转变过来的，如中文unicode 一般是两个字节，utf-8把两个字节切成三分，再补上01变成3个字节，因此两种编码可以按照规则互相转换，

因此，当从内存中提取内容运行，是：

0101的utf-8－－>转换为0101的unicode内容

当运行完的内容要存储时：

0101的unicode－－>转换微0101的utf-8

## python的编码问题

当然，这与我们要解决的python问题不一样

在python中，编码与解码不是执人类语言和0101之间的转变，而是str类型与unicode类型的转变（他们都是basestring的子类）

### 类比机器编码

|  str－－>unicode| 复杂－－>通用 | 解码|
| :------------: | :------------: | :------------: |
|  unicode－－>str| 通用－－>复杂| 编码 |

### 以utf8为例

显而意见，unicode是unicode码，那str是什么码呢？

答案是系统默认编码。window默认gbk，linux默认utf-8（或者按照自己的python设置）

因此，如果默认编码是utf-8，那么

#### 解码

|            |解码前 | 解码后 |
| :------------: | :------------: | :------------: |
| python代码 | ‘好’.decode(‘utf-8’)| u’好’|
| 编码 | \xe5\xa5\xbd  |  u'\u597d'|
| 字节数 | 3字节  | 2字节  |
| python类型 |  str类 | unicode类 |

（注意：编码是16进制的，两位一字节）

#### 编码

 |            |编码前 | 编码后 |
 | :------------: | :------------: | :------------: |
| python代码 | ‘ u’好’.encode(‘utf-8’)| ‘好’|
| 编码 | u'\u597d'　|  \xe5\xa5\xbd|
| 字节数 | 2字节  | 3字节  |
| python类型 |  unicode类 | str类|

（注意：编码是16进制的，两位一字节）

**因此，编码的转换只要用这两个方法就行了。**

#### python2如何避免乱码

如果不想出现乱码现象尽量不要用str()和unicode()。为什么呢？

因为 ：

str(unicode)  和   unicode(str)  是

u.encode(‘ascii’) 和   s.decode(‘ascii’)的简写。

所以一旦再这两个方法了出现中文就会报错,（如果phthon设置了默认编码为utf-8则utf-8代替ascii，这样就不会报错）。

注意：str(str)和unicode(unicode)是没用的

<small>来源： [https://note.wiz.cn/pages/manage/doc/history.html?obj_guid=2bc0b7e1-2d31-499a-be27-2e02adac5792&kb_guid=&obj_type=document&doc_guid=2bc0b7e1-2d31-499a-be27-2e02adac5792&ts=1524563208884](https://note.wiz.cn/pages/manage/doc/history.html?obj_guid=2bc0b7e1-2d31-499a-be27-2e02adac5792&kb_guid=&obj_type=document&doc_guid=2bc0b7e1-2d31-499a-be27-2e02adac5792&ts=1524563208884)</small>