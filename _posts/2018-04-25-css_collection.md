---
layout: post
title:  "CSS样式集合"
categories: CSS
tags:  CSS 工作经验
author: 陈超文
---

* content
{:toc}


工作中常用样式集合




# 简单对齐：inline-flex
[http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
```css
//简单对其排版样式
.inline-flex(@flex-direction:row,@justify-content:flex-start,@align-items:baseline,@flex-wrap:nowrap,@fullFill:true) {
  display: inline-flex;
  display: -webkit-inline-flex;
  justify-content: @justify-content;
  -webkit-justify-content: @justify-content;
  align-items: @align-items;
  -webkit-align-items: @align-items;
  flex-wrap: @flex-wrap;
  -webkit-flex-wrap: @flex-wrap;
  flex-direction: @flex-direction;
  -webkit-flex-direction: @flex-direction;
  //& when (@fullFill) {
  //width: 100%;
  //}
}
```

# 状态显示与转换按钮
![](/img/20180425css/177673204.png)
```css
// 状态显示与转换按钮
.status_checkbox() {
  //<div class="status_checkbox">
  //  <input type="checkbox" class="scaling_status_input" {% if scaling_state %}checked{% endif %}>
  //  <label></label>
  //</div>
  position: relative;
  display: inline-block;
  &::after, &::before {
    font-family: FontAwesome;
    -webkit-font-feature-settings: normal;
    -moz-font-feature-settings: normal;
    font-feature-settings: normal;
    -webkit-font-kerning: auto;
    -moz-font-kerning: auto;
    font-kerning: auto;
    -webkit-font-language-override: normal;
    -moz-font-language-override: normal;
    font-language-override: normal;
    font-stretch: normal;
    font-style: normal;
    font-synthesis: weight style;
    font-variant: normal;
    font-weight: normal;
    text-rendering: auto;
  }
  label {
    background: #bbb;
    height: 10px;
    width: 45px;
    position: relative;
    display: inline-block;
    border-radius: 45px;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    &::after {
      background: #fff;
      top: -6px;
      width: 20px;
      height: 20px;
      content: '';
      position: absolute;
      border-radius: 100%;
      left: 0;
      z-index: 2;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
  }
  input {
    position: absolute;
    left: 0 !important;
    top: 0 !important;
    margin-left: 0 !important;
    width: 100%;
    height: 100%;
    z-index: 5;
    opacity: 0;
    cursor: pointer;
    &:hover + label::after {
      box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.2), 0 3px 8px 0 rgba(0, 0, 0, 0.15);
    }
    &:checked + label {
      background: #376ecb;
    }
    &:checked + label::after {
      background: #4285F4;
      left: 28px;
    }
  }
}

```