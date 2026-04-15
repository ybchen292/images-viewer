---
title: 配置
---

# 配置

ImagesViewer 的详细配置选项。

## 基本配置

### `images`

**类型：** `string | string[] | ImageObject[]`
**必填：** 是

要显示的图片，支持单张 URL、URL 数组或图片对象数组。

```javascript
// 单张图片
const viewer = new ImagesViewer('image.jpg');

// 多张图片（URL 数组）
const viewer = new ImagesViewer(['image1.jpg', 'image2.jpg']);

// 多张图片（对象数组）
const viewer = new ImagesViewer({
  images: [
    {
      url: 'https://example.com/image1.jpg',
      title: '风景图片',
      thumbnail: 'https://example.com/thumb1.jpg'
    },
    {
      url: 'https://example.com/image2.jpg',
      title: '建筑图片',
      thumbnail: 'https://example.com/thumb2.jpg'
    }
  ]
});
```

**图片对象属性说明：**
- `url`：图片 URL（必填）
- `title`：图片标题（可选）
- `thumbnail`：缩略图 URL（可选）
- 其他自定义属性：可添加任意自定义属性，在事件回调中访问

### `props`

**类型：** `object`
**默认值：** `{ url: 'url', title: 'title', thumbnail: 'thumbnail' }`

自定义图片对象属性映射，支持字符串和函数形式。

**属性说明：**
- `url`：图片 URL 的属性名或获取函数
- `title`：图片标题的属性名或获取函数
- `thumbnail`：缩略图 URL 的属性名或获取函数

**使用示例：**

```javascript
// 自定义属性映射（字符串形式）
const viewer = new ImagesViewer({
  images: [
    {
      url2: 'https://example.com/image1.jpg',
      title2: '风景图片',
      thumbnail2: 'https://example.com/thumb1.jpg'
    },
    {
      url2: 'https://example.com/image2.jpg',
      title2: '建筑图片',
      thumbnail2: 'https://example.com/thumb2.jpg'
    }
  ],
  props: {
    url: 'url2',
    title: 'title2',
    thumbnail: 'thumbnail2'
  }
});

// 自定义属性映射（函数形式）
const viewer = new ImagesViewer({
  images: [
    { id: 1, path: 'photos/1.jpg', alt: '风景' },
    { id: 2, path: 'photos/2.jpg', alt: '人物' }
  ],
  props: {
    url: (item, index) => `https://example.com/${item.path}`,
    title: (item, index) => `${item.alt} (ID: ${item.id})`,
    thumbnail: (item, index) => `https://example.com/thumbnails/${item.id}.jpg`
  }
});
```

### `retryOnError`

**类型：** `boolean`
**默认值：** `false`

是否在图片或缩略图加载失败后重新请求。

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  retryOnError: true // 加载失败后重新请求
});
```

### `onImageError`

**类型：** `(data: ErrorCallbackParams) => void`

图片加载失败时的自定义函数

**回调参数：**
- `data`：当前图片对象
- `index`：当前图片索引
- `url`：加载失败的图片 URL
- `img`：对应的图片 DOM 元素

**使用示例：**

```javascript
const viewer = new ImagesViewer({
  images: [
    { url: 'https://example.com/image1.jpg', title: '图片1' },
    { url: 'https://example.com/image2.jpg', title: '图片2' }
  ],
  onImageError: (data) => {
    // 自定义 DOM 操作
    data.img.alt = '图片加载失败';
  }
});
```

### `onThumbnailError`

**类型：** `(data: ErrorCallbackParams) => void`

缩略图加载失败时的自定义函数

**回调参数：**
- `data`：当前图片对象
- `index`：当前图片索引
- `url`：加载失败的缩略图 URL
- `img`：对应的缩略图 DOM 元素

**使用示例：**

```javascript
const viewer = new ImagesViewer({
  images: [
    { url: 'https://example.com/image1.jpg', title: '图片1' },
    { url: 'https://example.com/image2.jpg', title: '图片2' }
  ],
  onThumbnailError: (data) => {
    // 自定义 DOM 操作
    data.img.alt = '缩略图加载失败';
  }
});
```

