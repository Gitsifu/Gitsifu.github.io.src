---
title: React组件三大核心属性：ref
date: 2021-05-10
tags:
  - React
  - React-ref
author: sifu
location: 杭州
---

> 官方推荐：**勿过度使用 Refs** ，如果要使用，那尽可能不要使用字符串形式的`ref` ,因为可能带来性能的问题

## 一、字符串形式的 `ref`

```jsx
class Demo extends React.Component () {
    getInput = (c) => {
        console.log(this.refs.input.value)
    }
    
    render(){
        return (
            <div>
                <input ref="input1"/>
                <button onClick={this.getInput}>获取input元素输入的值</button>
            </div>
        )
    }
}
```

## 二、回调形式的 `ref`

```jsx
class Demo extends React.Component {
    getInput = () => {
        console.log(this.input1.value)
    }
    render() {
        return (
            <div>
                <input ref={(c)=>{this.input1 = c}}/>
                <button onClick={this.getInput}>获取input元素输入的值</button>
            </div>
        )
    }
}
```


## 三、`createRef` 创建 `ref` 容器

```jsx
import React from 'react'

class Demo extends React.Component {
    myRef = React.createRef()
    
    getInput = () => {
        console.log(this.myRef.current.value)
    }
    
    render() {
        return (
            <div>
                <input ref={this.myRef}/>
                <button onClick={this.getInput}>获取input元素输入的值</button>
            </div>
        )
    }
}
```

> 注意：此处的 `myRef` 需要使用 `myRef.current` 才能获取到当前dom元素

