---
title: 基本示例
---

# 基本示例

本示例展示了 ImagesViewer 的基本用法，使用最小配置。

## 简单用法

### 单张图片

```javascript
// 单张图片 URL
const viewer = new ImagesViewer('path/to/image.jpg');
```

### 多张图片

```javascript
// 多张图片数组
const viewer = new ImagesViewer(['image1.jpg', 'image2.jpg', 'image3.jpg']);
```

### 带基本选项

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  closeOnMaskClick: true,
  loop: true
});
```

## 完整 HTML 示例

```html
<!DOCTYPE html>
<html>
  <head>
    <title>ImagesViewer 基本示例</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
        background-color: #f0f0f0;
      }
      .container {
        max-width: 800px;
        margin: 0 auto;
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 5px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
      }
      .button:hover {
        background-color: #45a049;
      }
      .gallery {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 20px 0;
      }
      .gallery img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        cursor: pointer;
        border-radius: 4px;
        transition: transform 0.2s;
      }
      .gallery img:hover {
        transform: scale(1.05);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>ImagesViewer 基本示例</h1>
      
      <h2>单张图片</h2>
      <button class="button" onclick="openSingleImage()">查看单张图片</button>
      
      <h2>多张图片</h2>
      <button class="button" onclick="openMultipleImages()">查看多张图片</button>
      
      <h2>图库</h2>
      <div class="gallery">
        <img src="https://picsum.photos/200/300?random=1" onclick="openGallery(0)" alt="图片 1">
        <img src="https://picsum.photos/200/300?random=2" onclick="openGallery(1)" alt="图片 2">
        <img src="https://picsum.photos/200/300?random=3" onclick="openGallery(2)" alt="图片 3">
        <img src="https://picsum.photos/200/300?random=4" onclick="openGallery(3)" alt="图片 4">
        <img src="https://picsum.photos/200/300?random=5" onclick="openGallery(4)" alt="图片 5">
      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/images-viewer-js@latest/dist/index.js"></script>
    <script>
      // 示例图片
      const images = [
        'https://picsum.photos/800/1200?random=1',
        'https://picsum.photos/800/1200?random=2',
        'https://picsum.photos/800/1200?random=3',
        'https://picsum.photos/800/1200?random=4',
        'https://picsum.photos/800/1200?random=5'
      ];

      function openSingleImage() {
        new ImagesViewer(images[0]);
      }

      function openMultipleImages() {
        new ImagesViewer({
          images: images,
          closeOnMaskClick: true,
          loop: true,
          buttons: {
            zoomIn: true,
            zoomOut: true,
            download: true,
            fullscreen: true
          }
        });
      }

      function openGallery(index) {
        new ImagesViewer({
          images: images,
          closeOnMaskClick: true,
          loop: true,
          buttons: {
            zoomIn: true,
            zoomOut: true,
            download: true,
            fullscreen: true,
            thumbnails: true
          },
          imageInfo: {
            visible: true
          }
        });
      }
    </script>
  </body>
</html>
```

## 与框架一起使用

### Vue.js 示例

```vue
<template>
  <div>
    <h1>Vue 中的 ImagesViewer</h1>
    <button @click="openViewer">查看图片</button>
    <div class="gallery">
      <img 
        v-for="(image, index) in images" 
        :key="index"
        :src="image.thumbnail"
        @click="openViewer(index)"
        alt="图片"
      >
    </div>
  </div>
</template>

<script>
import ImagesViewer from 'images-viewer-js';

export default {
  data() {
    return {
      images: [
        {
          thumbnail: 'https://picsum.photos/200/300?random=1',
          full: 'https://picsum.photos/800/1200?random=1'
        },
        {
          thumbnail: 'https://picsum.photos/200/300?random=2',
          full: 'https://picsum.photos/800/1200?random=2'
        },
        {
          thumbnail: 'https://picsum.photos/200/300?random=3',
          full: 'https://picsum.photos/800/1200?random=3'
        }
      ]
    };
  },
  methods: {
    openViewer(startIndex = 0) {
      const fullImages = this.images.map(img => img.full);
      const viewer = new ImagesViewer({
        images: fullImages,
        closeOnMaskClick: true,
        loop: true
      });
      
      // 跳转到点击的图片
      if (startIndex > 0) {
        setTimeout(() => {
          viewer.loadCurrentImage(startIndex);
        }, 100);
      }
    }
  }
};
</script>

<style scoped>
.gallery {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.gallery img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 4px;
}
</style>
```

### React 示例

```jsx
import React from 'react';
import ImagesViewer from 'images-viewer-js';

function ImageGallery() {
  const images = [
    'https://picsum.photos/800/1200?random=1',
    'https://picsum.photos/800/1200?random=2',
    'https://picsum.photos/800/1200?random=3'
  ];

  const openViewer = (startIndex = 0) => {
    const viewer = new ImagesViewer({
      images: images,
      closeOnMaskClick: true,
      loop: true
    });

    if (startIndex > 0) {
      setTimeout(() => {
        viewer.loadCurrentImage(startIndex);
      }, 100);
    }
  };

  return (
    <div>
      <h1>React 中的 ImagesViewer</h1>
      <button onClick={() => openViewer()}>查看所有图片</button>
      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`图片 ${index + 1}`}
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
            onClick={() => openViewer(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
```

## 演示的关键功能

- **基本初始化** - 创建简单的 ImagesViewer 实例
- **多张图片** - 在图库中查看多张图片
- **导航** - 使用上一张/下一张按钮和键盘快捷键
- **缩放** - 使用鼠标滚轮和缩放按钮
- **全屏** - 切换全屏模式
- **下载** - 下载图片
- **图片信息** - 显示图片信息
- **缩略图** - 使用缩略图导航
