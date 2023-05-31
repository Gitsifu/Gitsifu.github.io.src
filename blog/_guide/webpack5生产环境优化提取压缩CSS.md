---
title: webpack5生产环境优化提取压缩CSS
date: 2021-05-28
tags:
  - webpack
author: sifu
location: 杭州
---

MiniCssExtractPlugin 提取 CSS 到单个文件
目前示例中webpack使用css方式：

1、css-loader：将js中的css内容解析

2、style-loader：最终将css样式通过`<style>`标签方式注入到页面中。 

CSS内容还是存储在JS文件中。

MiniCssExtractPlugin 插件可以将CSS内容从打包结果中提取出来，存放到文件中。

通过这个插件，就可以实现CSS模块的按需加载。

因为提取后生成了css文件，所以就不需要`<style>`标签，而是直接通过<link>的方式引入。

所以使用MiniCssExtractPlugin，就不需要style-loader，而是使用插件提供的loader实现通过<link>标签的方式注入。

安装

```shell
yarn add mini-css-extract-plugin --dev
```

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 'style-loader', // 通过 style 标签注入
                    MiniCssExtractPlugin.loader, // 通过 link 标签注入
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
}
```

打包后，就会在输出目录下，看到提取出来的css文件了，它的名称使用的是导入它的模块的名称（可能是魔法注释的名称，可能是合并打包成一个文件）。

打包效果：

css模块不会被包裹在函数中，作为数组参数的元素被使用。

而是在主入口文件执行方法中，以<link>标签+文件路径的形式注入到html中。

建议：

如果样式内容不是很多的话，提取到单个文件的效果不是很好。

建议CSS文件超过150kb左右，才考虑提取到单个文件中。

否则css嵌入到代码中，减少一次请求，效果可能更好。

OptimizeCssAssetsWebpackPlugin 压缩输出的css文件
使用MiniCssExtractPlugin后，样式就被提取到单独的css文件中了。

前面说过，webpack在production模式下，会自动压缩优化打包的结果。

但是单独提取的css文件并没有被压缩。

这是因为webpack内置的压缩插件，仅仅支持JS文件的压缩。

对于其他类型的文件压缩，都需要额外的插件支持。

webpack推荐使用「optimize-css-assets-webpack-plugin」插件压缩样式文件。

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
    mode: 'none',
    output: {
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 'style-loader', // 通过 style 标签注入
                    MiniCssExtractPlugin.loader, // 通过 link 标签注入
                    'css-loader'
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin(),
        new OptimizeCssAssetsWebpackPlugin()
    ],
}
```

optimization.minimizer
webpack官方文档介绍时并不是将 「OptimizeCssAssetsWebpackPlugin」 插件配置在「plugins」数组中。

而是配置在 「optimization.minimizer」 数组中。

原因是：

配置在「plugins」中，webpack就会在启动时使用这个插件。

而配置在 「optimization.minimizer」 中，就只会在「optimization.minimize」这个特性开启时使用。

所以webpack推荐，像压缩类的插件，应该配置在「optimization.minimizer」数组中。

以便于通过「optimization.minimize」统一控制。（生产环境会默认开启minimize）

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
    mode: 'none',
    output: {
        filename: '[name].bundle.js',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin()
        ]
    },
    module: {
    rules: [
            {
                test: /\.css$/,
                use: [
                    // 'style-loader', // 通过 style 标签注入
                    MiniCssExtractPlugin.loader, // 通过 link 标签注入
                    'css-loader'
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin(),
        // new OptimizeCssAssetsWebpackPlugin()
    ],
}
```


然而这样配置会导致JS不会被压缩。

原因是webpack认为，如果配置了minimizer，就表示开发者在自定以压缩插件。

内部的JS压缩器就会被覆盖掉。所以这里还需要手动将它添加回来。

webpack内部使用的JS压缩器是「terser-webpack-plugin」。

注意：手动添加需要安装这个插件才能使用。

```js
// 只展示了添加的代码
const TerserWebpackPlugin = require('terser-webpack-plugin')
module.exports = {
    // ...
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin(),
            new OptimizeCssAssetsWebpackPlugin()
        ]
    },
    // ...
}
```

---

> 版权声明：本文为CSDN博主「皮蛋很白」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
> 
> 原文链接：https://blog.csdn.net/u012961419/article/details/107094111

<Vssue :title="$title" />
