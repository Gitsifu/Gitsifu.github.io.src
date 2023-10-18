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

## 一、成果
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

## 四、使用

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
