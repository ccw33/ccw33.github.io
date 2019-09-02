---
layout: post
title:  "MySql 索引优化"
categories: MySql
tags:  MySql 索引 优化
author: 陈超文
---

* content
{:toc}  

MySql 索引分析与优化





# 深入理解 MySQL 索引

## MySql索引数据结构：B+树

MySQL 索引是排好序的数据结构。最简单的索引实现是二叉树，但是对于数据量大的表 会造成索引深度过高，IO次数过多。

因此要使用B+树来实现，可以把树的深度限制在3、4层。

![image](https://note.youdao.com/yws/public/resource/58eb3d4d1d98c6a431279136bb884582/62640B3E0F5640F6AD9F51BE49EB2169?ynotemdtimestamp=1567419015651)
![image](https://note.youdao.com/yws/public/resource/58eb3d4d1d98c6a431279136bb884582/F03A8A9E3BDD491DB3849438737D8614?ynotemdtimestamp=1567419015651)

## 存储引擎

### 作用对象
是对表的：
![image](https://note.youdao.com/yws/public/resource/58eb3d4d1d98c6a431279136bb884582/42F5340D484E425EBCC1D166493C9EBD?ynotemdtimestamp=1567419015651)

### 从磁盘文件看出存储引擎的区别

![image](https://note.youdao.com/yws/public/resource/58eb3d4d1d98c6a431279136bb884582/A4B2EDE4C19749E88CA7B8F7173FBBA2?ynotemdtimestamp=1567419015651)

- MyISAM：非聚集索引

![image](https://note.youdao.com/yws/public/resource/58eb3d4d1d98c6a431279136bb884582/CDC62E9EE05042A2BEFE516571284E3B?ynotemdtimestamp=1567419015651)

![image](https://note.youdao.com/yws/public/resource/58eb3d4d1d98c6a431279136bb884582/2ED6F20FD03B4C4DB96576840102FB97?ynotemdtimestamp=1567419015651)

- InnoDB：聚集索引

![image](https://note.youdao.com/yws/public/resource/58eb3d4d1d98c6a431279136bb884582/AD6BA36288634ADBB0E3C8898FFCF384?ynotemdtimestamp=1567419015651)

![image](https://note.youdao.com/yws/public/resource/58eb3d4d1d98c6a431279136bb884582/5CF5B3872C0D4FCF86212CD1E3C6934C?ynotemdtimestamp=1567419015651)


- 但其实索引不一定只有B+树，还有hash表，但是hash表无法使用范围查询，因为hash没有顺序存储。



