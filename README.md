# sifu-blog

个人博客

## 主页
github：[http://gitsifu.github.io](http://gitsifu.github.io)

国内镜像gitee：[https://sifu.gitee.io/blog/](https://sifu.gitee.io/blog/)

## 开发

1. 选择部署环境
`blog/.vuepress/config.js`文件
```
// gitee
const PLATFORM = 'gitee'

// github
// const PLATFORM = 'github'
```

2.运行命令
```
npm run blog:dev
```

## 部署

1. 选择部署环境
`blog/.vuepress/config.js`文件
```
// gitee
const PLATFORM = 'gitee'

// github
// const PLATFORM = 'github'
```

2.执行`deploy-gitee.sh` 或 `deploy.github.sh`脚本
```
./deploy-gitee.sh

./deploy-github.sh
```

## [favicon.ico制作](https://favicon.io/favicon-generator/)

原始ico配色
```
Font Color: #FF0
   
Background Color: #05A
```