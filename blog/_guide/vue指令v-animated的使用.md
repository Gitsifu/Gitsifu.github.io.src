---
title: vue指令v-animated的使用
date: 2020-12-08
tags:
  - Vue
  - animate.css
  - wowjs
author: sifu
location: 南昌
---

## 概述

Vue.js动画指令插件,此插件基于[animate.css4.x](https://animate.style/)和[wow.js](https://www.delac.io/wow/docs.html)实现

## 1、下载依赖

> 注意：animate.css版本请使用4.x

``` shell
npm install animate.css v-animated --save
```

## 2、导入
``` javascript
import Vue from 'vue'
import 'animate.css'
import Animated from 'v-animated'

Vue.use(Animated)
// or 参数请参考：https://www.delac.io/wow/docs.html
Vue.use(Animated,{
     boxClass:     'wow',      // default
     animateClass: 'animate__animated', // default
     offset:       0,          // default
     mobile:       true,       // default
     live:         true        // default
})
```
## 3、使用
``` html
// 更多动效请查阅：https://animate.style/
<h1 v-animated="'animate__bounce'">v-animated</h1>
或者不用指令直接使用class
<h1 class="wow animate__bounce">v-animated</h1>
```

## 4、源码仓库

[https://github.com/Gitsifu/v-animated](https://github.com/Gitsifu/v-animated)

## 5、实现效果

<ClientOnly>
  <v-animated></v-animated>
</ClientOnly>


<Vssue :title="$title" />