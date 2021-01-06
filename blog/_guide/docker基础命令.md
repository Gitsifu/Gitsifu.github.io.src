---
title: docker基础命令
date: 2017-10-20
tags: 
  - docker
author: sifu
location: 南昌
---

- 拉取镜像
```shell script
docker pull [镜像名称]:[标签]

# eg: docker pull mysql:5.7

# 默认：docker pull mysql将会拉取最新的镜像，即：docker pull mysql:latest
```

- 查看docker正在运行的容器

```shell script
docker ps
```

- 查看所有的容器

```shell script
docker ps -a
```

- 后台运行镜像（添加`-d`的参数即可）
  - 将返回容器id
  
```shell script
docker run -d [镜像名]
```

- 进入容器内部
```shell script
docker exec -it [容器名字或者id] bash
```
- 查看命令参数

```shell script
docker exec --help
```

- 退出容器

```shell script
exit
```

- 停止容器

```shell script
docker stop 容器id
```

- 删除容器(加-f是强制删除)

```shell script
docker rm -f [容器id或者容器name]
```

- 删除镜像

```shell script
dokcer rmi [镜像id，可以同时删除多个，每个用空格隔开]
```

- 配置数据卷和端口号

```shell script
docker run -d [镜像id] -v [宿主机目录路径]:[容器目录路径] -p [宿主机端口号]:[容器端口号] --name [启动容器的名称] 
```

- Docker挂载数据卷的默认权限是读写（rw）,我们也可以在创建的时候进行设置为只读，使用ro (read only)

```shell script
-v /root/datavolume:/data:ro
```

<Vssue :title="$title" />