---
title: 高级配置
---

# 高级配置示例

本示例展示了 ImagesViewer 的高级配置选项，包括性能优化、自定义行为和与其他库的集成。

## 性能优化

### 缓存管理

```javascript
const viewer = new ImagesViewer({
  images: largeImageArray,
  maxCacheSize: 20, // 限制缓存为 20 张图片
  preloadCount: 5,   // 预加载 5 张相邻图片
});
```

### 缩略图优化

```javascript
const viewer = new ImagesViewer({
  images: imageArray,
  theme: {
    thumbItemWidth: '60px', // 更小的缩略图以获得更好的性能
    thumbItemHeight: '40px',
    thumbGap: '8px',
    thumbMaxWidth: '60%'
  }
});
```

## 自定义行为

### 事件回调

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  show: function(container) {
    console.log('查看器打开');
    // 添加自定义元素
    const header = document.createElement('div');
    header.textContent = '自定义头部';
    header.style.cssText = 'color: white; position: absolute; top: 20px; left: 50%; transform: translateX(-50%);';
    container.appendChild(header);
  },
  close: function() {
    console.log('查看器关闭');
    // 清理资源
  },
  change: function(index, direction) {
    console.log('图片改变:', index, direction);
    // 跟踪分析
  }
});
```

### 自定义按钮

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  customButtons: [
    [
      '🔍',
      () => {
        console.log('搜索按钮点击');
        // 自定义搜索功能
      }
    ],
    [
      '📌',
      () => {
        console.log('固定按钮点击');
        // 自定义固定功能
      }
    ],
    [
      '📤',
      () => {
        console.log('分享按钮点击');
        // 分享功能
      }
    ]
  ]
});
```

## 完整高级示例

```html
<!DOCTYPE html>
<html>
  <head>
    <title>ImagesViewer 高级配置示例</title>
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
      .config-option {
        margin: 15px 0;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      .config-option h3 {
        margin-top: 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>ImagesViewer 高级配置示例</h1>
      
      <div class="config-option">
        <h3>性能优化</h3>
        <button class="button" onclick="openPerformanceOptimized()">打开优化的查看器</button>
      </div>
      
      <div class="config-option">
        <h3>自定义按钮</h3>
        <button class="button" onclick="openWithCustomButtons()">打开带自定义按钮的查看器</button>
      </div>
      
      <div class="config-option">
        <h3>事件回调</h3>
        <button class="button" onclick="openWithCallbacks()">打开带回调的查看器</button>
      </div>
      
      <div class="config-option">
        <h3>完全自定义</h3>
        <button class="button" onclick="openFullyCustomized()">打开完全自定义的查看器</button>
      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/images-viewer-js@latest/dist/index.js"></script>
    <script>
      // 生成用于测试的大型图片数组
      function generateImageArray(count) {
        const images = [];
        for (let i = 1; i <= count; i++) {
          images.push(`https://picsum.photos/800/1200?random=${i}`);
        }
        return images;
      }

      const largeImageArray = generateImageArray(50);

      function openPerformanceOptimized() {
        new ImagesViewer({
          images: largeImageArray,
          maxCacheSize: 15, // 大型图片使用较小的缓存
          preloadCount: 3,   // 更少的预加载图片
          theme: {
            thumbItemWidth: '60px',
            thumbItemHeight: '40px'
          },
          buttons: {
            thumbnails: true
          }
        });
      }

      function openWithCustomButtons() {
        new ImagesViewer({
          images: ['https://picsum.photos/800/1200?random=1', 'https://picsum.photos/800/1200?random=2'],
          customButtons: [
            ['🔍', () => console.log('搜索')],
            ['📌', () => console.log('固定')],
            ['📤', () => console.log('分享')],
            ['❤️', () => console.log('收藏')]
          ]
        });
      }

      function openWithCallbacks() {
        new ImagesViewer({
          images: ['https://picsum.photos/800/1200?random=1', 'https://picsum.photos/800/1200?random=2', 'https://picsum.photos/800/1200?random=3'],
          show: function(container) {
            console.log('查看器打开');
            // 添加自定义加载指示器
            const loading = document.createElement('div');
            loading.textContent = '加载中...';
            loading.style.cssText = 'color: white; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);';
            container.appendChild(loading);
            
            // 2 秒后移除加载指示器
            setTimeout(() => {
              loading.remove();
            }, 2000);
          },
          close: function() {
            console.log('查看器关闭');
            alert('查看器已关闭！');
          },
          change: function(index, direction) {
            console.log(`切换到图片 ${index} (${direction})`);
            document.title = `图片 ${index + 1} | ImagesViewer`;
          }
        });
      }

      function openFullyCustomized() {
        new ImagesViewer({
          images: ['https://picsum.photos/800/1200?random=1', 'https://picsum.photos/800/1200?random=2', 'https://picsum.photos/800/1200?random=3'],
          closeOnMaskClick: true,
          loop: true,
          maxCacheSize: 10,
          preloadCount: 4,
          buttons: {
            zoomIn: true,
            zoomOut: true,
            rotateLeft: true,
            rotateRight: true,
            reset: true,
            download: true,
            fullscreen: true,
            prev: true,
            next: true,
            close: true,
            topClose: true,
            thumbnails: true,
            info: true,
            originalSize: true
          },
          customButtons: [
            ['🔍', () => console.log('搜索')],
            ['📌', () => console.log('固定')]
          ],
          imageInfo: {
            visible: true,
            showName: true,
            showDimensions: true
          },
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
          },
          theme: {
            viewerBgColor: 'rgba(0, 0, 0, 0.95)',
            toolbarBgColor: 'rgba(30, 30, 30, 0.9)',
            buttonBgColor: 'rgba(50, 50, 50, 0.8)',
            buttonHoverBg: 'rgba(80, 80, 80, 0.8)',
            textColor: 'rgba(255, 255, 255, 0.9)',
            activeColor: 'rgba(100, 150, 255, 0.8)',
            thumbItemWidth: '80px',
            thumbItemHeight: '50px',
            thumbGap: '10px'
          },
          show: function(container) {
            console.log('查看器打开');
          },
          close: function() {
            console.log('查看器关闭');
          },
          change: function(index, direction) {
            console.log('图片改变:', index, direction);
          }
        });
      }
    </script>
  </body>
