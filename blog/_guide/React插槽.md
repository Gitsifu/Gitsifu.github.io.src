---
title: React插槽
date: 2021-05-10
tags:
  - React
  - React-插槽
author: sifu 
location: 杭州
---

> 在react官网，并没有提到 **插槽** 的概念，此处只是把 `Vue` 的插槽概念引入，并解释如何在react中实现Vue中的插槽效果

- 前提知识：react在子组件中获取父组件传递过来的插槽内容，使用 `this.props.children` 获取
它包含组件的开始标签和结束标签之间的内容。

## 一、默认插槽(匿名插槽)

```jsx
function Father(props) {
    return (
        <div>
            我是父组件的内容
            <Sun>
                <div>我是子组件的默认插槽内容</div>
            </Sun>
        </div>
    )
}

function Sun(props) {
    return (
        <div>
            我是子组件内容
            {props.children}
        </div>
    )
}
```

## 二、具名插槽

- 思路：如果需要传递具名插槽，父组件可以传递一个对象给子组件，可以在里面加入属性，作为具名插槽

```jsx
function Father(props) {
    return (
        <div>
            我是父组件的内容
            <Sun>
                {{
                    title: (<div>我是子组件的title插槽内容</div>),
                    content: (<div>我是子组件的content插槽内容</div>)
                }}
                
            </Sun>
        </div>
    )
}

function Sun(props) {
    return (
        <div>
            我是子组件内容
            {props.children.title}
            <hr/>
            {props.children.content}
        </div>
    )
}
```

## 三、通过传递props方式实现

- 思路：上面使用的是使用 `children` 进行传递插槽内容，
  实际上我们也可以使用 `props` 进行插槽内容的传递。 
  **记住：一切皆对象**

```jsx
function Father(props) {
    return (
        <div>
            我是父组件的内容
            <Sun title={<div>我是子组件的title插槽内容</div>} content={<div>我是子组件的content插槽内容</div>}></Sun>
        </div>
    )
}

function Sun(props) {
    return (
        <div>
            我是子组件内容
            {props.title}
            <hr/>
            {props.content}
        </div>
    )
}
```
