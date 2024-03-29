---
title: vue多页面开发配置
date: 2021-03-11
tags:
  - Vue
author: sifu
location: 南昌
---

> 了解更多: [vue部署nginx配置](/guide/vue多页面开发部署nginx配置)

## 一、多页面开发适用场景

在开发前端的时候，有时候会要开发一套pc端的系统，同时需要开发一套移动端系统，而两套系统功能差不多，但是又无法通过
css的媒体查询做两端适配，只能通过创建两个项目来开发两套相似的系统。这就导致了一个问题---需要通过
复制来保持两个项目公共部分的接口或者模块代码保持一致，如果改了一个地方，又要再去修改另外一个项目中的文件，
极其麻烦。

还有一种办法是，在同一个vue项目中的同一个路由对象中即配置pc端的路由，又配置移动端路由。但是打包出来之后，
访问pc端页面，又附带了移动端的页面文件，导致服务器的访问资源的浪费（虽然可通过懒加载解决，但难免有些不优雅）。
同时，如果在编写代码时控制不好，也可能出现pc端和移动端的css样式污染的问题。

这时就需要用到vue多页面开发来解决这个问题。

## 二、如何配置

### 1、创建`vue.config.js`，并配置相关必要配置

```javascript
// vue.config.js

module.exports = {
    pages: {
        pc: {
            // page 的入口
            entry: 'src/entry/pc.js',
            // 模板来源
            template: 'public/pc.html',
            // 在 dist/index.html 的输出
            filename: 'pc.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '环保在线监测云平台',
            chunks: ['chunk-vendors', 'chunk-common', 'pc']
        },
        mobile: {
            // page 的入口
            entry: 'src/entry/mobile.js',
            // 模板来源
            template: 'public/mobile.html',
            // 在 dist/index.html 的输出
            filename: 'mobile.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '环保在线监测云平台',
            chunks: ['chunk-vendors', 'chunk-common', 'mobile']
        },
    },
}
```
### 2、创建两个模板文件

- `public/pc.html`

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

- `public/moble.html`

```html
<!DOCTYPE html>
<html lang="">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
<noscript>
    <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
</noscript>
<div id="app"></div>
<!-- built files will be auto injected -->
</body>
</html>
```

### 2、创建两个路由页面

- `src/views_pc/Home.vue`

```vue
<template>
  <div>
      我是pc端首页
  </div>
</template>

<script>


export default {
  name: 'Home',
  components: {
  }
}
</script>
```

- `src/views_mobile/Home.vue`

```vue
<template>
    <div>
        我是移动端首页
    </div>
</template>

<script>
export default {
    name: "Home",
}
</script>

<style scoped>

</style>

```

### 3、创建两个路由

- `src/router/pc/index.js`

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../../views_pc/Home')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/pc',
  routes
})

export default router
```

- `src/router/mobile/index.js`

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../../views_mobile/Home')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: '/mobile',
    routes
})

export default router
```

### 4、创建两个入口文件

- `src/entry/pc.js`

```javascript
import Vue from 'vue'
import App from '../App.vue'
import router from '../router/pc'
import store from '../store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

- `src/entry/mobile.js`

```javascript
import Vue from 'vue'
import App from '../App.vue'
import router from '../router/mobile'
import store from '../store'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
```

## 三、如何访问

项目启动后，浏览器打开

- `http://localhost:8080/pc` 访问pc端路由页面
  
- `http://localhost:8080/mobile` 访问移动端路由页面

## 四、部署

> 部署根据不同的路由模式，**部署方式也有不同，同时访问的路径也有差异**

### 1、`hash` 模式

`nginx` 无需配置

访问地址：

- pc端：`http://example.com/pc.html#/`
- 移动端：`http://example.com/mobile.html#/`

### 2、`history` 模式

`nginx` 配置

```
# 精准匹配 '/' 重定向到pc页面，即访问pc.html文件
location = / {
  rewrite / /pc permanent;
}
# 匹配以 '/pc' 开头，访问pc.html文件
location ^~ /pc {
  try_files $uri $uri/ /pc.html;
}
# 匹配以 '/mobile' 开头，访问mobile.html文件
location ^~ /mobile {
  try_files $uri $uri/ /mobile.html;
}
```

访问地址：

- pc端：http://example.com/pc
- 移动端：http://example.com/mobile



## 五、示例项目GitHub地址

### 1、vue-cli + vue2示例代码

[https://github.com/Gitsifu/vue-multiple-page](https://github.com/Gitsifu/vue-multiple-page)

### 2、vite + vue3示例代码

[https://github.com/Gitsifu/vite-multipage](https://github.com/Gitsifu/vite-multipage)

<Vssue :title="$title" />


