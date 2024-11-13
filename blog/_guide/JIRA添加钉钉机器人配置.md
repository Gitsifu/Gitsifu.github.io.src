---
title: JIRA添加钉钉机器人配置
date: 2024-11-13
tags: 
  - JIRA
  - 钉钉机器人
author: sifu
location: 南昌
---

![jira配置截图](~@assets/images/jira.png)

## 钉钉机器人配置 `webhook` 请求自定义数据配置

> `jira smart values` 配置请参考官方文档 [Jira Smart Values](https://confluence.atlassian.com/automation/jira-smart-values-issues-993924860.html)

```text
{
    'msgtype': 'markdown',
    'markdown': {
        'title': '【缺陷提醒】',
        'text': "### 缺陷提醒 \n #### 项目名称：{{issue.project.name}} \n #### 概要：{{issue.summary}} \n #### 经办人：{{issue.watchers.displayName}} \n #### 创建时间：{{issue.created.format("yyyy/MM/dd HH:mm")}} \n #### 类型：{{issue.issuetype.name}} \n #### 任务状态：{{issue.status.name}} \n #### 缺陷链接：{{issue.url}}"
    }
}
```
