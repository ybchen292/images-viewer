---
title: TypeScript 类型
---

# TypeScript 类型

ImagesViewer 提供完整的 TypeScript 类型定义。

## 基础类型

### ImageObject

图片对象类型，支持扩展属性。

```typescript
interface ImageObject {
  url: string;           // 图片 URL（必填）
  title?: string;        // 图片标题（可选）
  thumbnail?: string;    // 缩略图 URL（可选）
  [key: string]: any;    // 其他自定义属性
}
```

**使用示例：**

```typescript
const images: ImageObject[] = [
  {
    url: 'https://example.com/image1.jpg',
    title: '风景图片',
    thumbnail: 'https://example.com/thumb1.jpg',
    category: 'nature',
    tags: ['landscape', 'sunset']
  },
  {
    url: 'https://example.com/image2.jpg',
    title: '建筑图片',
    thumbnail: 'https://example.com/thumb2.jpg',
    category: 'architecture'
  }
];

const viewer = new ImagesViewer({
  images: images
});
```

## 事件类型

### RotateEventData

旋转事件参数。

```typescript
interface RotateEventData {
  data: string | ImageObject;  // 当前图片数据
  index: number;              // 当前图片索引
  rotation: number;           // 当前旋转角度
  oldRotation: number;        // 旧的旋转角度
}
```

**使用示例：**

```typescript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onRotate: (data: RotateEventData) => {
    console.log('旋转角度:', data.rotation);
    console.log('图片索引:', data.index);
    if (typeof data.data === 'object') {
      console.log('图片标题:', data.data.title);
    }
  }
});
```

### DragEventData

拖动事件参数。

```typescript
interface DragEventData {
  data: string | ImageObject;  // 当前图片数据
  index: number;              // 当前图片索引
  translateX: number;         // 当前 X 轴偏移量
  translateY: number;         // 当前 Y 轴偏移量
}
```

**使用示例：**

```typescript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onDrag: (data: DragEventData) => {
    console.log('拖动位置:', data.translateX, data.translateY);
  }
});
```

### ZoomEventData

缩放事件参数。

```typescript
interface ZoomEventData {
  data: string | ImageObject;  // 当前图片数据
  index: number;              // 当前图片索引
  scale: number;              // 当前缩放比例
  oldScale: number;           // 旧的缩放比例
}
```

**使用示例：**

```typescript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onZoom: (data: ZoomEventData) => {
    console.log('缩放比例:', data.scale);
    console.log('缩放变化:', data.scale - data.oldScale);
  }
});
```

### ChangeEventData

切换事件参数。

```typescript
interface ChangeEventData {
  index: number;              // 当前图片索引
  oldIndex: number;          // 旧的图片索引
  direction: 'next' | 'prev'; // 切换方向
  data: string | ImageObject; // 当前图片数据
  img: HTMLImageElement;      // 当前图片 DOM 元素
  dom: HTMLDivElement;        // 查看器容器 DOM 元素
}
```

**使用示例：**

```typescript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  onChange: (data: ChangeEventData) => {
    console.log('切换到图片:', data.index);
    console.log('从图片:', data.oldIndex);
    console.log('切换方向:', data.direction);
  }
});
```

### ErrorCallbackParams

错误回调参数。

```typescript
interface ErrorCallbackParams {
  data: string | ImageObject; // 当前图片数据
  index: number;               // 当前图片索引
  url: string;                  // 加载失败的图片 URL
  img: HTMLImageElement | null; // 对应的图片或缩略图 DOM 元素
}
```

**使用示例：**

```typescript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  onImageError: (data: ErrorCallbackParams) => {
    console.log('图片加载失败:', data.url);
    // 返回字符串更新 alt 属性
    return `图片加载失败: ${data.url}`;
  },
  onThumbnailError: (data: ErrorCallbackParams) => {
    console.log('缩略图加载失败:', data.url);
    // 自定义 DOM 操作
    if (data.img) {
      data.img.alt = '缩略图加载失败';
    }
  }
});
```

## 自定义函数类型

### InfoTextParams

信息栏自定义函数参数。

```typescript
interface InfoTextParams {
  data: string | ImageObject;  // 当前图片数据
  index: number;              // 当前图片索引
  metadata: {
    name: string;              // 文件名
    width: number;            // 图片宽度
    height: number;           // 图片高度
  };
  scale: number;              // 当前缩放比例
  rotation: number;           // 当前旋转角度
}
```

