---
title: 事件
---

# 事件

本页面记录了 ImagesViewer 中所有可用的事件。

## 事件回调

ImagesViewer 提供了在查看器生命周期特定点触发的回调函数。

### `show`

**类型：** `(container: HTMLElement) => void`

当查看器显示时触发。

**参数：**
- `container`：查看器主容器元素

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  show: function(container) {
    console.log('查看器显示:', container);
    
    // 添加自定义元素
    const customElement = document.createElement('div');
    customElement.textContent = '欢迎！';
    customElement.style.cssText = 'color: white; position: absolute; top: 10px; left: 50%; transform: translateX(-50%);';
    container.appendChild(customElement);
  }
});
```

### `close`

**类型：** `() => void`

当查看器关闭时触发。

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  close: function() {
    console.log('查看器关闭');
    
    // 清理资源
    cleanupResources();
  }
});
```

### `change`

**类型：** `(currentIndex: number, direction: 'prev' | 'next') => void`

当当前图片改变时触发。

**参数：**
- `currentIndex`：新显示图片的索引
- `direction`：导航方向（`'prev'` 或 `'next'`）

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  change: function(currentIndex, direction) {
    console.log('图片改变为:', currentIndex);
    console.log('方向:', direction);
    
    // 跟踪图片查看
    analytics.track('image_view', {
      imageIndex: currentIndex,
      direction: direction
    });
  }
});
```

## 事件流程

使用 ImagesViewer 时的典型事件流程：

1. **查看器初始化** - `new ImagesViewer()`
2. **查看器显示** - `show` 回调触发
3. **图片改变** - `change` 回调触发（多次）
4. **查看器关闭** - `close` 回调触发

## 使用示例

### 跟踪用户交互

```javascript
const viewer = new ImagesViewer({
  images: productImages,
  show: function() {
    console.log('产品图库打开');
    analytics.track('gallery_opened');
  },
  close: function() {
    console.log('产品图库关闭');
    analytics.track('gallery_closed');
  },
  change: function(index, direction) {
    console.log(`查看产品 ${index + 1}`);
    analytics.track('product_view', {
      productId: productIds[index],
      position: index + 1,
      total: productImages.length,
      direction: direction
    });
  }
});
```

### 自定义 UI 元素

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  show: function(container) {
    // 添加自定义头部
    const header = document.createElement('div');
    header.style.cssText = `
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      color: white;
      font-size: 18px;
      font-weight: bold;
      z-index: 1000;
    `;
    header.textContent = '图片图库';
    container.appendChild(header);
    
    // 添加自定义底部
    const footer = document.createElement('div');
    footer.style.cssText = `
      position: absolute;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      color: white;
      font-size: 14px;
      z-index: 1000;
    `;
    footer.textContent = '点击图片进行缩放';
    container.appendChild(footer);
  }
});
```

### 动态内容

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  change: function(index) {
    // 根据当前图片更新自定义内容
    updateImageInfo(index);
  }
});

function updateImageInfo(index) {
  const imageInfo = imageDetails[index];
  // 更新 UI 显示图片特定信息
  console.log('更新信息为:', imageInfo.title);
}
```

## 最佳实践

### 事件处理器清理

在回调中添加事件监听器时，确保清理它们以避免内存泄漏：

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  show: function(container) {
    const customButton = document.createElement('button');
    customButton.textContent = '自定义操作';
    customButton.style.cssText = 'position: absolute; top: 20px; right: 20px; z-index: 1000;';
    
    const handleClick = () => {
      console.log('自定义按钮点击');
    };
    
    customButton.addEventListener('click', handleClick);
    container.appendChild(customButton);
    
    // 存储引用以便清理
    container._customButton = customButton;
    container._handleClick = handleClick;
  },
  close: function() {
    // 清理事件监听器
    if (viewer.container && viewer.container._customButton) {
      viewer.container._customButton.removeEventListener('click', viewer.container._handleClick);
    }
  }
});
```

### 异步操作

您可以在事件回调中执行异步操作：

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  show: async function() {
    try {
      // 加载额外数据
      const data = await fetchImageData();
      console.log('图片数据加载:', data);
    } catch (error) {
      console.error('加载数据错误:', error);
    }
  },
  change: async function(index) {
    // 加载图片元数据
    const metadata = await loadImageMetadata(index);
    console.log('图片', index, '的元数据:', metadata);
  }
});
```
