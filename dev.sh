#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

echo '选择开发环境'

select platform in 'gitee' 'github'; do
  case $platform in
  'gitee')
    echo '你选择了' $platform
    break
    ;;
  'github')
    echo '你选择了' $platform
    break
    ;;
  *)
    echo '输入错误，请重新输入'
    ;;
  esac
done

cross-env PLATFORM=$platform vuepress dev blog