**使用示例：**

```typescript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onInfo: (data: InfoTextParams): string => {
    const title = typeof data.image === 'object' ? data.image.title : data.metadata.name;
    return `
      <div class="custom-info">
        <p>${title}</p>
        <p>${data.metadata.width} × ${data.metadata.height}</p>
        <p>缩放: ${(data.scale * 100).toFixed(0)}%</p>
      </div>
    `;
  }
});
```

### CounterParams

页数显示自定义函数参数。

```typescript
interface CounterParams {
  data: string | ImageObject;  // 当前图片数据
  index: number;              // 当前图片索引
  currentPage: number;         // 当前页码（从1开始）
  totalPages: number;         // 总页数
  scale: number;              // 当前缩放比例
  rotation: number;           // 当前旋转角度
}
```

**使用示例：**

```typescript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  onCounter: (data: CounterParams): string => {
    return `${data.currentPage} / ${data.totalPages}`;
  }
});
```

### ZoomIndicatorParams

缩放指数自定义函数参数。

```typescript
interface ZoomIndicatorParams {
  data: string | ImageObject;  // 当前图片数据
  index: number;              // 当前图片索引
  scale: number;              // 当前缩放比例
  percentage: number;          // 缩放百分比
  rotation: number;           // 当前旋转角度
}
```

**使用示例：**

```typescript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onZoomIndicator: (data: ZoomIndicatorParams): string => {
    return `缩放: ${data.percentage}%`;
  }
});
```

## 配置类型

### ImagesViewerOptions

查看器配置选项。

```typescript
interface ImagesViewerOptions {
  // 基本配置
  images?: string | string[] | ImageObject[];
  initialIndex?: number;
  closeOnMaskClick?: boolean;
  loop?: boolean;
  preloadCount?: number;
  maxCacheSize?: number;
  minScale?: number;
  maxScale?: number;

  // 是否在失败后重新请求
  retryOnError?: boolean;

  // 按钮配置
  buttons?: {
    zoomIn?: boolean;
    zoomOut?: boolean;
    rotateLeft?: boolean;
    rotateRight?: boolean;
    reset?: boolean;
    download?: boolean;
    fullscreen?: boolean;
    prev?: boolean;
    next?: boolean;
    close?: boolean;
    topClose?: boolean;
    thumbnails?: boolean;
    info?: boolean;
    originalSize?: boolean;
  };

  // 自定义按钮
  customButtons?: Array<[string, () => void]>;

  // 图片信息配置
  imageInfo?: {
    visible?: boolean;
    showName?: boolean;
    showDimensions?: boolean;
  };

  // 属性映射配置
  props?: {
    url?: string | ((item: any, index: number) => string);
    title?: string | ((item: any, index: number) => string);
    thumbnail?: string | ((item: any, index: number) => string);
  };

  // 错误回调
  onImageError?: (data: ErrorCallbackParams) => void;
  onThumbnailError?: (data: ErrorCallbackParams) => void;

  // 事件回调
  onShow?: (container: HTMLDivElement) => void;
  onClose?: () => void;
  onChange?: (data: ChangeEventData) => void;
  onRotate?: (data: RotateEventData) => void;
  onDrag?: (data: DragEventData) => void;
  onZoom?: (data: ZoomEventData) => void;

  // 自定义函数
  onInfo?: (data: InfoTextParams) => string | null | undefined;
  onCounter?: (data: CounterParams) => string | null | undefined;
  onZoomIndicator?: (data: ZoomIndicatorParams) => string | null | undefined;

  // 国际化配置
  i18n?: {
    info?: {
      name?: string;
      dimensions?: string;
      shortcuts?: string;
      zoomIn?: string;
      zoomOut?: string;
      prev?: string;
      next?: string;
      reset?: string;
      fullscreen?: string;
      info?: string;
      close?: string;
    };
    buttons?: {
      prev?: string;
      next?: string;
      close?: string;
      loading?: string;
    };
  };

  // 主题配置
  theme?: {
    viewerBgColor?: string;
    toolbarBgColor?: string;
    toolbarBorderRadius?: string;
    toolbarPadding?: string;
    toolbarBottom?: string;
    buttonBgColor?: string;
    buttonHoverBg?: string;
    buttonSize?: string;
    buttonFontSize?: string;
    buttonBorderRadius?: string;
    navButtonBgColor?: string;
    navButtonHoverBg?: string;
    navButtonSize?: string;
    navButtonFontSize?: string;
    navButtonBorderRadius?: string;
    topCloseBtnSize?: string;
    topCloseBtnTop?: string;
    topCloseBtnRight?: string;
    topCloseBtnFontSize?: string;
    topCloseBtnBgColor?: string;
    topCloseBtnHoverBg?: string;
    infoBgColor?: string;
    infoBorderRadius?: string;
    infoPadding?: string;
    infoFontSize?: string;
    infoTop?: string;
    infoLeft?: string;
    zoomIndicatorBg?: string;
    zoomIndicatorBorderRadius?: string;
    zoomIndicatorPadding?: string;
    zoomIndicatorFontSize?: string;
    zoomIndicatorTop?: string;
    zoomIndicatorLeft?: string;
    thumbItemWidth?: string;
    thumbItemHeight?: string;
    thumbGap?: string;
    thumbPadding?: string;
    thumbMaxWidth?: string;
    activeColor?: string;
    textColor?: string;
    shadowColor?: string;
    transitionSpeed?: string;
  };
}
```

