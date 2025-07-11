---
title: KMS激活windows系统
date: 2025-06-17
tags: 
  - KMS
  - windows激活
author: sifu
location: 南昌
---

使用**管理员权限**运行 `cmd` 执行一句命令

```shell
slmgr /skms kms.loli.beer
```
这句命令的意思是，把kms服务器地址设置（set kms）为 `kms.loli.beer`

```shell
slmgr /ato
```
这句命令的意思是，马上对当前设置的key和服务器地址等进行尝试激活操作。


kms服务器地址可在如下网站上查询： [https://www.coolhub.top/tech-articles/kms_list.html](https://www.coolhub.top/tech-articles/kms_list.html)

> 注意：若失败请更换kms服务器地址重试
> 
> 或者先执行下面这个命令设置key后再此执行激活命令
> 
> slmgr -ipk W269N-WFGWX-YVC9B-4J6C9-T83GX