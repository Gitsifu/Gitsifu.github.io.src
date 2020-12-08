---
title: vue中富文本编辑器wangeditor@4.x的v-model封装
date: 2020-11-27
tags: 
  - JavaScript
  - Vue
  - wangeditor
author: sifu
location: 南昌
---

> 以下代码实现只配置部分功能，更多功能扩展请查阅[wangeditor官网](http://www.wangeditor.com/)


## 一、下载依赖
**注意wangeditor全部是小写**
```shell
npm install wangeditor --save
```
## 二、实现过程中遇到的坑
 1、当一个页面中使用到多个富文本组件时，会导致组件之间的`id`或者`ref`重复，导致渲染错误。

**解决方案**：在组件内部使用随机字符串绑定组件的`ref`或者`id`。

---

2、在父组件中改变`v-model`绑定的值，富文本内容不改变。

**解决方案**：使用`watch`进行监听`value`变化，具体看代码实现。

---
3、每次调用`editor.txt.html()`方法，富文本中的光标就会出现在文末，导致在编辑富文本中间的内容时，出现鬼畜现象。

**解决方案**：不要在`editor.config.onchange()`中调用`editor.txt.html()`方法，而使用组件内部的一个`content`变量进行储存。然后`watch content`触发`input`事件，改变父组件的邦定值

## 三、完整代码实现

``` vue
<template>
  <div>
    <div :ref="toolId" class="toolbar"></div>
    <div :ref="editorId" class="text"> <!--可使用 min-height 实现编辑区域自动增加高度-->
    </div>
  </div>
</template>

<script>
import wangEditor from 'wangeditor'

export default {
  name: 'rich-text',
  props: {
    value: String
  },
  data() {
    return {
      content: '',
      editor: {},
      toolId: '',
      editorId: ''
    }
  },
  computed: {

  },
  watch: {
    value(val) {
      if (val) {
        if (val !== this.content) {
          this.setContent(val);
        }
      } else {
        this.setContent('');
      }
    },

    content(val) {
      this.$emit('input', val);
    }
  },
  mounted() {
    this.toolId = this.randomString(12)
    this.editorId = this.randomString(12)
    this.content = this.value
    this.$nextTick(() => {
      this.editor = new wangEditor(this.$refs[this.toolId], this.$refs[this.editorId])
      this.editor.config.onchange = (html) => {
        // 监控变化，同步更新到 textarea
        this.content = html
      }
      //配置图片上传服务器接口
      this.editor.config.uploadImgServer = '/file/upload/customizeDirUpload'
      // 文件名
      this.editor.config.uploadFileName = 'file'
      // 配置上传图片请求头部
      // this.editor.config.uploadImgHeaders = {}
      // 上传图片钩子函数
      this.editor.config.uploadImgHooks = {
        before: function(xhr, editor, files) {
          // 图片上传之前触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

          // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
          // return {
          //     prevent: true,
          //     msg: '放弃上传'
          // }
        },
        success: function(xhr, editor, result) {
          // 图片上传并返回结果，图片插入成功之后触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          // alert('成功')
        },
        fail: function(xhr, editor, result) {
          // 图片上传并返回结果，但图片插入错误时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        error: function(xhr, editor) {
          // 图片上传出错时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
        timeout: function(xhr, editor) {
          // 图片上传超时时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },

        // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
        // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
        customInsert: function(insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          var url = result.data
          insertImg(url)

          // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      }
      this.editor.create()
      this.editor.txt.html(this.value)
    })
  },
  methods: {
    // 生成随机字符串id
    randomString(len) {
      len = len || 32
      let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      let maxPos = $chars.length
      let pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return 'a' + pwd
    },
    setContent(val) {
      this.editor.txt.html(val)
    }
  }
}
</script>

<style scoped>
  .toolbar {
    border: 1px solid #ccc;
  }
  .text {
    border: 1px solid #ccc;
    min-height: 200px;
  }
</style>

```

## 四、使用
`import`导入组件后，和使用输入框一样使用即可：
``` html
<rich-text v-model="html"></rich-text>
```

<!--
## 五、实现效果


<RecoDemo>
  <template slot="code-template">
     <<< @/blog/.vuepress/demo/rich-text.vue?template
  </template>
  <template slot="code-script">
    <<< @/blog/.vuepress/demo/rich-text.vue?script
  </template>
  <template slot="code-style">
    <<< @/blog/.vuepress/demo/rich-text.vue?style
  </template>
  <rich-text slot="demo"></rich-text>
</RecoDemo>
-->

<Vssue :title="$title" />
