/*
 * @Description: 
 * @Author: linjy
 * @Date: 2019-08-04 12:04:04
 * @LastEditTime: 2019-08-09 22:49:46
 * @LastEditors: linjy
 */
module.exports = {
    base: '/Fe-Auto-Testing/',
    dest: 'dist',
    title: '前端自动化测试',
    description: 'Analysis vue.js deeply',
    head: [
        ['link', { rel: 'icon', href: `/logo.png` }],
        ['link', {rel: 'manifest', href: '/manifest.json'}],
        ['meta', {name: 'theme-color', content: '#3eaf7c'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
        ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    serviceWorker: false,
    themeConfig: {
        repo: 'Jecyu/fe-auto-test',
        editLinks: true,
        docsDir: 'docs',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: [
            {
                text: '配套例子',
                link: 'https://coding.imooc.com/class/228.html'
            }
        ],
        sidebar: [
            {
                title: '测试相关概念',
                collapsable: false,
                children: [
                    ['concepts/', 'Introduction'],
                    'concepts/reason',
                    'concepts/type',
                ]
            },
            {
                title: '测试实战',
                collapsable: false,
                children: [
                    ['practice/', 'Introduction'],
                    'practice/solution',
                    'practice/mocha',
                    'practice/jest',
                    'practice/vue',
                ]
            },
            {
                title: '持续集成自动化测试',
                collapsable: false,
                children: [
                    ['auto/', 'Introduction'],
                    'auto/travis-ci',
                    'auto/jenkins',
                ]
            },
            {
                title: '扩展',
                collapsable: false,
                children: [
                    ['popularize/', 'Introduction'],
                ]
            },
            {
                title: 'Troubleshooting',
                collapsable: false,
                children: [
                    ['tip/', 'Introduction'],
                ]
            },
            {
                title: '参考资料',
                collapsable: false,
            },
        ]
    }
}
