---
title: TailwindCSS遇上Vue3和Vite
date: 2020-12-29
tags: 
  - Vue3
  - Vite
  - Tailwind CSS
author: sifu
location: 南昌
---

## 概述

[Tailwind CSS](https://tailwindcss.com/) 是一个前端css框架。
它和 [bootstrap](https://www.bootcss.com/) 不一样，Tailwind CSS是更加细粒度的css。
为用户提供了更多的定制化空间。

个人觉得，Tailwind CSS配合Vue第三方组件进行开发后台管理项目非常合适，第三方组件库负责主要布局，
Tailwind CSS负责进行样式微调。

如果是开发定制化比较高的网站，第三方组件库无法满足开发需求的时候，Tailwind CSS就是一个不错的选择。
无需重复写css样式，直接添加class，打包出来的文件大小也会相应的小很多。
同时Tailwind CSS提供了响应式布局，变更主题，暗主题等解决方案，做出一个高品质的网站不成问题

## 1、创建项目

```shell script
npx create-vite-app my-project

cd my-project
```

## 2、下载依赖

```shell script
npm install
```

## 3、安装Tailwind CSS

```shell script
npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat @tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```

## 4、创建配置文件

> 在项目根目录创建`tailwind.config.js` 和 `postcss.config.js` 文件:

```javascript
// tailwind.config.js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 5、导入Tailwind CSS

1、在 `./src/index.css`文件中添加如下内容

```css
/* ./src/index.css */

/*! @import */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

2、在 `./src/main.js` 中配置

```javascript
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')
```

大功告成！现在，当您运行时 `npm run dev` ，可以在Vue 3和Vite项目中使用Tailwind CSS。

<Vssue :title="$title" />
