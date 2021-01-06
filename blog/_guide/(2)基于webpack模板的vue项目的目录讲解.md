---
title: 基于webpack模板的Vue项目的目录讲解
date: 2018-03-06
tags: 
  - Vue
  - webpack
author: sifu
location: 南昌
---

## 一.目录结构
使用IDEA打开这个项目

![vue项目目录结构](http://upload-images.jianshu.io/upload_images/5011280-3893187b174c062f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
build -- 主要是webpack的配置
config -- 基本的配置
node_modules -- 项目依赖包
src -- 项目源码(我们主要在这个里面开发)
static -- 存放静态文件的
.babelre -- babel配置文件
.editorconfig -- 编辑格式配置（例如Tab键为几个空格）
.gitignore -- git忽略文件配置
.postcssrc.js
.index.html -- 一个标准的html文件（单页面）
package.json -- 项目的描述，依赖的文件配置等等
README.md -- 项目的描述
```
## 二. 部分文件及配置的具体讲解
- `/config/index.js`，此文件下有一个dev节点，dev节点下有两个属性较为常用。
-`port`:启动应用的端口号设置
-`autoOpenBrowser`:执行`npm run dev`命令后是否自动打开浏览器

- `/src/router/index.js`
路由配置，意思是：访问根目录，即展示HelloWorld.vue这个组件
 ```
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})

```
- `/src/main.js` 项目入口文件，一般可以在此文件中定义一些全局的变量

- `index.html` 所有组件构成的页面最终都会被添加在这个文件中（通过js进行渲染），当路由跳转时，文件里的元素节点会进行替换。（打开浏览器的调试界面，可以看到，如果你在这个文件里写一点注释，不管你访问哪个路由，注释都能看到）

- `/package.json`（非常重要的东西）
```
{
  "name": "my-project",  //项目名称
  "version": "1.0.0",  //版本
  "description": "A Vue.js project",  //项目描述
  "author": "sifu <2587107273@qq.com>",  //项目作者
  "private": true,  //是否为私有
  //脚本配置
  "scripts": {
    // 当我们执行npm run dev时实际上是执行webpack-dev-server --inline --progress --config build/webpack.dev.conf.js命令
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    //当我们执行npm run start时，实际上是执行npm run dev（同上）
    "start": "npm run dev",
    //同上
    "build": "node build/build.js"
  },
   //项目依赖包
  "dependencies": {
    "vue": "^2.5.2",
    "vue-router": "^3.0.1"
  },
   //项目开发时依赖包
  "devDependencies": {
    "autoprefixer": "^7.1.2",
    "babel-core": "^6.22.1",
    "babel-helper-vue-jsx-merge-props": "^2.0.3",
    "babel-loader": "^7.1.1",
    ......
  }
}
```

`dependencies`与`devDependencies`节点的区别：
- `dependencies`:项目打包时，会将此节点下依赖的包打包进去

- `devDependencies`:项目打包时，不会将此节点下依赖的包打包进去，例如babel这个工具包，只是将es6的语法转化成es5的语法，在打包的时候才会使用，运行时并不会用到。

## 三、用比喻来说明一下这个`package.json`的作用
**蛋糕的说明书**(纯属为了解释，请勿模仿，不然会做出黑暗料理来的哦)：

**原料**：鸡蛋、牛奶、白糖、面粉 （类似`dependencies`节点的依赖，完成时，这些原料就是成品中的一部分）

**器材**：电动打蛋器、电饭锅、筛子、碗(类似`devDependencies`节点的依赖，完成时，这些并不是成品的一部分，只是我们在制作过程中需要使用的工具而已)

**步骤和方法**： (类似`scripts`节点)

1.分离蛋黄和蛋清，将其分别放到干净无油无水的大碗中(类似`dev`)

2.筷子三根，将2~3汤匙的白糖加到蛋清里，再加入一点盐，直到打发成硬性泡沫，也就是盆子倒扣蛋白都不会掉下来的状态。(类似`start`)

-----

**产品名称**: 蛋糕（类似`name`）

**产品描述**：美味的蛋糕 （类似`description`）

**制作时间**：...（类似`version`）

**联系方式**：... （类似`author`）

-----

是不是感觉我们做开发，相当于是在做一个蛋糕一样呢？

**注**：由于个人不才，有些配置我自己也不太明白，只写出自己知道的，且重要常用的配置解释，其他配置在此就不做过多的解释，以免误导大家

（如有错误或者问题，请在评论区指出或提出，感谢！！）

<Vssue :title="$title" />
