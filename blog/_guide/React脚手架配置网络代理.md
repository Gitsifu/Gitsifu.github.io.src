---
title: React脚手架配置网络代理
date: 2021-05-10
tags:
  - React
  - React-proxy
author: sifu
location: 杭州
---

## 一、package.json简单配置

`package.json`

```json
{
  "proxy": "http://localhost:5000"
}
```


## 二、setupProxy.js配置

1、创建 `src/setupProxy.js` 文件

```js
const proxy = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        proxy('/api1', {
            target: 'http://localhost:5000', // 目标地址
            changeOrigin: true,// 默认为false，用于控制服务器收到的请求头中Host值为 http://localhost:5000
            pathRewrite: {'^/api1': ''} // 重写路径
        }),
        proxy('/api2', {
            target: 'http://localhost:5000',
            changeOrigin: true,
            pathRewrite: {'^/api2': ''}
        })
    )
}
```

> 总结：使用 `package.json` 只能配置一个代理，无法配置复杂的代理。
> 如果需要配置复杂的代理，就使用 `setupProxy.js` 进行配置。

<Vssue :title="$title" />
