---
title: 方法
---

# 方法

ImagesViewer 类的方法列表。

## 导航方法

### `next()`

加载下一张图片。

**返回值：** `void`

```javascript
// 前往下一张图片
viewer.next();
```

### `prev()`

加载上一张图片。

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

按指定增量缩放当前图片。

**参数：**
- `delta`：缩放变化量（正值放大，负值缩小）

**返回值：** `void`

```javascript
// 放大 10%
viewer.zoom(0.1);

// 缩小 10%
viewer.zoom(-0.1);
```

### `rotate(degrees: number)`

按指定角度旋转当前图片。

**参数：**
- `degrees`：旋转角度（正值顺时针，负值逆时针）

**返回值：** `void`

```javascript
// 顺时针旋转 90 度
viewer.rotate(90);

// 逆时针旋转 90 度
viewer.rotate(-90);
```

### `reset()`

重置当前图片状态（缩放、旋转、位置）。

**返回值：** `void`

### `showOriginalSize()`

以原始尺寸显示当前图片。

**返回值：** `void`

## 视图控制方法

### `toggleFullscreen()`

切换全屏模式。

**返回值：** `void`

### `toggleImageInfo()`

切换图片信息面板。

**返回值：** `void`

### `close()`

关闭查看器并清理资源。

**返回值：** `void`

## 工具方法

### `downloadImage()`

下载当前图片。

**返回值：** `void`

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
