---
title: Vue-cli@3.0初始化的Vue项目之webpack配置
date: 2019-11-28
tags: 
  - Vue
  - webpack
author: sifu
location: 南昌
---

使用`vue create my-project`命令创建出来的vue项目，在项目根目录下创建`vue.config.js`文件

`vue.config.js`文件，具体参考[文档](https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE)，以下只写出常用配置方式。  

``` javascript
'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  //开发服务配置
  devServer: {
    port: 8888, // 端口号
    host: 'localhost',  // 主机
    https: false,  // 是否启用https
    open: false // 配置是否自动启动浏览器
  },
  //webpack配置节点
  configureWebpack: {
    // 路径配置
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      // 别名配置
      alias: {
        // @ is an alias to /src
        '@': resolve('src'),
      }
    },
    // 插件配置
    plugins: [],
    // webpack-load配置
    module: {
      rules: []
    }
  }
}

```

<Vssue :title="$title" />
