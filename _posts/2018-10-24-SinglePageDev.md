---
layout: post
title:  "记-前后分离开发"
categories: Webpack Vue
tags:  Webpack Vue js 工作经验
author: 陈超文
---

* content
{:toc}  

前后分离开发模式的坑  





# 后端无法获取session
那是因为webpack使用axios时，开发模式下异步提交不会带cookie，所以需要在前端axios设置credential，后端要设置接收跨域请求(因为webpack的开发服务器与后台真正的服务器不同源)与credentia。 详情请看：[前后端分离session问题](https://blog.csdn.net/fwk19840301/article/details/80675547 "前后端分离session问题")
# 前端无法获取cookie
当webpack开发服务器与后端服务器不在同一个ip上时，ajax响应就不会带有set-cookie的header，所以开发时应都在同一个服务器上
#使用axios的post时无法跨域（已设置好以上两点）
可能应为在restful中post是创建资源，所以axios禁止post跨域。开发中用还是get比较方便