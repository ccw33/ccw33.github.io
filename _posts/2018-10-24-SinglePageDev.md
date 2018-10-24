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





# Vue中的对象赋值问题
由于 let obj_a = obj_b 并不是对象复制，而是让obj_a和obj_b指向同一个对象，当其中修改其中一个的时候，其实是修改同一个对象。
因此vue中应该尽量少使用
```javascript
props: {
      lan_data: {
        type: Object,
        required: true,
        validator: function (value) {
          return true;
        }
      },
    },
data() {
      return {
        lan:this.lan_data,
      }
    },
```
因为修改子组件的lan的时候也会修改父组件的lan_data'
**PS:**但是可以利用这个特点同步父子组件的属性，不需要使用事件通知父组件这么麻烦
## 解决方案
所有对象都是逐个属性的复制：
```javascript
new_obj = {...obj}

// 或者
  // 对象复制方法，包括数组
  copy(obj) {
    if (!(obj instanceof Object)) {
      return obj;
    }
    if (obj instanceof Array) {
      let newobj = Array(obj.length);
      for (let index in obj) {
        newobj[index] = this.copy(obj[index])
      }
      return newobj;
    } else {
      let newobj = {};
      for (var attr in obj) {
        newobj[attr] = this.copy(obj[attr]);
      }
      return newobj;
    }
  }
```
