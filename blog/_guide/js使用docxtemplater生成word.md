---
title: js使用docxtemplater生成word
date: 2023-10-17
tags: 
  - javascript
  - docxtemplater
  - docxtemplater-image-module-free
  - pizzip
author: sifu
location: 南昌
---

## 一、成果展示
<RecoDemo>
  <template slot="code-template">
     <<< @/blog/.vuepress/demo/render-docx.vue?template
  </template>
  <template slot="code-script">
    <<< @/blog/.vuepress/demo/render-docx.vue?script
  </template>
  <template slot="code-style">
    <<< @/blog/.vuepress/demo/render-docx.vue?style
  </template>
  <render-docx slot="demo"></render-docx>
</RecoDemo>

## 二、安装依赖
```shell
npm install docxtemplater docxtemplater-image-module-free pizzip file-saver -S
```

说明：由于 `docxtemplater` 免费版生成的word不支持图片插入，所以引入社区开源免费的 `docxtemplater-image-module-free` 进行补充图片无法插入的问题

## 三、源码实现

创建文件 `renderDoc.js`
```javascript
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import {saveAs} from "file-saver";
import ImageModule from 'docxtemplater-image-module-free'

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

const imageOptions = {
  centered: false,
  getImage(url) {
    return new Promise(function (resolve, reject) {
      PizZipUtils.getBinaryContent(
        url,
        function (error, content) {
          if (error) {
            return reject(error);
          }
          return resolve(content);
        }
      );
    });
  },
  getSize(img, url, tagName) {
    return new Promise(function (resolve, reject) {
      const image = new Image();
      image.src = url;
      image.onload = function () {
        switch (tagName) {
          // img
          case 'img':
            resolve([100, 100 * image.height / image.width]);
            break;
          default:
            resolve([image.width, image.height]);
        }
      };
      image.onerror = function (e) {
        console.log(
          "img, url, tagName : ",
          img,
          url,
          tagName
        );
        alert(
          "An error occured while loading " +
          url
        );
        reject(e);
      };
    });
  },
};

/**
 * 生成doc文档
 * @param templateUrl 文档模板
 * @param data 模板中的数据
 * @param fileName 导出的文件名称
 */
export function renderDoc({templateUrl = '/docx/tag-example.docx', data, fileName = 'output'}) {
  let url = templateUrl

  loadFile(url, function (
    error,
    content
  ) {
    if (error) {
      throw error;
    }
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      modules: [new ImageModule(imageOptions)]
    });

    try {
      // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
      // doc.render();
      doc.renderAsync(data).then(() => {
        const out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        // Output the document using Data-URI
        saveAs(out, `${fileName}.docx`);
      });
    } catch (error) {
      // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
      function replaceErrors(key, value) {
        if (value instanceof Error) {
          return Object.getOwnPropertyNames(value).reduce(function (
              error,
              key
            ) {
              error[key] = value[key];
              return error;
            },
            {});
        }
        return value;
      }

      console.log(JSON.stringify({error: error}, replaceErrors));

      if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors
          .map(function (error) {
            return error.properties.explanation;
          })
          .join("\n");
        console.log("errorMessages", errorMessages);
        // errorMessages is a humanly readable message looking like this :
        // 'The tag beginning with "foobar" is unopened'
      }
      throw error;
    }

  });
}
```

## 四、如何使用

```javascript
import {renderDoc} from 'renderDoc.js'
const data = {
  last_name: '小',
  first_name: '明',
  img: '/sponsor-qrcode/qrcode-alipay.png'
}
renderDoc({
  templateUrl: '',
  data,
  fileName: 'output'
})
```

## 五、常用语法

### 1、基础文本
- docx
```text
Hello {name} !
```

- data
```json
{
    name: "John";
}
```

- 渲染结果
```text
Hello John !
```

### 2、图片渲染
```text
{%img}
```

- data
```json
{
    "img": "/images/1.png"
}
```

### 3、条件渲染
- docx
```text
{#hasKitty}Cat’s name: {kitty}{/hasKitty}
{#hasDog}Dog’s name: {dog}{/hasDog}
```

- data
```json
{
    "hasKitty": true,
    "kitty": "Minie"
    "hasDog": false,
    "dog": null
}
```
- 渲染结果
```text
Cat’s name: Minie
```

>else条件渲染

- docx
```text
{#repo}
Repo name : {name}
{/repo}
{^repo}
No repos :(
{/repo}
```

- data
```json
{
  "repo": []
}
```

- 渲染结果
```text
No repos :(
```

### 4、循环渲染

- docx
```text
{#products}
{name}, {price} $
{/products}
```

- data
```json
{
    "products": [
        { name: "Windows", price: 100 },
        { name: "Mac OSX", price: 200 },
        { name: "Ubuntu", price: 0 }
    ]
}
```

- 渲染结果
```text
Windows, 100 $
Mac OSX, 200 $
Ubuntu, 0 $
```

> 或者

- docx
```text
{#products} {.} {/products}
```

- data
```json
{
   "products": [
       "Windows",
       "Mac OSX",
       "Ubuntu"
   ]
}
```

- 渲染结果
```text
Windows Mac OSX Ubuntu
```

### 5、多行表格循环渲染

- docx

| Name             | Age   | Phone Number   |
|------------------|-------|----------------|
| {#users}{name}   | {age} | {phone}{/}     |

- data 
```json
{
    users: [
        { name: "John", age: 22, phone: "+33653454343" },
        { name: "Mary", age: 25, phone: "+33666666666" },
    ],
}
```

- 渲染结果

| Name     | Age    | Phone Number   |
|----------|--------|----------------|
| John     | 22     | +33653454343   |
| Mary     | 25     | +33666666666   |


> 更多模板语法请查阅官网文档：[https://docxtemplater.com/docs/tag-types/](https://docxtemplater.com/docs/tag-types/)


## 六、注意事项

> 如果代码、标签和数据都没有写错，但是就是渲染不出来，请将标签换行。

有可能出现的问题：

```text
{#hasImg} {%img} {/hasImg}
```

如果以上模板图片无法渲染，请将标签换行再次尝试，如：

```text
{#hasImg} 
    {%img}
{/hasImg}
```

<Vssue :title="$title" />
