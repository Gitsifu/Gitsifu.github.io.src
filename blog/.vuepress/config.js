const path = require("path");

// const PLATFORM = 'gitee'
const PLATFORM = 'github'

const platformConfig = {
    github: {
        base: '/',
        platform: 'github',
        owner: 'Gitsifu',
        repo: 'Gitsifu.github.io',
        clientId: '5f55e3f7a34fb67e324e',
        clientSecret: 'ee2bc1ea340708d27b7f6393f7b1fb157969afdb',
    },
    gitee: {
        base: '/blog/',
        platform: 'gitee',
        owner: 'sifu',
        repo: 'blog',
        clientId: '4c21cb1f3ae4ca1e37568c70669ab560779f61c189ecc36e9b602268894aac66',
        clientSecret: '9320982f45c61012fe8ecf3d4128a9786e1aeea7a55bafeb846bb137fd573d67',
    }
}

const {base,platform,owner,repo,clientId,clientSecret} = platformConfig[PLATFORM]

module.exports = {
    base,
    title: 'sifu',
    description: 'sifu的个人博客',
    head:[
        ['link',{rel:'icon',href:'/favicon.ico'}],
        // 防图片盗链解决方案 https://github.com/biaochenxuying/blog/issues/31
        ['meta',{name: 'referrer', content: 'never'}]
    ],
    // 代码显示行号
    markdown: {
        lineNumbers: true
    },
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
    plugins: [
        // 评论
        ['@vssue/vuepress-plugin-vssue', {
            platform,
            owner,
            repo,
            clientId,
            clientSecret,
            locale: 'zh',
            issueContent: ({url}) =>
                `这个 Issue 由 Vssue 自动创建，用来存储该页面的评论：${url}`
        }],

        // 图片点击放大
        ['@vuepress/medium-zoom', {
            selector: '.content__default p img',
            // medium-zoom options here
            // See: https://github.com/francoischalifour/medium-zoom#options
            // options: {
            //     margin: 16,
            //     background: '#BADA55',
            //     scrollOffset: 0,
            //     container: '#zoom-container',
            //     template: '#zoom-template',
            // }
        }],

        // 返回顶部
        ['@vuepress/plugin-back-to-top', {}],

        // 自定义插件
        // [require('./plugins/plugin-back-to-top'), {}]

        // 鼠标动效
        [
            //鼠标点击特效 先安装在配置， npm install vuepress-plugin-cursor-effects --save
            "cursor-effects",
            {
                size: 3,                    // size of the particle, default: 2
                shape: ['star'],  // shape of the particle,['star'| 'circle'] default: 'star'
                zIndex: 999999999           // z-index property of the canvas, default: 999999999
            }
        ],

        // 动态标题
        // [
        //     //动态标题 先安装在配置， npm install vuepress-plugin-dynamic-title --save
        //     "dynamic-title",
        //     {
        //         showIcon: "/favicon.ico",
        //         showText: "(/≧▽≦/)咦！又好了！",
        //         hideIcon: "/failure.ico",
        //         hideText: "(●—●)喔哟，崩溃啦！",
        //         recoverTime: 2000
        //     }
        // ],
        // 看板娘插件
        [
            "@vuepress-reco/vuepress-plugin-kan-ban-niang",
            {
                theme: ['miku', 'blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'z16'],
                clean: false,
                messages: {
                    welcome: '欢迎来到sifu',
                    home: '心里的花，我想要带你回家。',
                    theme: '好吧，希望你能喜欢我的其他小伙伴。',
                    close: '你知道我喜欢吃什么吗？痴痴地望着你。'
                },
                messageStyle: {
                    right: '68px',
                    bottom: '300px'
                },
                modelStyle: {
                    right: '90px',
                    bottom: '-20px',
                    opacity: '0.9'
                },
                btnStyle: {
                    right: '90px',
                    bottom: '40px'
                },
                width: 225,
                height: 330,
            }
        ],
        // 播放器插件
        // [
        //     "@vuepress-reco/vuepress-plugin-bgm-player",
        //     {
        //         audios: [
        //             // 本地文件示例
        //             // {
        //             //     name: '장가갈 수 있을까',
        //             //     artist: '咖啡少年',
        //             //     url: '/bgm/1.mp3',
        //             //     cover: '/bgm/1.jpg'
        //             // },
        //             // 网络文件示例
        //             {
        //                 name: '강남역 4번 출구',
        //                 artist: 'Plastic / Fallin` Dild',
        //                 url: 'https://assets.smallsunnyfox.com/music/2.mp3',
        //                 cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
        //             },
        //             {
        //                 name: '用胳膊当枕头',
        //                 artist: '최낙타',
        //                 url: 'https://assets.smallsunnyfox.com/music/3.mp3',
        //                 cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
        //             }
        //         ],
        //         position: {
        //             left: '10px',
        //             bottom: '70px',
        //             'z-index': '999999'
        //         },
        //         floatStyle: {
        //             bottom: '90px',
        //             'z-index': '999999'
        //         }
        //     }
        // ],
        // 代码插件
        [
            "@vuepress-reco/extract-code"
        ],
    ],
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
        dateFormat: 'YYYY-MM-DD dddd',
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
                text: '遨游江湖',
                link: '/writings/',
            },
            {
                text: '藏宝阁',
                link: '/link/',
            },
            {
                text: '秘籍标签',
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
            // {
            //     id: 'link', // Unique id for current classifier
            //     dirname: '_link', // Matched directory name
            //     path: '/link/', // Entry page for current classifier
            //     title: '链接', // Entry and pagination page titles for current classifier.
            //     layout: 'IndexWriting', // Layout component name for entry page.
            //     frontmatter: { //Front matter for entry page.
            //         tag: 'vuepress'
            //     },
            //     itemLayout: 'Writing', // Layout for matched pages.
            //     itemPermalink: '/link/:slug', // Permalink for matched pages.   /writings/:year/:month/:day/:slug
            //     // pagination: { // Pagination behavior
            //     //     lengthPerPage: 10,
            //     // },
            // },
        ]
    },
}
