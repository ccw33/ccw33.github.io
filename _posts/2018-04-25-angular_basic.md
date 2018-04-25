---
layout: post
title:  "Angular基础"
categories: Angular
tags:  Angular 学习笔记
author: 陈超文
---

* content
{:toc}

Angular基础知识




<address>[https://angular.cn/guide/architecture#%E6%8C%87%E4%BB%A4-directive](https://angular.cn/guide/architecture#%E6%8C%87%E4%BB%A4-directive)</address>

# 模块 Module

![](/20180425angular/22162157.png)

文件名：如 [app.module.ts](file://F:\Angular\angular-tour-of-heroes\src\app\app.module.ts)
一个angular项目由多个模块组成，从一个根模块开始，以树桩的形式扩展
module的作用就是声明程序结构以及各个组件、服务、插件之间的引用关系

* * *

## 组件与模板

![](/20180425angular/22487856.png)

### 组件 Component

文件名：例如 hero-detail.component.ts
组件才是angular渲染页面的核心，它的作用是声明模板、样式，获取数据，渲染模板，以及响应模板的各种动作。当然，这些功能一般都会‘外包’出去，从而使整个组件结构更清晰。

### 模板 Template

文件名：hero-detail.component.html
简单来说就是混合了angular指令的html，是页面展示的骨架

#### 数据绑定 databinding

即组件和模板之间的数据同步，以及父子组件之间的数据同步，通过angular的指令来控制
![](/20180425angular/21741204.png)

#### 指令 directive

分为结构型指令和属性型指令 _structural_ and _attribute_ directives.
结构型指令就是改变文档结构的指令
```html
<li *ngFor="let hero of heroes"></li>
<app-hero-detail *ngIf="selectedHero"></app-hero-detail>
```
属性型指令就是起数据绑定作用的指令
```html
<input [(ngModel)]="hero.name">
```

* * *

## 元数据 Metadata

其实就是angular的装饰器，如@Component
![](/20180425angular/22834677.png)

* * *

## 服务 Service

![](/20180425angular/23366734.png)

就是组件外包出去的工作，主要是获取原始数据，以及处理逻辑行为

### 依赖注入Injection

组件引入服务的方式，跟Spring框架的依赖注入所用一样，以这种方式注入对象，相比new出来更加容易维护。
注入之前要在module上声明：![](/20180425angular/22727208.png)
然后再构建函数中注入：

![](/20180425angular/22767316.png)

* * *

# 其他一些重要特性

**用到的时候再查官方文档**

**[动画](https://angular.cn/guide/animations)**：用 Angular 的动画库让组件动起来，而不需要对动画技术或 CSS 有深入的了解。

**变更检测**：变更检测文档会告诉你 Angular 是如何决定组件的属性值变化，什么时候该更新到屏幕， 以及它是如何利用**区域 (zone)** 来拦截异步活动并执行变更检测策略。

**事件**：事件文档会告诉你如何使用组件和服务触发支持发布和订阅的事件。

[**表单**](https://angular.cn/guide/forms)：通过基于 HTML 的验证和脏检查机制支持复杂的数据输入场景。

[**HTTP**](https://angular.cn/guide/http)：通过 HTTP 客户端，可以与服务器通讯，以获得数据、保存数据和触发服务端动作。

[**生命周期钩子**](https://angular.cn/guide/lifecycle-hooks)：通过实现生命周期钩子接口，可以切入组件生命中的几个关键点：从创建到销毁。

[**管道**](https://angular.cn/guide/pipes)：在模板中使用管道转换成用于显示的值，以增强用户体验。例如，`currency`管道表达式：

> `price | currency:'USD':true`

它把价格“42.33”显示为`$42.33`。

[**路由器**](https://angular.cn/guide/router)：在应用程序客户端的页面间导航，并且不离开浏览器。

[**测试**](https://angular.cn/guide/testing)：使用 _Angular 测试平台_，在你的应用部件与 Angular 框架交互时进行单元测试。

<small>来源： [https://angular.cn/guide/architecture#%E6%80%BB%E7%BB%93](https://angular.cn/guide/architecture#%E6%80%BB%E7%BB%93)</small>
2018年2月11日