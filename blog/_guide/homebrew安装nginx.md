---
title: homebrew安装nginx
date: 2020-08-05
tags: 
  - homebrew
  - nginx
author: sifu
location: 南昌
---

> 默认homebrew下载路径太慢，需要替换镜像源（一、二、三步骤）

## 一、替换brew.git

```shell script
cd "$(brew --repo)"
```

```shell script
git remote set-url origin https://mirrors.ustc.edu.cn/brew.git
```

## 二、替换homebrew-core.git

```shell script
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
```

```shell script
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
```

## 三、更新

```shell script
brew update
```
---

## 四、安装nginx

```shell script
brew install nginx
```

## 五、查看nginx安装目录及配置文件目录

```shell script
brew info nginx
```

- 默认配置文件位置`/usr/local/etc/nginx/nginx.conf`


- 默认加载访问资源位置`/usr/local/var/www`

## 六、nginx相关命令

```shell script
# 启动nginx
brew services start nginx

# 重启nginx
brew services restart nginx

# 停止nginx
brew services stop nginx
```

<Vssue :title="$title" />