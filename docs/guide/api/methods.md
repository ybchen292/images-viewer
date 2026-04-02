---
title: 方法
---

# 方法

本页面记录了 ImagesViewer 类中所有可用的方法。

## 导航方法

### `next()`

加载序列中的下一张图片。

**返回值：** `void`

```javascript
// 前往下一张图片
viewer.next();
```

### `prev()`

加载序列中的上一张图片。

**返回值：** `void`

```javascript
// 前往上一张图片
viewer.prev();
```

### `loadCurrentImage(index?: number)`

加载指定索引的图片。

**参数：**
- `index`（可选）：要加载的图片索引

**返回值：** `void`

```javascript
// 加载特定图片
viewer.loadCurrentImage(2); // 加载第 3 张图片（0 索引）

// 重新加载当前图片
viewer.loadCurrentImage();
```

## 变换方法

### `zoom(delta: number)`

按指定的增量缩放当前图片。

**参数：**
- `delta`：缩放变化量（正值为放大，负值为缩小）

**返回值：** `void`

```javascript
// 放大 10%
viewer.zoom(0.1);

// 缩小 10%
viewer.zoom(-0.1);
```

### `rotate(degrees: number)`

按指定的角度旋转当前图片。

**参数：**
- `degrees`：旋转角度（正值为顺时针，负值为逆时针）

**返回值：** `void`

```javascript
// 顺时针旋转 90 度
viewer.rotate(90);

// 逆时针旋转 90 度
viewer.rotate(-90);
```

### `reset()`

将当前图片重置为原始状态（缩放、旋转、位置）。

**返回值：** `void`

```javascript
// 重置图片变换
viewer.reset();
```

### `showOriginalSize()`

以原始尺寸显示当前图片。

**返回值：** `void`

```javascript
// 显示原始尺寸
viewer.showOriginalSize();
```

## 视图控制方法

### `toggleFullscreen()`

切换全屏模式。

**返回值：** `void`

```javascript
// 切换全屏
viewer.toggleFullscreen();
```

### `toggleImageInfo()`

切换图片信息面板。

**返回值：** `void`

```javascript
// 切换图片信息
viewer.toggleImageInfo();
```

### `close()`

关闭查看器并清理资源。

**返回值：** `void`

```javascript
// 关闭查看器
viewer.close();
```

## 工具方法

### `downloadImage()`

下载当前图片。

**返回值：** `void`

```javascript
// 下载当前图片
viewer.downloadImage();
```
## 使用示例

### 基本导航

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg']
});

// 导航
document.getElementById('next-btn').addEventListener('click', () => {
  viewer.next();
});

document.getElementById('prev-btn').addEventListener('click', () => {
  viewer.prev();
});

document.getElementById('go-to-2').addEventListener('click', () => {
  viewer.loadCurrentImage(2);
});
```

### 变换控制

```javascript
const viewer = new ImagesViewer({
  images: ['image.jpg']
});

// 变换控制
document.getElementById('zoom-in').addEventListener('click', () => {
  viewer.zoom(0.1);
});

document.getElementById('zoom-out').addEventListener('click', () => {
  viewer.zoom(-0.1);
});

document.getElementById('rotate-left').addEventListener('click', () => {
  viewer.rotate(-90);
});

document.getElementById('rotate-right').addEventListener('click', () => {
  viewer.rotate(90);
});

document.getElementById('reset').addEventListener('click', () => {
  viewer.reset();
});
```

### 编程控制

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  show: function() {
    // 自动浏览图片
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % 3;
      viewer.loadCurrentImage(currentIndex);
    }, 3000);

    // 查看器关闭时清除定时器
    setTimeout(() => {
      clearInterval(interval);
      viewer.close();
    }, 15000);
  }
});
```
