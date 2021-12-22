#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

echo '选择发布的环境'

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

# 生成静态文件
cross-env PLATFORM=$platform vuepress build blog

# 进入生成的文件夹
cd blog/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

if [ $platform == 'gitee' ]; then
  echo '正在部署gitee...'
  git push -f git@gitee.com:sifu/blog.git master
elif [ $platform == 'github' ]; then
  echo '正在部署github...'
  git push -f git@github.com:Gitsifu/Gitsifu.github.io.git master
fi

echo '部署成功'

cd -
