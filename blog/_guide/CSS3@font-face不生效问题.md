---
title: CSS3@font-face不生效问题
date: 2020-12-31
tags: 
  - CSS3
  - font-face
  - 字体
author: sifu
location: 南昌
---

## 1、加载字体

**注意：字体文件名称 `zpix` 和 `font-family`中的值 `zpix` 需要一致**

```css
@font-face {
    font-family: 'zpix'; 
    src: url('/blog/assets/font/zpix.ttf');
}

/*以下写法是无效的*/
@font-face {
    font-family: 'font-zpix'; 
    src: url('/blog/assets/font/zpix.ttf');
}
```

## 2、使用

```css
html{
    font-family: 'zpix';
}
```

## 3、效果

<RecoDemo>
  <template slot="code-template">
     <<< @/blog/.vuepress/demo/font-zpix.vue?template
  </template>
  <template slot="code-script">
    <<< @/blog/.vuepress/demo/font-zpix.vue?script
  </template>
  <template slot="code-style">
    <<< @/blog/.vuepress/demo/font-zpix.vue?style
  </template>
  <font-zpix slot="demo"></font-zpix>
</RecoDemo>

## 4、总结

如果 `@font-face` 中的字体文件名称和所对应的 `font-family` 不一致，则字体无法生效。

<Vssue :title="$title" />
