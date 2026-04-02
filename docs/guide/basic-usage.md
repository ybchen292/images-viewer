---
title: 基础使用
---

# 基础使用

本指南将引导您了解 ImagesViewer 的基本使用方法，包括如何创建实例、在图片之间导航以及使用核心功能。

## 创建实例

有多种方式创建 ImagesViewer 实例：

### 单张图片

```javascript
// 单张图片 URL
const viewer = new ImagesViewer('path/to/image.jpg');
```

### 多张图片

```javascript
// 多张图片作为数组
const viewer = new ImagesViewer(['image1.jpg', 'image2.jpg', 'image3.jpg']);

// 多张图片带选项
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg']
});
```

### 带配置

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  closeOnMaskClick: true,
  loop: true,
  buttons: {
    zoomIn: true,
    zoomOut: true,
    download: true
  }
});
```

## 基本导航

### 下一张/上一张图片

```javascript
// 前往下一张图片
viewer.next();

// 前往上一张图片
viewer.prev();

// 跳转到指定图片
viewer.loadCurrentImage(2); // 加载第 3 张图片（0 索引）
```

### 键盘导航

ImagesViewer 支持键盘快捷键导航：

| 快捷键 | 操作 |
| -------- | ------ |
| `←` | 上一张图片 |
| `→` | 下一张图片 |
| `Esc` | 关闭查看器 |
| `↑` 或 `+` | 放大 |
| `↓` 或 `-` | 缩小 |
| `0` | 重置缩放 |
| `F` | 切换全屏 |
| `I` | 切换信息面板 |

## 缩放和旋转

### 缩放

```javascript
// 放大 10%
viewer.zoom(0.1);

// 缩小 10%
viewer.zoom(-0.1);

// 重置缩放
viewer.reset();

// 显示原始尺寸
viewer.showOriginalSize();
```

### 旋转

```javascript
// 顺时针旋转 90 度
viewer.rotate(90);

// 逆时针旋转 90 度
viewer.rotate(-90);
```

## 全屏模式

```javascript
// 切换全屏
viewer.toggleFullscreen();
```

## 下载图片

```javascript
// 下载当前图片
viewer.downloadImage();
```

## 关闭查看器

```javascript
// 关闭查看器
viewer.close();
```

## 事件回调

您可以使用回调函数监听各种事件：

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  show: function(container) {
    console.log('查看器显示:', container);
  },
  close: function() {
    console.log('查看器关闭');
  },
  change: function(currentIndex, direction) {
    console.log('图片改变:', currentIndex, direction);
  }
});
```

## 鼠标和触摸操作

### 鼠标操作

- **拖动**：按住鼠标左键拖动图片
- **缩放**：使用鼠标滚轮缩放
- **双击**：切换缩放状态

### 触摸操作

- **单指拖动**：移动图片
- **双指捏合**：缩放图片
- **双击**：切换缩放状态

## 基础示例

以下是使用 ImagesViewer 的完整示例：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>ImagesViewer 示例</title>
  </head>
  <body>
    <button onclick="openViewer()">查看图片</button>

    <script src="https://cdn.jsdelivr.net/npm/images-viewer-js@latest/dist/index.js"></script>
    <script>
      function openViewer() {
        const viewer = new ImagesViewer({
          images: [
            'https://example.com/image1.jpg',
            'https://example.com/image2.jpg',
            'https://example.com/image3.jpg'
          ],
          closeOnMaskClick: true,
          imageInfo: {
            visible: true
          },
          buttons: {
            zoomIn: true,
            zoomOut: true,
            download: true,
            fullscreen: true
          }
        });
      }
    </script>
  </body>
</html>
```