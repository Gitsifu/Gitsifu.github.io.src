---
title: vue-cli-service生产环境build时css未打包问题
date: 2023-08-10
tags:
 - Vue
 - webpack
author: sifu
location: 南昌
---

> 警告
> 
> 如果你在开发一个库或多项目仓库 (monorepo)，请注意导入 CSS 是具有副作用的。请确保在 package.json 中移除 "sideEffects": false，否则 CSS 代码块会在生产环境构建时被 webpack 丢掉。

config.optimization.sideEffects(false) 会让 webpack 停止识别 package.json 中的 sideEffects 字段所以有用。

- `"sideEffects": false` 解释

在 package.json 中设置 "sideEffects": false 是为了告诉 webpack 在 Tree Shaking（树摇）时，认为项目中的所有模块都没有副作用（没有影响其他模块的操作）。这可以帮助进一步优化打包结果。

通过将 "sideEffects" 设置为 false，webpack 将删除未使用的代码，以减小最终生成的 bundle 大小。然而，这个设置可能会导致一些副作用被意外删除，导致应用程序不正常工作。

要正确设置 "sideEffects"，你需要了解应用程序的代码是否有副作用，如：导入模块时执行的全局代码、引入 CSS 文件等。如果确定没有副作用，可以将 "sideEffects" 设置为 false，以进一步减小打包后的文件大小。如果存在副作用，则需要将其设置为 true 或指定具体的模块路径来确保不被 Tree Shaking 删除。

请注意，在某些情况下，一些第三方库可能已经在它们自己的 package.json 中正确设置了 "sideEffects"。在这种情况下，你无需再进行配置。

总结起来，在设置 "sideEffects" 时，你需要仔细检查你的应用程序代码，并确保所有具有副作用的模块被正确标记或排除，以避免意外删除导致应用程序出现问题。


详情参考：[https://github.com/vuejs/vue-cli/issues/3580](https://github.com/vuejs/vue-cli/issues/3580)