### `initialIndex`

**类型：** `number`
**默认值：** `0`

初始显示的图片索引。

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  initialIndex: 1 // 从第二张图片开始显示
});
```

### `closeOnMaskClick`

**类型：** `boolean`
**默认值：** `false`

点击背景遮罩时是否关闭查看器。

### `loop`

**类型：** `boolean`
**默认值：** `true`

是否循环浏览图片。

### `preloadCount`

**类型：** `number`
**默认值：** `3`

预加载的相邻图片数量。

### `maxCacheSize`

**类型：** `number`
**默认值：** `30`

缓存中保留的最大图片数量。

### `minScale`

**类型：** `number`
**默认值：** `0.1`

最小缩放比例（10%）。

### `maxScale`

**类型：** `number`
**默认值：** `5`

最大缩放比例（500%）。

## 按钮配置

### `buttons`

**类型：** `object`

工具栏按钮配置。

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  buttons: {
    zoomIn: true,         // 放大
    zoomOut: true,        // 缩小
    rotateLeft: true,     // 左旋转
    rotateRight: true,    // 右旋转
    reset: true,          // 重置
    download: true,       // 下载
    fullscreen: true,     // 全屏
    prev: true,           // 上一张
    next: true,           // 下一张
    close: true,          // 关闭
    topClose: true,       // 右上角关闭
    thumbnails: true,     // 缩略图
    info: true,           // 信息面板
    originalSize: true    // 原始尺寸
  }
});
```

## 自定义按钮

### `customButtons`

**类型：** `Array<[string, () => void]>`

添加到工具栏的自定义按钮数组。

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  customButtons: [
    ['🔍', () => console.log('搜索按钮点击')],
    ['📌', () => console.log('固定按钮点击')]
  ]
});
```

## 图片信息配置

### `imageInfo`

**类型：** `object`

图片信息显示配置。

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  imageInfo: {
    visible: false,      // 默认显示信息面板
    showName: true,      // 显示文件名
    showDimensions: true // 显示图片尺寸
  }
});
```

## 国际化

### `i18n`

**类型：** `object`

界面语言配置。

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
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
      close: '关闭 (Esc)',
      loading: '加载中...'
    }
  }
});
```

## 主题配置

### `theme`

**类型：** `object`

界面主题自定义选项。

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  theme: {
    // 背景
    viewerBgColor: 'rgba(0, 0, 0, 0.9)',

    // 工具栏
    toolbarBgColor: 'rgba(30, 30, 30, 0.8)',
    toolbarBorderRadius: '8px',
    toolbarPadding: '10px 15px',
    toolbarBottom: '20px',

    // 按钮
    buttonBgColor: 'rgba(50, 50, 50, 0.7)',
    buttonHoverBg: 'rgba(80, 80, 80, 0.7)',
    buttonSize: '45px',
    buttonFontSize: '20px',
    buttonBorderRadius: '50%',

    // 缩略图
    thumbItemWidth: '80px',
    thumbItemHeight: '50px',
    thumbGap: '10px',
    thumbPadding: '15px',
    thumbMaxWidth: '70%',

    // 通用
    activeColor: 'rgba(100, 150, 255, 0.8)',
    textColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    transitionSpeed: '0.3s'
  }
});
```

## 事件回调

### `onShow`

**类型：** `(container: HTMLDivElement) => void`

查看器显示时触发。

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onShow: function(container) {
    console.log('查看器显示:', container);
  }
});
```

### `onClose`

**类型：** `() => void`

查看器关闭时触发。

### `onChange`

**类型：** `(data: ChangeEventData) => void`

图片切换时触发。

**回调参数：**
- `index`：当前图片索引
- `oldIndex`：旧的图片索引
- `direction`：切换方向（'next' | 'prev'）
- `data`：当前图片数据
- `img`：当前图片 DOM 元素
- `dom`：查看器容器 DOM 元素

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  onChange: function(data) {
    console.log('切换到图片:', data.index);
    console.log('从图片:', data.oldIndex);
    console.log('切换方向:', data.direction);
  }
});
```

