---
title: Vue开发之HelloWorld
date: 2020-11-27
tags: 
  - Vue
author: sifu
location: 南昌
---

# 一.配置电脑环境

## 1.安装[node.js](http://nodejs.cn/)
- 检查node.js是否安装成功
  
![打开cmd输入node出现这个就成功了](http://upload-images.jianshu.io/upload_images/5011280-8a0afbf94891f749.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 编辑器（个人推荐用`IDEA`或者`WebStorm`，[下载地址](https://www.jetbrains.com/)）

## 2.安装cnpm（目的是为了下载依赖包更快）

由于我们需要使用node.js中的npm包管理工具，但是由于下载依赖包时很慢，所以使用淘宝镜像cnpm。在命令行中输入：

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

## 3.安装全局vue-cli（vue的脚手架工具）

在命令行中输入：
```
npm install -g @vue/cli
```
# 二.使用vue-cli初始化项目
## 1. 创建一个基于 webpack 模板的新项目
新建一个空文件夹，

打开命令行，使用`cd`命令，到该文件夹，并输入：
```
vue init webpack my-project
```
此时它会问几个问题：

![你的可能和图中有点不同](http://upload-images.jianshu.io/upload_images/5011280-0514885f27109cd4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


1.？Project name(my-project) ------项目名，回车即默认为my-project

2.？Project description (A Vue.js project)------ 项目的描述，默认为括号里的

3.? Author(........) ------ 作者，默认为括号里面的

4.？Install vue-router?(Y/n)------ 是否安装vue-router（此处输入Y，回车）

5.Use ESLint to lint your code? (Y/n)------ 是否使用ESLint语法检查?(这个比较蛋疼，这里还是不要这个，输入n，回车)

6.?Set up unit tests(Y/n) ------是否建立单元测试？（这个就无所谓啦，此处演示，选择不要）

7.?Setup e2e tests whith Nightwatch? (Y/n)------ (设置e2e测试，选择不要)

8.？Should we run 'npm install' for you after the project has been created?(recommended)
\>Yes, use NPM
    Yes,use Yarn
   No,I will handle that myself
(选择第一个，回车)
## 2.让项目跑起来
等待文件下载完成后，执行：
```
cd my-project
```
再执行(下载依赖包)：
```
cnpm install
```
再执行：
```
npm run dev
```
当出现如下提示，即启动成功

![启动成功](http://upload-images.jianshu.io/upload_images/5011280-d6ab02eb6f0c8a80.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

打开浏览器访问[localhost:8080](http://localhost:8080/#/), 看到如下，说明你的vue的HelloWorld项目已经启动成功了

![image.png](http://upload-images.jianshu.io/upload_images/5011280-169678286787c2bf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

（如有错误或者问题，请在评论区指出或提出，感谢！！）


<Vssue :title="$title" />
