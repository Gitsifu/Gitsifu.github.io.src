---
title: 手撸Vue指令-输入框防抖v-debounce
date: 2020-12-30
tags: 
  - Vue指令
  - 防抖
  - debounce
author: sifu
location: 南昌
---

 1.设置v-debounce自定义指令

```javascript
Vue.directive('debounce', {
  bind: (el, binding) => {
    let debounceTime = binding.value; // 防抖时间
    if (!debounceTime) { // 用户若不设置防抖时间，则默认2s
      debounceTime = 2000;
    }
    let cbFun;
    el.addEventListener('click', event => {
      if (!cbFun) { // 第一次执行
        cbFun = setTimeout(() => {
          cbFun = null;
        }, debounceTime);
      } else {
        event && event.stopImmediatePropagation();
      }
    }, true);
  },
});
```

2.使用

```vue
<button @click="sayHello" v-debounce>提交</button>

或者设置节流时间为`1s`

<button @click="sayHello" v-debounce="1000">提交</button>
```

<Vssue :title="$title" />