### `onRotate`

**类型：** `(data: RotateEventData) => void`

图片旋转时触发。

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onRotate: function(data) {
    console.log('图片旋转:', data.rotation);
  }
});
```

### `onDrag`

**类型：** `(data: DragEventData) => void`

图片拖动时触发。

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onDrag: function(data) {
    console.log('图片拖动:', data.translateX, data.translateY);
  }
});
```

### `onZoom`

**类型：** `(data: ZoomEventData) => void`

图片缩放时触发。

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onZoom: function(data) {
    console.log('图片缩放:', data.scale);
  }
});
```

## 自定义函数

### `onInfo`

**类型：** `(data: InfoTextParams) => string | null | undefined`

自定义信息栏内容。

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onInfo: function(data) {
    return `
      <div class="custom-info">
        <p>图片 ${data.index + 1} / ${data.totalPages}</p>
        <p>缩放: ${(data.scale * 100).toFixed(0)}%</p>
        <p>旋转: ${data.rotation}°</p>
      </div>
    `;
  }
});
```

### `onCounter`

**类型：** `(data: CounterParams) => string | null | undefined`

自定义页数显示。

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  onCounter: function(data) {
    return `第 ${data.currentPage} 张 / 共 ${data.totalPages} 张`;
  }
});
```

### `onZoomIndicator`

**类型：** `(data: ZoomIndicatorParams) => string | null | undefined`

自定义缩放指数显示。

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onZoomIndicator: function(data) {
    return `缩放: ${data.percentage}%`;
  }
});
```

## 完整配置示例

```javascript
const viewer = new ImagesViewer({
  // 基本设置
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  initialIndex: 0,
  closeOnMaskClick: true,
  loop: true,
  preloadCount: 3,
  maxCacheSize: 30,
  minScale: 0.1,
  maxScale: 5,
  retryOnError: false,

  // 属性映射
  props: {
    url: 'url',
    title: 'title',
    thumbnail: 'thumbnail'
  },

  // 按钮
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

  // 自定义按钮
  customButtons: [
    ['🔍', () => console.log('搜索')],
    ['📌', () => console.log('固定')]
  ],

  // 图片信息
  imageInfo: {
    visible: false,
    showName: true,
    showDimensions: true
  },

  // 国际化
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
      close: '关闭 (Esc)',
      loading: '加载中...'
    }
  },

  // 主题
  theme: {
    viewerBgColor: 'rgba(0, 0, 0, 0.9)',
    toolbarBgColor: 'rgba(30, 30, 30, 0.8)',
    buttonBgColor: 'rgba(50, 50, 50, 0.7)',
    textColor: 'rgba(255, 255, 255, 0.9)'
  },

  // 事件回调
  onShow: function(container) {
    console.log('查看器显示');
  },
  onClose: function() {
    console.log('查看器关闭');
  },
  onChange: function(data) {
    console.log('图片切换:', data.index, data.direction);
  },
  onRotate: function(data) {
    console.log('图片旋转:', data.rotation);
  },
  onDrag: function(data) {
    console.log('图片拖动:', data.translateX, data.translateY);
  },
  onZoom: function(data) {
    console.log('图片缩放:', data.scale);
  },
  onImageError: function(data) {
    console.log('图片加载失败:', data.url);
  },
  onThumbnailError: function(data) {
    console.log('缩略图加载失败:', data.url);
  },

  // 自定义函数
  onInfo: function(data) {
    return `
      <div class="custom-info">
        <p>图片 ${data.index + 1} / ${data.totalPages}</p>
        <p>缩放: ${(data.scale * 100).toFixed(0)}%</p>
        <p>旋转: ${data.rotation}°</p>
      </div>
    `;
  },
  onCounter: function(data) {
    return `第 ${data.currentPage} 张 / 共 ${data.totalPages} 张`;
  },
  onZoomIndicator: function(data) {
    return `缩放: ${data.percentage}%`;
  }
});
```