</html>
```

## 与其他库集成

### 与分析库集成

```javascript
const viewer = new ImagesViewer({
  images: productImages,
  show: function() {
    // 跟踪查看器打开事件
    analytics.track('viewer_open', {
      imageCount: productImages.length
    });
  },
  close: function() {
    // 跟踪查看器关闭事件
    analytics.track('viewer_close');
  },
  change: function(index, direction) {
    // 跟踪图片查看事件
    analytics.track('image_view', {
      imageIndex: index,
      imageId: productIds[index],
      direction: direction
    });
  }
});
```

### 与延迟加载库集成

```javascript
// 与延迟加载库一起使用
const lazyImages = document.querySelectorAll('.lazy-image');

lazyImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    // 获取高分辨率图片 URL
    const highResUrl = img.dataset.highRes;
    
    // 使用此图片和相关图片打开查看器
    new ImagesViewer({
      images: productImages,
      // 其他配置
    });
  });
});
```

## 高级用例

### 图片比较

```javascript
// 图片比较功能
const viewer = new ImagesViewer({
  images: ['before.jpg', 'after.jpg'],
  loop: true,
  buttons: {
    prev: true,
    next: true
  },
  change: function(index) {
    console.log(`显示 ${index === 0 ? '之前' : '之后'} 图片`);
  }
});
```

### 幻灯片模式

```javascript
// 幻灯片功能
const viewer = new ImagesViewer({
  images: slideshowImages,
  show: function() {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slideshowImages.length;
      viewer.loadCurrentImage(currentIndex);
    }, 3000);
    
    // 存储定时器引用以便清理
    viewer.slideshowInterval = interval;
  },
  close: function() {
    // 关闭时清除定时器
    if (viewer.slideshowInterval) {
      clearInterval(viewer.slideshowInterval);
    }
  }
});
```

## 最佳实践

### 对于大型图片集合

- 使用更小的缩略图尺寸
- 限制缓存大小
- 减少预加载数量
- 考虑使用渐进式加载

### 对于嵌入式系统

- 禁用不必要的功能
- 使用最小主题
- 限制图片分辨率
- 优化内存使用

### 对于高流量网站

- 对图片使用 CDN
- 实现服务器端缓存
- 考虑使用 WebP 格式的图片
- 监控性能指标
