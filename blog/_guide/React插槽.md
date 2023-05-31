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

## 四、通过renderProps实现

> 实际上是是给父组件传递一个 `props` ， `key` 为 `render` 的函数，
> 在此函数中返回一个子组件，在父组件中调用 `props.render()` 函数之后
> 的到子组件

- 思路：在父组件被 `使用` 的时候，传递一个 `props` 的回调函数进去，此函数由
  父组件决定何时调用

### 1、不传参

```jsx
function App(props){
    return (
        <div>
          <Father render={() => {<Sun/>}}/>
        </div>
    )
}

function Father(props) {
    return (
        <div>
          我是父组件的内容
          {props.render()}
        </div>
    )
}

function Sun(props) {
    return (
        <div>
            我是子组件内容
        </div>
    )
}
```

### 2、传递参数

```jsx
function App(props){
    return (
        <div>
          {/*在使用父组件的时候，还可以给子组件传递props*/}
          <Father render={({title,content}) => {<Sun title content/>}}/>
        </div>
    )
}

function Father(props) {
    const title = '我是父组件的title值'
    const content = '我是父组件的content值'
    return (
        <div>
            我是父组件的内容
          {props.render({title,content})}
        </div>
    )
}

function Sun(props) {
    return (
        <div>
          我是子组件内容
          {props.title}
          {props.content}
        </div>
    )
}
```

> **注意** ：三、四 这两种方式实际上差不多，但有区别。
> 
> 【三】是在 `定义` 父组件的时候
> 就直接 `使用` 子组件，同时把插槽内容通过 `props` 传递给子组件。
> 
> 【四】是在 `使用` 父组件的时候，给父组件传递一个 `props` 为 `render` 的回调函数，
> 然后由父组件决定在何处调用 `props.render()` 函数，同时可给 `render` 传递参数。

> 解释：此处所传递的 `props` 是一个叫做 `render` 的函数，请不要认为必须要叫做
> `render` ，不要和类组件中的 `render` 函数混淆了。此处仅仅只是传递一个普通函数，
> 叫什么名称都行。

<Vssue :title="$title" />
