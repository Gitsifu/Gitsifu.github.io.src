module.exports = {
    title: 'sifu',
    description: 'sifu的个人博客',
    plugins: {
        '@vssue/vuepress-plugin-vssue': {
            // Github 是 'https://github.com'
            // Gitlab 是 'https://gitlab.com'
            // Bitbucket 是'https://bitbucket.org'
            // Gitee 是'https://gitee.com'
            // Gitea 是'https://gitea.com'
            baseURL: 'https://github.com',
            // 设置 `platform` 而不是 `api`
            platform: 'github',

            // 其他的 Vssue 配置
            owner: 'Gitsifu',
            repo: 'Gitsifu.github.io',
            clientId: '5f55e3f7a34fb67e324e',
            clientSecret: 'ee2bc1ea340708d27b7f6393f7b1fb157969afdb',

            locale: 'zh',
            issueContent: ({ url }) =>
                `这个 Issue 由 Vssue 自动创建，用来存储该页面的评论：${url}`
        },
    },
    theme: '@vuepress/blog',
    themeConfig: {
        dateFormat: 'YYYY-MM-DD',
        nav: [
            {
                text: '首页',
                link: '/',
            },
            {
                text: '测试',
                link: '/test/',
            },
            {
                text: '标签',
                link: '/tag/',
            },
        ],
        footer: {
            // 左下角联系信息
            contact: [
                {
                    type: 'github',
                    link: 'https://github.com/vuejs/vuepress',
                },
                {
                    type: 'twitter',
                    link: 'https://github.com/vuejs/vuepress',
                },
            ],
            // 右下角版权信息
            copyright: [
                {
                    text: 'Privacy Policy',
                    link: 'https://policies.google.com/privacy?hl=en-US',
                },
                {
                    text: 'MIT Licensed | Copyright © 2018-present Vue.js',
                },
            ],
        },

        directories: [
            {
                id: 'writing', // Unique id for current classifier
                dirname: '_writings', // Matched directory name
                path: '/writings/', // Entry page for current classifier
                title: '随笔', // Entry and pagination page titles for current classifier.
                layout: 'IndexWriting', // Layout component name for entry page.
                frontmatter:{ //Front matter for entry page.
                    tag: 'vuepress'
                },
                itemLayout: 'Writing', // Layout for matched pages.
                itemPermalink: '/writings/:slug', // Permalink for matched pages.   /writings/:year/:month/:day/:slug
                pagination: { // Pagination behavior
                    lengthPerPage: 2,
                },
            },
            {
                id: 'home', // Unique id for current classifier
                dirname: '_home', // Matched directory name
                path: '/', // Entry page for current classifier
                title: '首页', // Entry and pagination page titles for current classifier.
                layout: 'IndexWriting', // Layout component name for entry page.
                frontmatter:{ //Front matter for entry page.
                    tag: 'vuepress'
                },
                itemLayout: 'Writing', // Layout for matched pages.
                itemPermalink: '/home/:slug', // Permalink for matched pages.
                pagination: { // Pagination behavior
                    lengthPerPage: 2,
                },
            },
        ]
    },
}
