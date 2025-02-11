---
title: ollama模型下载后期速度慢解决方案deepseek
date: 2025-02-11
tags: 
  - ollama
  - ai
  - deepseek

author: sifu
location: 南昌
---

以下是使用shell脚本实现的一个示例，该脚本会尝试下载一个名为"deepseek-r1:32b"的模型。通过每隔60秒中断一次下载操作，从何恢复下载速度。

```shell
#!/bin/bash

while true; do
    # 检查模型是否已下载完成
    modelExists=$(ollama list | grep "deepseek-r1:32b")

    if [ -n "$modelExists" ]; then
        echo "模型已下载完成！"
        break
    fi

    # 启动ollama进程并记录
    echo "开始下载模型..."
    ollama run deepseek-r1:32b &  # 在后台启动进程
    processId=$!  # 获取最近启动的后台进程的PID

    # 等待60秒
    sleep 60

    # 尝试终止进程
    if kill -0 $processId 2>/dev/null; then
        kill -9 $processId  # 强制终止进程
        echo "已中断本次下载，准备重新尝试..."
    else
        echo "进程已结束，无需中断"
    fi
done
```