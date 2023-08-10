---
title: vue-cli-service生产环境build时css未打包问题
date: 2023-08-10
tags:
 - Vue
 - webpack
author: sifu
location: 南昌
---

> 警告
> 
> 如果你在开发一个库或多项目仓库 (monorepo)，请注意导入 CSS 是具有副作用的。请确保在 package.json 中移除 "sideEffects": false，否则 CSS 代码块会在生产环境构建时被 webpack 丢掉。

config.optimization.sideEffects(false) 会让 webpack 停止识别 package.json 中的 sideEffects 字段所以有用。


详情参考：[https://github.com/vuejs/vue-cli/issues/3580](https://github.com/vuejs/vue-cli/issues/3580)
