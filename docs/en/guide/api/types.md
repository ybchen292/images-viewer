---
title: TypeScript Types
---

# TypeScript Types

ImagesViewer provides complete TypeScript type definitions.

## Basic Types

### ImageObject

Image object type with extensible properties.

```typescript
interface ImageObject {
  url: string;           // Image URL (required)
  title?: string;        // Image title (optional)
  thumbnail?: string;    // Thumbnail URL (optional)
  [key: string]: any;    // Other custom properties
}
```

**Usage Example:**

```typescript
const images: ImageObject[] = [
  {
    url: 'https://example.com/image1.jpg',
    title: 'Landscape',
    thumbnail: 'https://example.com/thumb1.jpg',
    category: 'nature',
    tags: ['landscape', 'sunset']
  },
  {
    url: 'https://example.com/image2.jpg',
    title: 'Architecture',
    thumbnail: 'https://example.com/thumb2.jpg',
    category: 'architecture'
  }
];

const viewer = new ImagesViewer({
  images: images
});
```

## Event Types

### RotateEventData

Rotation event parameters.

```typescript
interface RotateEventData {
  image: string | ImageObject;  // Current image data
  index: number;              // Current image index
  rotation: number;           // Current rotation angle
  oldRotation: number;        // Old rotation angle
}
```

**Usage Example:**

```typescript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onRotate: (data: RotateEventData) => {
    console.log('Rotation angle:', data.rotation);
    console.log('Image index:', data.index);
    if (typeof data.image === 'object') {
      console.log('Image title:', data.image.title);
    }
  }
});
```

### DragEventData

Drag event parameters.

```typescript
interface DragEventData {
  image: string | ImageObject;  // Current image data
  index: number;              // Current image index
  translateX: number;         // Current X-axis offset
  translateY: number;         // Current Y-axis offset
}
```

**Usage Example:**

```typescript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onDrag: (data: DragEventData) => {
    console.log('Drag position:', data.translateX, data.translateY);
  }
});
```

### ZoomEventData

Zoom event parameters.

```typescript
interface ZoomEventData {
  image: string | ImageObject;  // Current image data
  index: number;              // Current image index
  scale: number;              // Current zoom scale
  oldScale: number;          // Old zoom scale
}
```

**Usage Example:**

```typescript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onZoom: (data: ZoomEventData) => {
    console.log('Zoom scale:', data.scale);
    console.log('Zoom change:', data.scale - data.oldScale);
  }
});
```

## Custom Function Types

### InfoTextParams

Info bar custom function parameters.

```typescript
interface InfoTextParams {
  image: string | ImageObject;  // Current image data
  index: number;              // Current image index
  metadata: {
    name: string;              // File name
    width: number;            // Image width
    height: number;           // Image height
  };
  scale: number;              // Current zoom scale
  rotation: number;           // Current rotation angle
}
```

**Usage Example:**

```typescript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onInfo: (data: InfoTextParams): string => {
    const title = typeof data.image === 'object' ? data.image.title : data.metadata.name;
    return `
      <div class="custom-info">
        <p>${title}</p>
        <p>${data.metadata.width} × ${data.metadata.height}</p>
        <p>Zoom: ${(data.scale * 100).toFixed(0)}%</p>
      </div>
    `;
  }
});
```

### CounterParams

Page counter custom function parameters.

```typescript
interface CounterParams {
  image: string | ImageObject;  // Current image data
  index: number;              // Current image index
  currentPage: number;        // Current page number (1-indexed)
  totalPages: number;         // Total pages
  scale: number;              // Current zoom scale
  rotation: number;           // Current rotation angle
}
```

**Usage Example:**

```typescript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  onCounter: (data: CounterParams): string => {
    return `${data.currentPage} / ${data.totalPages}`;
  }
});
```

### ZoomIndicatorParams

Zoom indicator custom function parameters.

```typescript
interface ZoomIndicatorParams {
  image: string | ImageObject;  // Current image data
  index: number;              // Current image index
  scale: number;              // Current zoom scale
  percentage: number;         // Zoom percentage
}
```

**Usage Example:**

```typescript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onZoomIndicator: (data: ZoomIndicatorParams): string => {
    return `Zoom: ${data.percentage}%`;
  }
});
```

