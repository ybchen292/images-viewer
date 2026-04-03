import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ImagesViewer',
  description: '功能丰富的响应式图片查看器，支持缩放、旋转、导航等操作。',
  lang: 'zh-CN',
  base: '/images-viewer/',
  lastUpdated: true,
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'ImagesViewer',
      description: 'A feature-rich, responsive image viewer supporting zoom, rotation, navigation, and more.',
    },
  },
  themeConfig: {
    search: {
      provider: 'local',
    },
    editLink: {
      pattern: 'https://github.com/ybchen292/images-viewer/docs/:path',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/' },
            { text: '安装', link: '/guide/installation' },
            { text: '预览', link: '/guide/preview' },
            { text: '基础使用', link: '/guide/basic-usage' },
            { text: '高级使用', link: '/guide/advanced-usage' },
          ],
        },
        {
          text: 'API 参考',
          items: [
            { text: '配置', link: '/guide/api/configuration' },
            { text: '方法', link: '/guide/api/methods' },
            { text: '事件', link: '/guide/api/events' },
            { text: 'TypeScript 类型', link: '/guide/api/types' },
          ],
        },
        {
          text: '示例',
          items: [
            { text: '基础示例', link: '/guide/examples/basic' },
            { text: '自定义主题', link: '/guide/examples/custom-theme' },
            { text: '国际化示例', link: '/guide/examples/i18n' },
            { text: '高级配置', link: '/guide/examples/advanced' },
          ],
        },
      ],
      '/en/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/en/guide/' },
            { text: 'Installation', link: '/en/guide/installation' },
            { text: 'Preview', link: '/en/guide/preview' },
            { text: 'Basic Usage', link: '/en/guide/basic-usage' },
            { text: 'Advanced Usage', link: '/en/guide/advanced-usage' },
          ],
        },
        {
          text: 'API Reference',
          items: [
            { text: 'Configuration', link: '/en/guide/api/configuration' },
            { text: 'Methods', link: '/en/guide/api/methods' },
            { text: 'Events', link: '/en/guide/api/events' },
            { text: 'TypeScript Types', link: '/en/guide/api/types' },
          ],
        },
        {
          text: 'Examples',
          items: [
            { text: 'Basic Example', link: '/en/guide/examples/basic' },
            { text: 'Custom Theme', link: '/en/guide/examples/custom-theme' },
            { text: 'Internationalization', link: '/en/guide/examples/i18n' },
            { text: 'Advanced Configuration', link: '/en/guide/examples/advanced' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ybchen292/images-viewer' },
      { icon: 'gitee', link: 'https://gitee.com/ybchen292/images-viewer' },
    ],

    footer: {
      message: '使用 MIT 许可证发布。',
      copyright: '版权所有 © 2026-present ImagesViewer',
    },
  },
});
