---
title: uni-app vue webstorm 开发环境配置
date: 2020-12-29
tags:
  - Vue
  - uni-app
  - webstorm
author: sifu
location: 南昌
---


> 原文链接：[https://blog.tcs-y.com/2020/04/26/uni-app-vue-webstorm/](https://blog.tcs-y.com/2020/04/26/uni-app-vue-webstorm/)

uni-app官方推荐是在Hbuild上进行开发，也方便的，Hbuild里面提供了官方的插件以及一些优化。
但是，真正就开发IDE来讲，Hbuild或许和VSCode有可比性，但是和Webstorm来讲，Hbuild就是个弟弟！
我还是喜欢手动配置后在Webstorm中开发。
我认为，智能提示是一个IDE给我们的便利，但打包和运行都在IDE里面的话，等于说罩了一层壳子，是不透明的，
打包和运行还是走手动靠谱的点。
来看下在Webstorm中折腾uni-app吧。

让webstorm识别@路径

我们在项目文件`/src/common/api`声明一个`const`：
```javascript
import http from './interface';

export const login = (data) => {
  console.log('login');
}
```
然后在main.js中使用的时候：

```javascript
import api from '@/common/api';
```

发现这里有个波浪号，鼠标移上去后发现提示：`Module not installed`。这就很郁闷了。

我以前有一篇博客webstorm中vue语法的支持是解决了Vue项目中的这个问题，所以我尝试来使用以前的方法来解决。

我尝试将`preferences` > `Languages & Frameworkes` > `JavaScript` > `Webpack` 中的`webpack configuration file`配置为`node_module/@vue/cli-service/webpack.config.js`，无效。

又尝试用vue cli重新创建了一个独立的项目，并将新项目中的build和config文件放到我这个uni-app项目中，并且手动检查每个依赖，并安装，最后将webpack configuration file设置为build/webpack.dev.config.js。很好，起作用了，main.js中的波浪号小时，是可以链接过去的。但是，在npm run serve的时候提示webpack的参数有问题。

得，安装的webpack和uni-app的插件webpack冲突了，跑不起来，更别说开发了，这条路死了。

上面两个法子在这个uni-app项目中都不适用。首先webpack是没有暴露出来的，这里是使用了@dcloudio库中的webpack设置，我们是不可见的，所以不能用原来的方法解决。

找到了这篇文章：[在 WebStorm 中，配置能够识别 Vue CLI 3 创建的项目的别名 alias @](https://juejin.cn/post/6844903802185891848)。这里说到，我们可以使用在项目根目录下面创建文件：alias.config.js来定义vue中的@路径来达到webstorm识别的跳转的：
```javascript
/**
* 本文件对项目无任何作用，仅作为 WebStorm 识别别名用
* 进入 WebStorm preferences -> Language & Framework -> JavaScript -> Webpack，选择这个文件即可
* */
const resolve = dir => require('path').join(__dirname, dir);
module.exports = {
  resolve: {
    alias: {
      '@': resolve('src')
    }
  }
};
```

然后在preferences > Languages & Frameworkes > JavaScript > Webpack中的webpack configuration file设置为alias.config.js，然后点击apply，再看main.js，很好，识别了，可以链接过去了。

<Vssue :title="$title" />
