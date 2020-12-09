---
title: 无缝跑马灯实现(非marquee)
date: 2020-11-27
tags: 
  - Vue
  - marquee
author: sifu
location: 南昌
---

  一般我们需要实现一个简单的跑马灯，我们可以使用`<marquee></marquee>`标签，但是会存在一个问题，轮播的时候并不是连续的，循环播放的时候中间有段时间会出现白色空白。
![image](http://upload-images.jianshu.io/upload_images/5011280-0f3147d3565283f9.gif?imageMogr2/auto-orient/strip)

那么有没有什么办法让循环播放的时候中途不出现空白呢？具体实现代码如下：

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>跑马灯</title>
    <style>
      .wrapper{
        overflow: hidden;
        white-space: nowrap;
        width: 500px;
        border: solid 1px #000;
      }
      .content{
        display: inline-block;
      }
    </style>
</head>

<body>
  <div id="wrapper" class="wrapper" onmouseover="stopQu()" onmouseout="startQu()">
   <div id="content"  class="content">
       我是内容，可以是文字，也可以是图片，都行，但是注意此div中的内容加起来需要比滚动区域长
   </div>
   <!-- 这个需要和上面的内容一样就可以了 -->
   <div class="content">
      我是内容，可以是文字，也可以是图片，都行，但是注意此div中的内容加起来需要比滚动区域长
   </div>
  </div>
  
    <script>
      //定时器id
      var timer;
      //页面加载完成之后执行
      window.onload= init()
      function init(){
        console.log(document.getElementById("content").clientWidth)
        var wrapper = document.getElementById("wrapper");
        var content = document.getElementById("content");
        var contentWidth = content.clientWidth;
        timer = window.setInterval(function () {
          wrapper.scrollLeft++;
          console.log(wrapper.scrollLeft)
          if (wrapper.scrollLeft >= contentWidth) {
            wrapper.scrollLeft = 0;
          }
        }, 20)
      }

      //停止滚动
      function stopQu(){
        window.clearInterval(timer);
      }

      //重新滚动
      function startQu(){
        init();
      }
    </script>
</body>
</html>
```
**注意：滚动区域的内容需要比滚动区域的大小大**

以上是普通的html文件的写法，那如果是vue组件如何编写呢？在vue里面实现这个会有一个有关`$refs`的坑，**巨坑！！！**，下面我们来写一下在vue里的实现，跳过这个坑。(ref相关的内容请自行查看vue官网)
``` vue
<template>
<div ref="wrapper" class="wrapper" @mouseenter="stopQu()" @mouseleave="startQu()">
   <div ref="content"  class="content">
       我是内容，可以是文字，也可以是图片，都行，但是注意此div中的内容加起来需要比滚动区域长
   </div>
   <!-- 这个需要和上面的内容一样就可以了 -->
   <div class="content">
      我是内容，可以是文字，也可以是图片，都行，但是注意此div中的内容加起来需要比滚动区域长
   </div>
</div>
</template>
<script>
 export default {
    name: "marquee",
    data(){
      return {
        timer: ''
      }
    },

    mounted() {
     /**
      * 必须这样写！！！
      * 原因是在mounted钩子函数中 console.log(this.$refs.wrapper) 结果为undifined,无法使用this.$refs
      */
      setTimeout(() => {
        this.marquee()
      }, 1000)
    },

    methods:{
      marquee(){
        let wrapper = this.$refs.wrapper;
        let content = this.$refs.content;
        let contentWidth = content.clientWidth;
        this.timer = window.setInterval(function () {
          wrapper.scrollLeft++;
          if (wrapper.scrollLeft >= contentWidth) {
            wrapper.scrollLeft = 0;
          }
        }, 20)
      }

      //停止滚动
      stopQu(){
        window.clearInterval(timer);
      }

      //重新滚动
      startQu(){
        this.marquee();
      }
    }
  }
</script>
```
这个坑是在`mouted`钩子函数中不能立即去使用`this.$refs`，所以使用`setTimeout()`函数停顿一秒后执行，下面是具体的官方介绍，详情请自行查看vue官网。

![image.png](https://upload-images.jianshu.io/upload_images/5011280-a7590d50ece3f352.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![image.png](https://upload-images.jianshu.io/upload_images/5011280-4d78fa70cecc6485.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

<Vssue :title="$title" />