## Configuration Types

### ImagesViewerOptions

Viewer configuration options.

```typescript
interface ImagesViewerOptions {
  // Basic configuration
  images?: string | string[] | ImageObject[];
  initialIndex?: number;
  closeOnMaskClick?: boolean;
  loop?: boolean;
  preloadCount?: number;
  maxCacheSize?: number;
  minScale?: number;
  maxScale?: number;

  // Button configuration
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

  // Custom buttons
  customButtons?: Array<[string, () => void]>;

  // Image info configuration
  imageInfo?: {
    visible?: boolean;
    showName?: boolean;
    showDimensions?: boolean;
  };

  // Internationalization configuration
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

  // Theme configuration
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

  // Event callbacks
  onShow?: (container: HTMLElement) => void;
  onClose?: () => void;
  onChange?: (currentIndex: number, direction: 'prev' | 'next') => void;
  onRotate?: (data: RotateEventData) => void;
  onDrag?: (data: DragEventData) => void;
  onZoom?: (data: ZoomEventData) => void;

  // Custom functions
  onInfo?: (data: InfoTextParams) => string | null | undefined;
  onCounter?: (data: CounterParams) => string | null | undefined;
  onZoomIndicator?: (data: ZoomIndicatorParams) => string | null | undefined;
}
```

## Complete Example

```typescript
import { ImagesViewer, ImageObject, ImagesViewerOptions } from './index';

// Define image object array
const images: ImageObject[] = [
  {
    url: 'https://example.com/image1.jpg',
    title: 'Landscape',
    thumbnail: 'https://example.com/thumb1.jpg',
    category: 'nature'
  },
  {
    url: 'https://example.com/image2.jpg',
    title: 'Architecture',
    thumbnail: 'https://example.com/thumb2.jpg',
    category: 'architecture'
  }
];

// Define configuration options
const options: ImagesViewerOptions = {
  images: images,
  initialIndex: 0,
  closeOnMaskClick: true,
  loop: true,
  preloadCount: 3,
  maxCacheSize: 30,
  minScale: 0.1,
  maxScale: 5,
  
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
  
  onShow: (container: HTMLElement) => {
    console.log('Viewer shown');
  },
  
  onClose: () => {
    console.log('Viewer closed');
  },
  
  onChange: (index: number, direction: 'prev' | 'next') => {
    console.log('Image changed:', index, direction);
  },
  
  onRotate: (data: RotateEventData) => {
    console.log('Image rotated:', data.rotation);
  },
  
  onDrag: (data: DragEventData) => {
    console.log('Image dragged:', data.translateX, data.translateY);
  },
  
  onZoom: (data: ZoomEventData) => {
    console.log('Image zoomed:', data.scale);
  },
  
  onInfo: (data: InfoTextParams): string => {
    const title = typeof data.image === 'object' ? data.image.title : data.metadata.name;
    return `
      <div class="custom-info">
        <p>${title}</p>
        <p>${data.metadata.width} × ${data.metadata.height}</p>
        <p>Zoom: ${(data.scale * 100).toFixed(0)}%</p>
      </div>
    `;
  },
  
  onCounter: (data: CounterParams): string => {
    return `${data.currentPage} / ${data.totalPages}`;
  },
  
  onZoomIndicator: (data: ZoomIndicatorParams): string => {
    return `Zoom: ${data.percentage}%`;
  }
};

// Create viewer instance
const viewer = new ImagesViewer(options);
```

## Type Checking

ImagesViewer provides complete type checking support:

```typescript
// Correct type usage
const viewer1 = new ImagesViewer('image.jpg');
const viewer2 = new ImagesViewer(['image1.jpg', 'image2.jpg']);
const viewer3 = new ImagesViewer({
  images: [{ url: 'image1.jpg', title: 'Title', thumbnail: 'thumb1.jpg' }]
});

// Type error examples (TypeScript will report errors)
const viewer4 = new ImagesViewer({
  images: [{ url: 123 }]  // Error: url must be a string
});

const viewer5 = new ImagesViewer({
  onRotate: (data: RotateEventData) => {
    console.log(data.invalidProperty);  // Error: invalidProperty does not exist
  }
});
```
