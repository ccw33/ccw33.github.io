---
layout: post
title:  "Win10内置Ubuntu共用win10的docker-ce"
categories: Win10开发
tags:  Win10开发
author: 陈超文
---

* content
{:toc}  

解决win10内置ubuntu无法使用docker问题








# 原理
	win10上内置ubuntu由于是进程启动，所以无没有docker后台进程，我们可以通过docker提供的使用远程后台docker的方式访问windows的docker
# 安装win10 docker-ce
	直接到官网下载安装包即可  https://docs.docker.com/engine/installation/
# 暴露docker接口
	打开docker-ce界面，选择General，勾选Expose daemon on tcp://localhost:2375 without TLS
# 安装win10内置ubuntu
	参考：https://zhuanlan.zhihu.com/p/37643715
# 设置ubuntu上的DOCKER_HOST环境变量
	#Connetc to docker-ce on Windows
	export DOCKER_HOST=tcp://127.0.0.1:2375
# OK，可以直接使用docker调用windows的docker-ce
# 注意事项
## 路径映射
	我们可以在ubuntu里面看到windows的c、d盘等是在/mnt/c或/mnt/d。但设置路径映射的时候，windows路径是/host_mnt/c或/host_mnt/d，如：
```shell
docker run --name iot-server -id -p 50022:22 -p 53306:3306 -v /host_mnt/d/Docker/iot-server/:/root/ iot-server /bin/bash
```