---
title: vue开发时代理配置
date: 2021-03-11
tags:
- Vue
  author: sifu
  location: 南昌
---

> **推荐阅读**：[vue多页面开发部署nginx配置](/guide/vue多页面开发部署nginx配置)

## 一、为什么要配置代理

一般在我们前端开发的时候，在和后端对接接口时会出现请求跨域（什么是跨域请自行百度），解决方案要么
后端配置允许跨域，或者前端配置代理。

## 二、开启代理配置

1、 `vue.config.js` 配置

```javascript

module.exports = {
    // 开发配置
    devServer: {
        port: 8080,
        proxy: {
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            '/dev-api': {
                // 后端ip
                target: 'http://192.168.0.1:8888',
                changeOrigin: true,
                pathRewrite: {
                    ['^' + '/dev-api']: ''
                }
            }
        },
        disableHostCheck: true
    },
}
```

2、`axios` 的配置

```javascript
import axios from 'axios'

axios.create({
  baseURL: '/dev-api'
})
```

