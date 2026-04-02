---
title: ImagesViewer
layout: home

hero:
  name: "ImagesViewer"
  text: "功能丰富的图片查看器"
  tagline: 响应式、可定制、框架无关
  image:
    # src: /images-viewer-logo.svg
    alt: ImagesViewer
  actions:
    - theme: brand
      text: 开始使用
      link: /guide/
    - theme: alt
      text: 在 GitHub 上查看
      link: https://github.com/ybchen292/images-viewer

features:
  - icon: 🖼️
    title: 多图片支持
    details: 轻松查看单张或多张图片
  - icon: 🔍
    title: 缩放与旋转
    details: 直观的缩放和旋转控制
  - icon: 📱
    title: 触摸支持
    details: 移动设备友好的手势控制
  - icon: 🎨
    title: 主题定制
    details: 完全可定制的外观
  - icon: 🌍
    title: 国际化
    details: 多语言界面支持
  - icon: ⚡
    title: 性能优化
    details: 懒加载和智能缓存
---

## 什么是 ImagesViewer？

ImagesViewer是一个功能强大、轻量级的图片查看器，使用原生 JavaScript 构建。它提供了丰富的功能，用于查看和交互图片，包括缩放、旋转、导航等。
<div><a style='cursor: pointer;' @click="openViewer">预览效果</a></div>

<script setup>
  import ImagesViewer from '../index.js';
  function openViewer() {
    const viewer = new ImagesViewer({
      images: [
        'https://picsum.photos/id/22/200/300',
        'https://picsum.photos/id/23/200/300',
        'https://picsum.photos/id/24/200/300',
        'https://picsum.photos/id/237/800/600',
        ]
    });
  }
</script>

### 主要优势

- **框架无关**：可与任何 JavaScript 框架一起使用，或不使用框架
- **响应式**：适应任何屏幕尺寸
- **高度可定制**：丰富的配置选项
- **性能优化**：智能缓存和懒加载
- **功能丰富**：全面的图片查看工具集

### 几分钟内开始使用

```javascript
// 简单使用
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg']
});

// 高级配置
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  theme: {
    viewerBgColor: 'rgba(0, 0, 0, 0.8)'
  },
  i18n: {
    info: {
      name: '名称:',
      dimensions: '尺寸:'
    }
  }
});
```

## 浏览器支持

ImagesViewer 适用于所有现代浏览器，包括：

- Chrome
- Firefox
- Safari
- Edge
- Opera

## 许可证

MIT 许可证