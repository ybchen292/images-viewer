# ImagesViewer 图片查看器

一个功能丰富、响应式的图片查看器，支持缩放、旋转、导航等操作。使用原生 javasciprt 写。不局限于框架使用。

[English](./README.en.md) | [Gitee 地址](https://gitee.com/ybchen292/images-viewer) | [GitHub 地址](https://github.com/ybchen292/images-viewer)

#### [预览地址](https://ybchen292.github.io/images-viewer/)

## 特性

- 🖼️ **多图片支持** - 支持单张或多张图片查看
- 🔍 **缩放操作** - 鼠标滚轮、按钮、双击缩放
- 🔄 **旋转功能** - 左右旋转图片
- 📱 **触摸支持** - 移动端手势操作
- 🎨 **主题定制** - 可自定义颜色、样式、按钮
- ⌨️ **键盘快捷键** - 丰富的键盘操作支持
- 📱 **响应式设计** - 适配桌面和移动设备
- 🔄 **缩略图导航** - 快速切换图片
- 💾 **下载功能** - 支持图片下载
- 🖥️ **全屏模式** - 全屏查看图片
- 🌍 **国际化支持** - 可自定义界面语言
- 📦 **缓存管理** - 智能图片缓存，减少重复请求
- ⚡ **性能优化** - 懒加载和预加载策略
- 🏷️ **图片对象支持** - 支持对象格式的图片配置，包含 url、title、thumbnail 等属性
- 🔢 **初始索引** - 可指定初始显示的图片索引
- 📞 **事件监听** - 支持旋转、拖动、缩放等事件的监听
- 🎨 **自定义显示** - 可自定义信息栏、页数、缩放指数的显示内容

## 安装和使用

### 基本用法

```javascript
// 单张图片
const viewer1 = new ImagesViewer('single-image.jpg');

// 多张图片
const viewer2 = new ImagesViewer({
  images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
});

// 数组形式
const viewer3 = new ImagesViewer(['img1.jpg', 'img2.jpg']);

// 图片对象格式
const viewer4 = new ImagesViewer({
  images: [
    {
      url: 'https://example.com/image1.jpg',
      title: '风景图片',
      // title: (currentImage, index) => {
      //          return `图片${index + 1}`;
      // },
      thumbnail: 'https://example.com/thumb1.jpg',
    },
    {
      url: 'https://example.com/image2.jpg',
      title: '建筑图片',
      thumbnail: 'https://example.com/thumb2.jpg',
    }
  ]
});

```
### images中`url` `title` `thumbnail` 支持函数格式((currentImage,Index) => string)

### npm

```html
<!-- 引入包 -->
npm install images-viewer-js

<!-- vue 环境 -->
<script>
  import ImagesViewer from 'images-viewer-js';
  // 使用
  const viewer = new ImagesViewer({
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  });
</script>
```

### 浏览器环境

```html
<!-- 引入脚本 -->
<script src="images-viewer.js"></script>

<script>
  // 使用全局变量 ImagesViewer
  const viewer = new ImagesViewer({
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  });
</script>
```

### CommonJS/Node.js

```javascript
const ImagesViewer = require('./images-viewer-js');

const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
});
```

### AMD

```javascript
define(['images-viewer-js'], function (ImagesViewer) {
  const viewer = new ImagesViewer({
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  });
});
```

## 配置选项

### 基本配置

```javascript
const viewer = new ImagesViewer({
  // 图片数组（必需）
  images: ['image1.jpg', 'image2.jpg'],

  // 点击遮罩关闭
  closeOnMaskClick: false,

  // 缩放范围
  minScale: 0.1,
  maxScale: 5,

  // 循环浏览
  loop: true,

  // 预加载数量
  preloadCount: 3,

  // 最大缓存数量
  maxCacheSize: 30,

  // 按钮配置
  buttons: {
    zoomIn: true, // 放大
    zoomOut: true, // 缩小
    rotateLeft: true, // 左旋转
    rotateRight: true, // 右旋转
    reset: true, // 重置
    download: true, // 下载
    fullscreen: true, // 全屏
    prev: true, // 上一张
    next: true, // 下一张
    close: true, // 关闭
    topClose: true, // 右上角关闭
    thumbnails: true, // 缩略图
    info: true, // 信息面板
    originalSize: true, // 原始尺寸
  },

   // 自定义按钮
  customButtons: [
    ['🔍', function() { console.log('自定义按钮点击'); }]
  ],

  // 初始图片索引
  initialIndex: 0,

  // 事件回调
  onShow: function(container) {
    console.log('查看器显示');
  },

  onClose: function() {
    console.log('查看器关闭');
  },

  onChange: function(currentIndex, direction) {
    console.log('图片切换:', currentIndex, direction);
  },

  // 旋转事件
  onRotate: function(data) {
    console.log('图片旋转:', data);
  },

  // 拖动事件
  onDrag: function(data) {
    console.log('图片拖动:', data);
  },

  // 缩放事件
  onZoom: function(data) {
    console.log('图片缩放:', data);
  },

  // 信息栏自定义函数
  onInfo: function(data) {
    return `
      <div class="custom-info">
        <p>图片 ${data.index + 1} / ${data.totalPages}</p>
        <p>缩放: ${(data.scale * 100).toFixed(0)}%</p>
        <p>旋转: ${data.rotation}°</p>
      </div>
    `;
  },

  // 页数显示自定义函数
  onCounter: function(data) {
    return `第 ${data.currentPage} 张 / 共 ${data.totalPages} 张`;
  },

  // 缩放指数自定义函数
  onZoomIndicator: function(data) {
    return `缩放: ${data.percentage}%`;
  },

  // 图片信息显示
  imageInfo: {
    visible: false, // 默认显示信息
    showName: true, // 显示文件名
    showDimensions: true, // 显示尺寸
  },

  // 国际化配置
  i18n: {
    // 信息栏文本
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
      close: '关闭:',
    },
    // 按钮文本
    buttons: {
      prev: '上一张 (←)',
      next: '下一张 (→)',
      close: '关闭 (Esc)',
      loading: '加载中...',
    },
  },

  // 主题配置
  theme: {
    // 背景相关
    viewerBgColor: 'rgba(0, 0, 0, 0.4)',

    // 工具栏相关
    toolbarBgColor: 'rgba(150, 150, 150, 0.7)',
    toolbarBorderRadius: '30px',
    toolbarPadding: '8px 12px',
    toolbarBottom: '20px',

    // 按钮相关（半透明中灰）
    buttonBgColor: 'rgba(150, 150, 150, 0.7)',
    buttonHoverBg: 'rgba(200, 200, 200, 0.4)',
    buttonSize: '40px',
    buttonFontSize: '20px',
    buttonBorderRadius: '50%',

    // 导航按钮相关（半透明中灰）
    navButtonBgColor: 'rgba(150, 150, 150, 0.7)',
    navButtonHoverBg: 'rgba(200, 200, 200, 0.4)',
    navButtonSize: '50px',
    navButtonFontSize: '20px',
    navButtonBorderRadius: '50%',

    // 右上角关闭按钮
    topCloseBtnSize: '50px',
    topCloseBtnTop: '20px',
    topCloseBtnRight: '20px',
    topCloseBtnFontSize: '24px',
    topCloseBtnBgColor: 'rgba(150, 150, 150, 0.7)',
    topCloseBtnHoverBg: 'rgba(200, 200, 200, 0.4)',

    // 信息栏相关（半透明浅灰）
    infoBgColor: 'rgba(150, 150, 150, 0.7)',
    infoBorderRadius: '12px',
    infoPadding: '10px 15px',
    infoFontSize: '13px',
    infoTop: '70px',
    infoLeft: '20px',

    // 缩放指示器
    zoomIndicatorBg: 'rgba(150, 150, 150, 0.7)',
    zoomIndicatorBorderRadius: '18px',
    zoomIndicatorPadding: '6px 12px',
    zoomIndicatorFontSize: '14px',
    zoomIndicatorTop: '20px',
    zoomIndicatorLeft: '20px',

    // 通用
    activeColor: 'rgba(100, 150, 255, 0.8)',
    textColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    transitionSpeed: '0.3s',

    // 缩略图
    thumbItemWidth: '70px',
    thumbItemHeight: '45px',
    thumbGap: '10px',
    thumbPadding: '15px',
    thumbMaxWidth: '70%',
  },
});
```

## 方法

### 图片导航

```javascript
// 下一张图片
viewer.next();

// 上一张图片
viewer.prev();

// 跳转到指定索引
viewer.loadCurrentImage(2);
```

### 变换操作

```javascript
// 缩放
viewer.zoom(0.1); // 放大10%
viewer.zoom(-0.1); // 缩小10%

// 旋转
viewer.rotate(90); // 顺时针旋转90度
viewer.rotate(-90); // 逆时针旋转90度

// 重置变换
viewer.reset();

// 显示原始尺寸
viewer.showOriginalSize();
```

### 视图控制

```javascript
// 切换全屏
viewer.toggleFullscreen();

// 显示/隐藏图片信息
viewer.toggleImageInfo();

// 关闭查看器
viewer.close();
```

### 下载

```javascript
// 下载当前图片
viewer.downloadImage();
```

## 键盘快捷键

| 快捷键  | 功能              |
| ------- | ----------------- |
| `ESC`   | 关闭查看器        |
| `←`     | 上一张图片        |
| `→`     | 下一张图片        |
| `↑` `+` | 放大图片          |
| `↓` `-` | 缩小图片          |
| `0`     | 重置变换          |
| `F`     | 切换全屏          |
| `I`     | 显示/隐藏信息面板 |

## 鼠标/触摸操作

### 鼠标操作

- **拖动**: 按住鼠标左键拖动图片
- **缩放**: 鼠标滚轮
- **双击**: 切换缩放状态

### 触摸操作

- **单指拖动**: 移动图片
- **双指捏合**: 缩放图片
- **双击**: 切换缩放状态

## 响应式设计

查看器会自动适配不同屏幕尺寸：

- **桌面端**: 完整的工具栏和功能
- **平板端**: 适当缩小的按钮和间距
- **手机端**: 紧凑的布局，优化触摸体验

## 示例

### 基本示例

```html
<!DOCTYPE html>
<html>
  <head>
    <title>ImagesViewer 示例</title>
  </head>
  <body>
    <button onclick="openViewer()">查看图片</button>

    <script src="images-viewer.js"></script>
    <script>
      function openViewer() {
        const viewer = new ImagesViewer({
          images: [
            'https://example.com/image1.jpg',
            'https://example.com/image2.jpg',
            'https://example.com/image3.jpg',
          ],
          closeOnMaskClick: true,
          imageInfo: {
            visible: true,
          },
        });
      }
    </script>
  </body>
</html>
```

### 高级定制示例

```javascript
const viewer = new ImagesViewer({
  images: imageArray,
  buttons: {
    download: false, // 禁用下载
  },
  imageInfo: {
    visible: true,
  },
  theme: {
    viewerBgColor: 'rgba(0, 0, 0, 0.6)',
    toolbarBgColor: 'rgba(30, 30, 30, 0.8)',
  },
  // 自定义按钮
  customButtons: [
    [
      '🔍',
      () => {
        console.log('🔍');
        viewer.loadCurrentImage(1);
      },
    ],
  ],
  onChange: (index, direction) => {
    // direction: 'prev' | 'next'
    console.log(index, direction);
  },
  onShow: dom => {
    // 自定义按钮
    const toolbar = dom.querySelector('.images-viewer-toolbar');
    const button = document.createElement('button');
    button.className = 'images-viewer-tool-btn';

    const iconSpan = document.createElement('span');
    iconSpan.textContent = 'test';
    button.appendChild(iconSpan);

    button.addEventListener('click', e => {
      console.log('test');
      // e.stopPropagation();
    });
    toolbar.appendChild(button);
    console.log('onShow', dom);
  },
  onClose: () => {
    console.log('close');
  },
});
```

### 国际化配置示例

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  i18n: {
    info: {
      name: 'Name:',
      dimensions: 'Size:',
      shortcuts: 'Shortcuts',
      zoomIn: 'Zoom In:',
      zoomOut: 'Zoom Out:',
      prev: 'Previous:',
      next: 'Next:',
      reset: 'Reset:',
      fullscreen: 'Fullscreen:',
      info: 'Info:',
      close: 'Close:',
    },
    buttons: {
      prev: 'Previous (←)',
      next: 'Next (→)',
      close: 'Close (Esc)',
      loading: 'Loading...',
    },
  },
});
```

### 缩略图配置示例

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  theme: {
    thumbItemWidth: '100px',
    thumbItemHeight: '60px',
    thumbGap: '15px',
    thumbPadding: '20px',
    thumbMaxWidth: '80%',
  },
});
```

### 缓存管理示例

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  maxCacheSize: 20, // 最大缓存20张图片
  preloadCount: 5, // 预加载5张相邻图片
});
```

## 许可证

MIT License
