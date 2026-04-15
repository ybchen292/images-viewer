---
title: 高级使用
---

# 高级使用

本指南涵盖 ImagesViewer 的高级功能和配置，包括自定义选项、性能优化和与框架集成。

## 自定义主题

您可以使用 `theme` 配置完全自定义 ImagesViewer 的外观：

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  theme: {
    // 背景
    viewerBgColor: 'rgba(0, 0, 0, 0.9)',
    
    // 工具栏
    toolbarBgColor: 'rgba(30, 30, 30, 0.8)',
    toolbarBorderRadius: '8px',
    toolbarPadding: '10px 15px',
    
    // 按钮
    buttonBgColor: 'rgba(50, 50, 50, 0.7)',
    buttonHoverBg: 'rgba(80, 80, 80, 0.7)',
    buttonSize: '45px',
    
    // 导航按钮
    navButtonBgColor: 'rgba(50, 50, 50, 0.7)',
    navButtonSize: '55px',
    
    // 信息面板
    infoBgColor: 'rgba(30, 30, 30, 0.8)',
    infoBorderRadius: '8px',
    
    // 缩略图
    thumbItemWidth: '80px',
    thumbItemHeight: '50px',
    thumbGap: '12px',
    
    // 颜色
    textColor: 'rgba(255, 255, 255, 0.9)',
    activeColor: 'rgba(100, 150, 255, 0.8)',
    
    // 动画
    transitionSpeed: '0.3s'
  }
});
```

## 国际化

ImagesViewer 通过 `i18n` 配置支持国际化：

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  i18n: {
    info: {
      name: '名称:',
      dimensions: '尺寸:',
      shortcuts: '快捷键',
      zoomIn: '放大:',
      zoomOut: '缩小:',
      prev: '上一张:',
      next: '下一张:',
      reset: '重置:',
      fullscreen: '全屏:',
      info: '信息:',
      close: '关闭:'
    },
    buttons: {
      prev: '上一张 (←)',
      next: '下一张 (→)',
      close: '关闭 (Esc)'
    }
  }
});
```

## 缓存管理

通过缓存管理优化性能：

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg'],
  maxCacheSize: 20, // 缓存中最多 20 张图片
  preloadCount: 5, // 预加载 5 张相邻图片
});
```

## 自定义按钮

向工具栏添加自定义按钮：

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  customButtons: [
    [
      '🔍',
      () => {
        console.log('自定义搜索按钮点击');
        // 自定义功能
      }
    ],
    [
      '📌',
      () => {
        console.log('自定义固定按钮点击');
        // 自定义功能
      }
    ]
  ]
});
```

## 编程控制

对查看器的完全编程控制：

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  onShow: function(container) {
    // 访问 DOM 元素
    const toolbar = container.querySelector('.images-viewer-toolbar');
    
    // 添加自定义元素
    const customElement = document.createElement('div');
    customElement.textContent = '自定义内容';
    customElement.style.cssText = 'color: white; margin: 10px;';
    container.appendChild(customElement);
  }
});

// 稍后在代码中
setTimeout(() => {
  viewer.next(); // 前往下一张图片
}, 3000);

setTimeout(() => {
  viewer.close(); // 关闭查看器
}, 10000);
```

## 与框架集成

### Vue.js

```vue
<template>
  <div>
    <button @click="openViewer">查看图片</button>
  </div>
</template>

<script>
import ImagesViewer from 'images-viewer-js';

export default {
  methods: {
    openViewer() {
      new ImagesViewer({
        images: ['image1.jpg', 'image2.jpg'],
        closeOnMaskClick: true
      });
    }
  }
};
</script>
```

### React

```jsx
import React from 'react';
import ImagesViewer from 'images-viewer-js';

function ImageGallery() {
  const openViewer = () => {
    new ImagesViewer({
      images: ['image1.jpg', 'image2.jpg'],
      closeOnMaskClick: true
    });
  };

  return (
    <button onClick={openViewer}>查看图片</button>
  );
}

export default ImageGallery;
```

### Angular

```typescript
import { Component } from '@angular/core';
import ImagesViewer from 'images-viewer-js';

@Component({
  selector: 'app-image-viewer',
  template: '<button (click)="openViewer()">查看图片</button>'
})
export class ImageViewerComponent {
  openViewer() {
    new ImagesViewer({
      images: ['image1.jpg', 'image2.jpg'],
      closeOnMaskClick: true
    });
  }
}
```

## 性能优化

### 懒加载

ImagesViewer 自动为图片实现懒加载，但您可以进一步优化：

```javascript
const viewer = new ImagesViewer({
  images: largeImageArray,
  preloadCount: 3, // 只预加载 3 张相邻图片
  maxCacheSize: 10, // 限制缓存大小
});
```

### 缩略图优化

自定义缩略图设置以获得更好的性能：

```javascript
const viewer = new ImagesViewer({
  images: imageArray,
  theme: {
    thumbItemWidth: '60px', // 更小的缩略图
    thumbItemHeight: '40px',
    thumbMaxWidth: '60%' // 限制缩略图容器宽度
  }
});
```

## 高级事件处理

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  onShow: function(container) {
    console.log('查看器打开');
    // 添加自定义事件监听器
    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('custom-element')) {
        // 处理自定义元素点击
      }
    });
  },
  onClose: function() {
    console.log('查看器关闭');
    // 清理资源
  },
  onChange: function(data) {
    console.log(`切换到图片 ${data.index}`);
    // 跟踪图片视图
  }
});
```

## 安全考虑

### 图片源安全

从外部源加载图片时，确保它们来自受信任的域，以防止安全问题。

### CSP 合规性

如果您的站点使用内容安全策略 (CSP)，您可能需要添加适当的指令：

```html
<meta http-equiv="Content-Security-Policy" content="img-src 'self' https: data:">
```
