---
title: vue多页面开发部署nginx配置
date: 2021-03-11
tags:
  - Vue
  - nginx
author: sifu
location: 南昌
---


- 部署nginx配置

```
# 精准匹配 '/' 重定向到pc页面
location = / {
  rewrite / /pc permanent;
}
# 匹配以 '/pc' 开头
location ^~ /pc {
  try_files $uri $uri/ /pc.html;
}
# 匹配以 '/mobile' 开头
location ^~ /m {
  try_files $uri $uri/ /mobile.html;
}

# 接口代理配置
location /pro-api/ {
  # 修改此处目标域名
  proxy_pass http://app.com/;
  proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
  proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
  proxy_max_temp_file_size 0;
  proxy_connect_timeout      90;
  proxy_send_timeout         90;
  proxy_read_timeout         90;
  proxy_buffer_size          4k;
  proxy_buffers              4 32k;
  proxy_busy_buffers_size    64k;
  proxy_temp_file_write_size 64k;
}
```
