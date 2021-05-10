---
title: React兄弟组件中进行数据传递
date: 2021-05-10
tags:
  - React
author: sifu
location: 杭州
---

## 一、state声明在最近的共同父组件中  [状态提升](https://react.docschina.org/docs/lifting-state-up.html)

- 思路：将 `state` 声明在父组件中，然后通过在父组件中给子组件传递一个回调函数， 
  让子组件去调用该回调函数，并传入需要改变的参数。
  最后有父组件执行该函数进行改变 `state` 。

```jsx
class Father extends React.Component {
    state = {
        title: 'hello world'
    }
    
    changeTitle = (newTitle) => {
        this.setState({
            title: newTitle
        })
    }
    
    render() {
        const {title} = this.state
        return (
            <div>
                <Sun1 changeTitle={this.changeTitle}/>
                <Sun2 title/>
            </div>
        )
    }
}

class Sun1 extends React.Component {
    send = () => {
        this.props.changeTitle('我是新标题')
    }
    
    render() {
        return (
            <div>
                <button onClick={this.send}>发送数据</button>
            </div>
        )
    }
}

class Sun2 extends React.Component {
    render() {
        return (
            <div>{this.props.titile}</div>
        )
    }
}
```

## 二、 使用第三方库 `pubsub-js` 消息订阅-消息发布

### 1、下载依赖

```shell
npm install pubsub-js -S
```

### 2、使用
- `import PubSub from 'pubsub-js'`  //引入
- `PubSub.subscribe('change', function(msg, data){})` //订阅
- `PubSub.publish('change', data)` //发布消息
- `PubSub.unSubscribe('change')`

具体api请看GitHub官网描述

GitHub仓库地址：[pubsub-js](https://github.com/mroderick/PubSubJS)

---

> **扩展**：类似的库还有 `mitt` [GitHub仓库地址](https://github.com/developit/mitt)

