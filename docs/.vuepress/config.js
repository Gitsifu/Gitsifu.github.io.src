const path = require("path");
module.exports = {
    title: 'sifu',
    description: 'sifu的个人博客',
    head:[
        ['link',{rel:'icon',href:'/favicon.ico'}]
    ],
    configureWebpack: {
        resolve: {
            alias: {
                '@assets': '../assets'
            }
        }
    },
    // 设置别名，两种方式都可以
    // alias: {
    //     "@assets": path.resolve(__dirname, "../assets")
    // },
    plugins: {
        '@vssue/vuepress-plugin-vssue': {
            // Github 是 'https://github.com'
            // Gitlab 是 'https://gitlab.com'
            // Bitbucket 是'https://bitbucket.org'
            // Gitee 是'https://gitee.com'
            // Gitea 是'https://gitea.com'
            // baseURL: 'https://github.com',

            // 设置 `platform` 而不是 `api`
            platform: 'github',
            // 其他的 Vssue 配置
            owner: 'Gitsifu',
            repo: 'Gitsifu.github.io',
            clientId: '5f55e3f7a34fb67e324e',
            clientSecret: 'ee2bc1ea340708d27b7f6393f7b1fb157969afdb',
            locale: 'zh',
            issueContent: ({url}) =>
                `这个 Issue 由 Vssue 自动创建，用来存储该页面的评论：${url}`
        },
    },
    theme: '@vuepress/blog',
    themeConfig: {
        // 全局分页配置
        globalPagination: {
            prevText: '上一页', // Text for previous links.
            nextText: '下一页', // Text for next links.
            lengthPerPage: '10', // Maximum number of posts per page.
            layout: 'Pagination', // Layout for pagination page
        },
        // 启动平滑
        smoothScroll: true,
        dateFormat: 'YYYY-MM-DD',
        // 导航栏配置
        nav: [
            {
                text: '首页',
                link: '/',
            },
            {
                text: '武功秘籍',
                link: '/guide/',
            },
            {
                text: '随笔',
                link: '/writings/',
            },
            {
                text: '标签',
                link: '/tag/',
            },
        ],
        // 脚眉配置
        footer: {
            // 左下角联系信息
            contact: [
                {
                    type: 'github',
                    link: 'https://github.com/Gitsifu',
                },
                // {
                //     type: 'mail',
                //     link: '2587107273@qq.com',
                // },
            ],
            // 右下角版权信息
            copyright: [
                {
                    text: '隐私政策',
                    link: 'https://policies.google.com/privacy?hl=en-US',
                },
                {
                    text: 'MIT Licensed | Copyright © 2020-present sifu',
                },
            ],
        },

        // 目录配置
        directories: [
            {
                id: 'guide', // Unique id for current classifier
                dirname: '_guide', // Matched directory name
                path: '/guide/', // Entry page for current classifier
                title: '武功秘籍', // Entry and pagination page titles for current classifier.
                layout: 'IndexWriting', // Layout component name for entry page.
                frontmatter: { //Front matter for entry page.
                    tag: 'guide'
                },
                itemLayout: 'Writing', // Layout for matched pages.
                itemPermalink: '/guide/:slug', // Permalink for matched pages.  /writings/:year/:month/:day/:slug
                // pagination: { // Pagination behavior
                //     lengthPerPage: 10,
                // },
            },
            {
                id: 'writing', // Unique id for current classifier
                dirname: '_writings', // Matched directory name
                path: '/writings/', // Entry page for current classifier
                title: '随笔', // Entry and pagination page titles for current classifier.
                layout: 'IndexWriting', // Layout component name for entry page.
                frontmatter: { //Front matter for entry page.
                    tag: 'vuepress'
                },
                itemLayout: 'Writing', // Layout for matched pages.
                itemPermalink: '/writings/:slug', // Permalink for matched pages.   /writings/:year/:month/:day/:slug
                // pagination: { // Pagination behavior
                //     lengthPerPage: 10,
                // },
            },
        ]
    },
}
