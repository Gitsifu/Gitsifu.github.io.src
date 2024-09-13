---
title: nvm和nvm-windows配置镜像代理
date: 2024-9-13
tags: 
  - nvm
  - nvm-windows
  - 镜像代理

author: sifu
location: 南昌
---

> nvm和nvm-windows配置国内镜像代理有一定的区别

# 一、nvm配置国内镜像代理
```shell
export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node/
```

# 二、nvm-windows配置国内镜像代理
```shell
nvm node_mirror https://npmmirror.com/mirrors/node/
```