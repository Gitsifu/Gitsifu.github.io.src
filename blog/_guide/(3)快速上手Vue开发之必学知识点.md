---
title: 快速上手Vue开发之必学知识点
date: 2020-11-27
tags: 
  - Vue
author: sifu
location: 南昌
---

![Vue必学知识.png](https://upload-images.jianshu.io/upload_images/5011280-2e11233a7365cd82.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
话不多说，源码地址： [https://github.com/Gitsifu/vue-learn](https://github.com/Gitsifu/vue-learn)

目录：
1.v-bind的使用
2.v-on和$emit()的使用
3.$on()和$emit()的使用

## 1.`v-bind`使用:
子组件：
```
<template>
  <div>{{msg}}</div>
</template>

<script>
  export default {
    name: 'child',
    components: {},
    props: {
      msg: {
        require: false,//是否必须传入
        type: String,//类型
        default: ''//如果不传入时的默认值
      }
    },
    data() {
      return {}
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style scoped>
</style>
```
父组件：
```
<template>
  <div>
    <h1>父组件传值给子组件demo：</h1>
    <div>方式一：</div>
    <child v-bind:msg="massage"></child>
    <div>方式二：</div>
    <child msg="2.这个是父组件的数据"></child>
  </div>
</template>

<script>
  import Child from "./child";

  export default {
    name: 'father',
    components: {Child},
    props: [],
    data() {
      return {
        massage: "1.这个是父组件的数据"
      }
    },
    methods: {},
    mounted() {
    }
  }
</script>

<style scoped>
</style>
```
效果图：
![image.png](https://upload-images.jianshu.io/upload_images/5011280-9d24fd5ccdae21b5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 2.`v-on`与`$emit("eventName",...)`使用
子组件：
```
<template>
    <div>
      <button v-on:click="test">点我一下</button>
    </div>
</template>

<script>
    export default {
        name: 'child',
        components: {},
        props: [],
        data() {
            return {}
        },
        methods: {
          test(){
            //第一个参数是事件名称
            this.$emit('event','这个是事件触发后发送的数据，v-on的回调函数参数接收');
          }
        },
        mounted() {
        }
    }
</script>

<style scoped>
</style>
```
父组件：
```
<template>
  <div>
    <child v-on:event="clickButton"></child>
    <div>{{msg}}</div>
  </div>
</template>

<script>
  import Child from "./child";

  export default {
    name: 'father',
    components: {Child},
    props: [],
    data() {
      return {
        msg: '这个是原始数据'
      }
    },
    methods: {
      clickButton(data) {
        this.msg = data;
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
</style>
```
效果图：下载源码看效果吧。

##  3.$on()和$emit()的使用
```
<template>
  <div>
    <button v-on:click="clickFunc">点击一下</button>
  </div>
</template>

<script>
  export default {
    name: 'on-emit',
    components: {},
    props: [],
    data() {
      return {}
    },
    methods: {
      clickFunc() {
        this.$emit('eventName', '这个是数据啦！！！')
      }
    },
    //在创建时执行，并监听 ‘eventName’事件,$on这个方法监听本组件中的事件一般都都是写在created生命周期函数里
    created() {
      this.$on('eventName', function (data) {
        alert('监听eventName事件收到了数据：\n' + data)
      })
    },
    mounted() {
    }
  }
</script>

<style scoped>
</style>
```
效果下载源码看。

**解释**：

v-bind用于父组件传递数据给子组件。子组件通过props进行接收。props中的变量使用和data(){return{}}中的使用方式一样。

v-on与$emit：
v-on用于监听子组件通过执行$emit触发的事件。

$on与$emit:
$on用于监听**自身**组件中执行$emit触发的事件。（$on监听一般写在created生命周期函数中）


<Vssue :title="$title" />
