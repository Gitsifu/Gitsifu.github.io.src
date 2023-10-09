---
title: WebStorm别名识别配置
date: 2023-10-09
tags:
 - vue
 - WebStorm
 - 别名
author: sifu
location: 南昌
---

1、项目根目录创建文件：`alias.config.js`
```javascript
/**
 * 本文件对项目无任何作用，仅作为 WebStorm 识别别名用
 * */
const path = require('path')
const resolve = dir => path.join(__dirname, dir);
module.exports = {
  resolve: {
    alias: {
      '@': resolve('.')
    }
  }
};
```

2、进入 WebStorm preferences -> Language & Framework -> JavaScript -> Webpack，选择这个文件即可
