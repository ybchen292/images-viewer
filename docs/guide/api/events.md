---
title: 事件
---

# 事件

ImagesViewer 的事件回调系统。

## 事件回调

### `onShow`

**类型：** `(container: HTMLElement) => void`

查看器显示时触发。

**参数：**
- `container`：查看器主容器元素

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onShow: function(container) {
    console.log('查看器显示:', container);
    
    // 添加自定义元素
    const customElement = document.createElement('div');
    customElement.textContent = '欢迎！';
    customElement.style.cssText = 'color: white; position: absolute; top: 10px; left: 50%; transform: translateX(-50%);';
    container.appendChild(customElement);
  }
});
```

### `onClose`

**类型：** `() => void`

查看器关闭时触发。

### `onChange`

**类型：** `(data: ChangeEventData) => void`

图片切换时触发。

**参数：**
- `data`：新显示图片的索引
- `index`：新显示图片的索引
- `oldIndex`：旧显示图片的索引
- `direction`：导航方向（`'prev'` 或 `'next'`） 
- `img`：新显示图片的元素引用
- `dom`：查看器主容器元素引用

### `onRotate`

**类型：** `(data: RotateEventData) => void`

图片旋转时触发。

### `onDrag`

**类型：** `(data: DragEventData) => void`

图片拖动时触发。

### `onZoom`

**类型：** `(data: ZoomEventData) => void`

图片缩放时触发。

## 事件流程

1. **查看器初始化** - `new ImagesViewer()`
2. **查看器显示** - `onShow` 触发
3. **图片操作** - `onChange`、`onRotate`、`onDrag`、`onZoom` 触发
4. **查看器关闭** - `onClose` 触发

## 使用示例

### 跟踪用户交互

```javascript
const viewer = new ImagesViewer({
  images: productImages,
  onShow: function() {
    console.log('产品图库打开');
    analytics.track('gallery_opened');
  },
  onClose: function() {
    console.log('产品图库关闭');
    analytics.track('gallery_closed');
  },
  onChange: function(data) {
    console.log(`查看产品 ${data.index + 1}`);
    analytics.track('product_view', {
      productId: productIds[data.index],
      position: data.index + 1,
      total: productImages.length,
      direction: data.direction
    });
  }
});
```

### 异步操作

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  onShow: async function() {
    try {
      // 加载额外数据
      const data = await fetchImageData();
      console.log('图片数据加载:', data);
    } catch (error) {
      console.error('加载数据错误:', error);
    }
  }
});
```

## 最佳实践

- **事件处理器清理**：在回调中添加的事件监听器应在 `onClose` 中清理，避免内存泄漏
- **异步操作**：事件回调支持异步操作，可用于加载额外数据
- **性能优化**：避免在事件回调中执行重计算，保持响应速度
