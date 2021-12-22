#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

echo '选择开发环境'

select platform in 'gitee' 'github'; do
  echo '你选择了' $platform
  break
done

cross-env PLATFORM=$platform vuepress dev blog
