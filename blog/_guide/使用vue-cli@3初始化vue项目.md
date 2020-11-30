---
title: 使用Vue-cli@3.0初始化Vue项目
date: 2020-11-27
tags: 
  - Vue
author: sifu
location: 南昌
---

>**关于旧版本**
>
>Vue CLI 的包名称由 vue-cli 改成了 @vue/cli。 如果你已经全局安装了旧版本的 vue-cli (1.x 或 2.x)，你需要先>通过 npm uninstall vue-cli -g 或 yarn global remove vue-cli 卸载它。

**文章结构**
 - 安装
- 检查版本
- 初始化项目
- 运行
- 项目目录
- 自定义配置

------

#一、安装
```
npm install -g @vue/cli
```
#二、检查版本
```
vue --version
```
#三、初始化项目
```
vue create hello-world
```
>**警告**
>
>如果你在 Windows 上通过 minTTY 使用 Git Bash，交互提示符并不工作。你必须通过 winpty vue.cmd >create hello-world 启动这个命令。

## 1、选择 ` Manually select features`
```
Vue CLI v3.1.3
? Please pick a preset: (Use arrow keys)
> default (babel, eslint)   //默认（安装bable、eslint）
  Manually select features  //自定义
```
## 2、选择自定义配置
- 方向键上下移动，空格选中，Enter确定 
```
Vue CLI v3.1.3
? Please pick a preset: Manually select features
? Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert s
election)
>(*) Babel   //ES6转ES5
 ( ) TypeScript   //JS超集
 ( ) Progressive Web App (PWA) Support   //渐进式Web应用
 (*) Router  //路由
 ( ) Vuex  //状态管理
 (*) CSS Pre-processors  //CSS预处理
 (*) Linter / Formatter   //规范类型
 ( ) Unit Testing  //测试
 ( ) E2E Testing  //测试
```
## 3、是否使用history模式的路由
```
Vue CLI v3.1.3
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, CSS Pre-processors, Linter
? Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n)
```
##4、CSS预处理器选择
```
Vue CLI v3.1.3
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, CSS Pre-processors, Linter
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): (Use arrow ke
ys)
> Sass/SCSS
  Less
  Stylus
```
## 5、选择哪个ESLint自动化代码格式化检测
```
Vue CLI v3.1.3
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, CSS Pre-processors, Linter
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS
? Pick a linter / formatter config: (Use arrow keys)
> ESLint with error prevention only
  ESLint + Airbnb config
  ESLint + Standard config
  ESLint + Prettier
```
##6、选择语法检查的时期
```
Vue CLI v3.1.3
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, CSS Pre-processors, Linter
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS
? Pick a linter / formatter config: Standard
? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)
>(*) Lint on save  //语法检查配置文件保存时检查
 ( ) Lint and fix on commit  //文件提交时检查
```

## 7、配置文件的存放位置（推荐独立放置配置文件）
```
Vue CLI v3.1.3
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, CSS Pre-processors, Linter
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS
? Pick a linter / formatter config: Standard
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? (Use arrow keys)
> In dedicated config files  //放独立文件放置
  In package.json  //放package.json里
```
## 8、是否保存此预设(选择yes的话下次就可以不用进行配置)
```
Vue CLI v3.1.3
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, CSS Pre-processors, Linter
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS
? Pick a linter / formatter config: Standard
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? (y/N)
```
## 9、等待文件下载完
```
Vue CLI v3.1.3
✨  Creating project in C:\Users\sifu\Desktop\hello-world.
🗃  Initializing git repository...
⚙  Installing CLI plugins. This might take a while...


> yorkie@2.0.0 install C:\Users\sifu\Desktop\hello-world\node_modules\yorkie
> node bin/install.js

setting up Git hooks
done

added 1109 packages from 737 contributors in 77.23s
🚀  Invoking generators...
📦  Installing additional dependencies...


> node-sass@4.10.0 install C:\Users\sifu\Desktop\hello-world\node_modules\node-sass
> node scripts/install.js

Cached binary found at C:\Users\sifu\AppData\Roaming\npm-cache\node-sass\4.10.0\win32-x64-64_binding.node

> node-sass@4.10.0 postinstall C:\Users\sifu\Desktop\hello-world\node_modules\node-sass
> node scripts/build.js

Binary found at C:\Users\sifu\Desktop\hello-world\node_modules\node-sass\vendor\win32-x64-64\binding.node
Testing binary
Binary is fine
added 151 packages from 104 contributors, updated 2 packages and moved 5 packages in 36.792s
⚓  Running completion hooks...

📄  Generating README.md...

🎉  Successfully created project hello-world.
👉  Get started with the following commands:

 $ cd hello-world
 $ npm run serve
```
#四、运行
```
cd hello-world

npm run serve
```
浏览器访问：[http://localhost:8080/](http://localhost:8080/)，效果如下：
![](https://upload-images.jianshu.io/upload_images/5011280-f7e18cad96c1f36d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 五、项目目录

![image.png](https://upload-images.jianshu.io/upload_images/5011280-5ac44262d2b9ee3f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

相比于2.0，文件目录结构简洁不少，少的部分都是一些配置文件，**那么以前的配置我们想自定义配置怎么办呢？**

# 五、自定义配置
 1、在项目根目录下创建`vue.config.js`文件

![image.png](https://upload-images.jianshu.io/upload_images/5011280-37b7e28d724af275.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2、`vue.config.js`基本常用配置（其他的具体看[文档](https://cli.vuejs.org/zh/config/#vue-config-js)）
```
module.exports = {
  devServer: {
    port: 8888, // 端口号
    host: 'localhost',
    https: false,
    open: false // 配置是否自动启动浏览器
  }
}

```

<Vssue :title="$title" />
