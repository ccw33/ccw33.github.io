---
layout: post
title:  "Pycharm远程单步调试"
categories: Python Pycharm
tags:  Python Pycharm 工作经验
author: 陈超文
---

* content
{:toc}

Pycharm远程单步调试




# 本地创建新项目
File-->New Project-->Pure Python-->Create-->Open in new window
# 设置Deployment
作用：从远端项目文件并建立映射，随时更新同步
步骤：
- File-->Settings-->搜索Deployment并点击-->点击‘+’号
- -->填Name（随便），Type选择SFTP（因为需要传输文件），点击‘OK’
- -->只需填写Connection和Mapping两个面板，
Connecting：
SFTP host：远端设备的ip
Port:默认22
Root path:默认‘/’就可以了，即根目录，
User name:登录远端设备的用户名，如root
Password:登录远端设备所用的密码，如123456。记住勾选右边的Save Password
Mapping:
Local path:你希望把远端项目拉到本地的哪个目录
Deployment path on server 'xxx':需要拉取的远端项目目录
Web path on server 'xxx':默认‘/’即可
- 右键点击左侧本地目录的根目录-->Deployment-->Download from xxxx

# 设置远端python解析器
作用：调试的时候，项目实际上是在远端设备上运行，同步映射到本地Pycharm上。所以实际上用的解析器是远端的python解析器。
- File-->Settings-->搜索Project Interpreter
- -->点击Project Interpreter选项最右端的的齿轮，选择Add Remote
- -->勾选SSH Credentials，填写方法跟Deployment一样，最后的Python interpreter path:就是远端python解析器的路径，一般使用默认‘/usr/bin/python’即可
- -->点击OK-->OK,pycharm会自动加载远端python库

# 添加调试设置
作用：单步调试
- 点击Edit Configurations
![](/img/20180508pycharm/20180508104754.png)
- 点击左上角的‘+’号创建你需要的设置（不同的项目有不同的配置，具体如何配置请自行google）
例子：Django项目
1. 点击‘+’号之后选择Django Server,类似图片那样配置
![](/img/20180508pycharm/20180508105617.png)
2. File-->Settings-->Language&Frameworks-->Django,类似图片那样配置
![](/img/20180508pycharm/20180508105858.png)