## 完整示例

```typescript
import { ImagesViewer, ImageObject, ImagesViewerOptions } from './index';

// 定义图片对象数组
const images: ImageObject[] = [
  {
    url: 'https://example.com/image1.jpg',
    title: '风景图片',
    thumbnail: 'https://example.com/thumb1.jpg',
    category: 'nature'
  },
  {
    url: 'https://example.com/image2.jpg',
    title: '建筑图片',
    thumbnail: 'https://example.com/thumb2.jpg',
    category: 'architecture'
  }
];

// 定义配置选项
const options: ImagesViewerOptions = {
  images: images,
  initialIndex: 0,
  closeOnMaskClick: true,
  loop: true,
  preloadCount: 3,
  maxCacheSize: 30,
  minScale: 0.1,
  maxScale: 5,
  retryOnError: false,

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

  props: {
    url: 'url',
    title: 'title',
    thumbnail: 'thumbnail'
  },

  onShow: (container: HTMLDivElement) => {
    console.log('查看器显示');
  },

  onClose: () => {
    console.log('查看器关闭');
  },

  onChange: (data) => {
    console.log('图片切换:', data.index, data.direction);
  },

  onRotate: (data) => {
    console.log('图片旋转:', data.rotation);
  },

  onDrag: (data) => {
    console.log('图片拖动:', data.translateX, data.translateY);
  },

  onZoom: (data) => {
    console.log('图片缩放:', data.scale);
  },

  onImageError: (data) => {
    console.log('图片加载失败:', data.url);
  },

  onThumbnailError: (data) => {
    console.log('缩略图加载失败:', data.url);
  },

  onInfo: (data): string => {
    const title = typeof data.image === 'object' ? data.image.title : data.metadata.name;
    return `
      <div class="custom-info">
        <p>${title}</p>
        <p>${data.metadata.width} × ${data.metadata.height}</p>
        <p>缩放: ${(data.scale * 100).toFixed(0)}%</p>
      </div>
    `;
  },

  onCounter: (data): string => {
    return `${data.currentPage} / ${data.totalPages}`;
  },

  onZoomIndicator: (data): string => {
    return `缩放: ${data.percentage}%`;
  }
};

// 创建查看器实例
const viewer = new ImagesViewer(options);
```

## 类型检查

ImagesViewer 提供完整的类型检查支持：

```typescript
// 正确的类型使用
const viewer1 = new ImagesViewer('image.jpg');
const viewer2 = new ImagesViewer(['image1.jpg', 'image2.jpg']);
const viewer3 = new ImagesViewer({
  images: [{ url: 'image1.jpg', title: '标题', thumbnail: 'thumb1.jpg' }]
});

// 类型错误示例（TypeScript 会报错）
const viewer4 = new ImagesViewer({
  images: [{ url: 123 }]  // 错误：url 必须是字符串
});

const viewer5 = new ImagesViewer({
  onRotate: (data) => {
    console.log(data.invalidProperty);  // 错误：invalidProperty 不存在
  }
});
```
