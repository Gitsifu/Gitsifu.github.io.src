---
title: webpack5中使用autoprefixer不生效
date: 2021-05-28
tags:
  - webpack
  - autoprefixer
author: sifu
location: 杭州
---

## 一、官方文档指导下配置（不生效）

- `webpack.config.js`

```js
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader'
            ]
        }
    ]
}
```

- `postcss.config.js`

```js
module.exports = {
  plugins: [
      require('autoprefixer')
  ]
}
```

## 二、解决方案

- 方式一：`package.json` 加入以下浏览器配置列表

```json
{
  "browserslist": [
    "last 2 version",
    ">1%",
    "ios 7"
  ]
}
```

- 方式二：新增 `.browserslistrc`

```text
last 2 version
>1%
ios 7
```

## 三、总结

> Autoprefixer 需要根据支持的浏览器决定是否要加前缀做兼容。

<Vssue :title="$title" />
