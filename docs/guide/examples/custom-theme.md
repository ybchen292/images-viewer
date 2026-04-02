---
title: 自定义主题
---

# 自定义主题

本示例展示了如何使用自定义主题来定制 ImagesViewer 的外观。

## 基本主题定制

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
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
    buttonFontSize: '20px',
    
    // 文本
    textColor: 'rgba(255, 255, 255, 0.9)',
    activeColor: 'rgba(100, 150, 255, 0.8)'
  }
});
```

## 完整主题示例

```html
<!DOCTYPE html>
<html>
  <head>
    <title>ImagesViewer 自定义主题示例</title>
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
      .theme-option {
        margin: 15px 0;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      .theme-option h3 {
        margin-top: 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>ImagesViewer 自定义主题示例</h1>
      
      <div class="theme-option">
        <h3>深色主题</h3>
        <button class="button" onclick="openDarkTheme()">打开深色主题</button>
      </div>
      
      <div class="theme-option">
        <h3>浅色主题</h3>
        <button class="button" onclick="openLightTheme()">打开浅色主题</button>
      </div>
      
      <div class="theme-option">
        <h3>彩色主题</h3>
        <button class="button" onclick="openColorfulTheme()">打开彩色主题</button>
      </div>
      
      <div class="theme-option">
        <h3>极简主题</h3>
        <button class="button" onclick="openMinimalTheme()">打开极简主题</button>
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

      function openDarkTheme() {
        new ImagesViewer({
          images: images,
          theme: {
            viewerBgColor: 'rgba(0, 0, 0, 0.95)',
            toolbarBgColor: 'rgba(30, 30, 30, 0.9)',
            buttonBgColor: 'rgba(50, 50, 50, 0.8)',
            buttonHoverBg: 'rgba(80, 80, 80, 0.8)',
            textColor: 'rgba(255, 255, 255, 0.9)',
            activeColor: 'rgba(100, 150, 255, 0.8)',
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        });
      }

      function openLightTheme() {
        new ImagesViewer({
          images: images,
          theme: {
            viewerBgColor: 'rgba(255, 255, 255, 0.95)',
            toolbarBgColor: 'rgba(240, 240, 240, 0.9)',
            buttonBgColor: 'rgba(220, 220, 220, 0.8)',
            buttonHoverBg: 'rgba(200, 200, 200, 0.8)',
            textColor: 'rgba(0, 0, 0, 0.9)',
            activeColor: 'rgba(0, 100, 255, 0.8)',
            shadowColor: 'rgba(0, 0, 0, 0.1)'
          }
        });
      }

      function openColorfulTheme() {
        new ImagesViewer({
          images: images,
          theme: {
            viewerBgColor: 'rgba(10, 20, 30, 0.95)',
            toolbarBgColor: 'rgba(20, 30, 40, 0.9)',
            buttonBgColor: 'rgba(40, 60, 80, 0.8)',
            buttonHoverBg: 'rgba(60, 80, 100, 0.8)',
            textColor: 'rgba(255, 255, 255, 0.9)',
            activeColor: 'rgba(255, 100, 150, 0.8)',
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        });
      }

      function openMinimalTheme() {
        new ImagesViewer({
          images: images,
          theme: {
            viewerBgColor: 'rgba(0, 0, 0, 0.95)',
            toolbarBgColor: 'rgba(0, 0, 0, 0.7)',
            buttonBgColor: 'transparent',
            buttonHoverBg: 'rgba(255, 255, 255, 0.1)',
            buttonSize: '36px',
            buttonFontSize: '18px',
            textColor: 'rgba(255, 255, 255, 0.9)',
            activeColor: 'rgba(255, 255, 255, 0.9)',
            shadowColor: 'rgba(0, 0, 0, 0.2)'
          }
        });
      }
    </script>
  </body>
</html>
```

## 缩略图定制

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  buttons: {
    thumbnails: true
  },
  theme: {
    // 缩略图设置
    thumbItemWidth: '100px',
    thumbItemHeight: '60px',
    thumbGap: '15px',
    thumbPadding: '20px',
    thumbMaxWidth: '50%',
    
    // 其他主题设置
    viewerBgColor: 'rgba(0, 0, 0, 0.9)',
    toolbarBgColor: 'rgba(30, 30, 30, 0.8)'
  }
});
```

## 高级主题定制

### 自定义按钮尺寸

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  theme: {
    // 工具栏按钮
    buttonSize: '45px',
    buttonFontSize: '20px',
    
    // 导航按钮
    navButtonSize: '60px',
    navButtonFontSize: '24px',
    
    // 顶部关闭按钮
    topCloseBtnSize: '55px',
    topCloseBtnFontSize: '28px'
  }
});
```

### 自定义定位

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  theme: {
    // 工具栏位置
    toolbarBottom: '30px',
    
    // 信息面板位置
    infoTop: '80px',
    infoLeft: '30px',
    
    // 缩放指示器位置
    zoomIndicatorTop: '30px',
    zoomIndicatorLeft: '30px',
    
    // 顶部关闭按钮位置
    topCloseBtnTop: '30px',
    topCloseBtnRight: '30px'
  }
});
```

## CSS 定制

您还可以使用自定义 CSS 进一步定制外观：

```css
/* ImagesViewer 的自定义 CSS */
.images-viewer-container {
  /* 自定义容器样式 */
}

.images-viewer-toolbar {
  /* 自定义工具栏样式 */
}

.images-viewer-tool-btn {
  /* 自定义按钮样式 */
}

.images-viewer-thumb-item {
  /* 自定义缩略图样式 */
  transition: all 0.3s ease;
}

.images-viewer-thumb-item:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(100, 150, 255, 0.5);
}

.images-viewer-thumb-item.active {
  border: 2px solid #6496ff;
}
```

## 响应式主题

您可以创建适应不同屏幕尺寸的响应式主题：

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  theme: {
    // 基础样式
    buttonSize: '40px',
    navButtonSize: '50px',
    thumbItemWidth: '70px',
    thumbItemHeight: '45px',
    
    // 查看器会根据响应式行为调整这些值
  }
});
```

## 最佳实践

### 主题一致性

- 保持主题与整体网站设计一致
- 使用与内容互补的颜色
- 确保文本在背景上可读

### 性能考虑

- 避免过于复杂的动画
- 使用具有适当 alpha 值的 rgba 颜色
- 在不同设备上测试您的主题

### 可访问性

- 确保文本和背景之间有足够的对比度
- 确保交互元素易于识别
- 尽可能使用屏幕阅读器测试
