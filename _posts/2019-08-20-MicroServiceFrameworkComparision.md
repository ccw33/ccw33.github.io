---
layout: post
title:  "微服务框架对比"
categories: Java
tags:  Java MicroService comparision
author: 陈超文
---

* content
{:toc}  

Java 微服务框架 Netflix、Dubbo + Zookeeper、Spring Cloud Alibaba 对比






| 服务\框架        | Netflix             | Zookeeper \+ Dubbo   | Spring Cloud Alibaba |
|---------|---------------------|----------------------|----------------------|
| 服务注册与发现 | Spring Cloud Eureka | Zookeeper            | Nacos                |
| 统一网关    | Zuul                | Spring Cloud Gateway | Spring Cloud Gateway |
| 分布式配置中心 | Spring Cloud Config | Spring Cloud Config  | Nacos                |
| 服务熔断    | Hytrix              | Hytrix               | Sentinel             |
| 链路追踪    | Zipkin              | Zipkin               | SkyWalking           |
| 对内通信    | HttpClient          | Dubbo \+ Kyro        | Dubbo \+ Kyro        |
| 对外通信    | HttpClient          | HttpClient           | HttpClient           |
