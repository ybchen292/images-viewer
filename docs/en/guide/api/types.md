---
title: TypeScript Types
---

# TypeScript Types

ImagesViewer provides complete TypeScript type definitions.

## Basic Types

### ImageObject

Image object type with support for extended properties.

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

Rotate event parameters.

```typescript
interface RotateEventData {
  data: string | ImageObject;  // Current image data
  index: number;              // Current image index
  rotation: number;           // Current rotation angle
  oldRotation: number;        // Previous rotation angle
}
```

**Usage Example:**

```typescript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onRotate: (data: RotateEventData) => {
    console.log('Rotation angle:', data.rotation);
    console.log('Image index:', data.index);
    if (typeof data.data === 'object') {
      console.log('Image title:', data.data.title);
    }
  }
});
```

### DragEventData

Drag event parameters.

```typescript
interface DragEventData {
  data: string | ImageObject;  // Current image data
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
  data: string | ImageObject;  // Current image data
  index: number;              // Current image index
  scale: number;              // Current zoom scale
  oldScale: number;           // Previous zoom scale
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

### ChangeEventData

Change event parameters.

```typescript
interface ChangeEventData {
  index: number;              // Current image index
  oldIndex: number;          // Previous image index
  direction: 'next' | 'prev'; // Change direction
  data: string | ImageObject; // Current image data
  img: HTMLImageElement;      // Current image DOM element
  dom: HTMLDivElement;        // Viewer container DOM element
}
```

**Usage Example:**

```typescript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  onChange: (data: ChangeEventData) => {
    console.log('Switched to image:', data.index);
    console.log('From image:', data.oldIndex);
    console.log('Direction:', data.direction);
  }
});
```

### ErrorCallbackParams

Error callback parameters.

```typescript
interface ErrorCallbackParams {
  data: string | ImageObject; // Current image data
  index: number;               // Current image index
  url: string;                  // Failed image URL
  img: HTMLImageElement | null; // Corresponding image or thumbnail DOM element
}
```

**Usage Example:**

```typescript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  onImageError: (data: ErrorCallbackParams) => {
    console.log('Image load failed:', data.url);
    // Return string to update alt attribute
    return `Image load failed: ${data.url}`;
  },
  onThumbnailError: (data: ErrorCallbackParams) => {
    console.log('Thumbnail load failed:', data.url);
    // Custom DOM operation
    if (data.img) {
      data.img.alt = 'Thumbnail load failed';
    }
  }
});
```

## Custom Function Types

### InfoTextParams

Info bar custom function parameters.

```typescript
interface InfoTextParams {
  data: string | ImageObject;  // Current image data
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

Counter custom function parameters.

```typescript
interface CounterParams {
  data: string | ImageObject;  // Current image data
  index: number;              // Current image index
  currentPage: number;        // Current page number (starting from 1)
  totalPages: number;         // Total page count
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
  data: string | ImageObject;  // Current image data
  index: number;              // Current image index
  scale: number;              // Current zoom scale
  percentage: number;          // Zoom percentage
  rotation: number;           // Current rotation angle
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
  // Basic Configuration
  images?: string | string[] | ImageObject[];
  initialIndex?: number;
  closeOnMaskClick?: boolean;
  loop?: boolean;
  preloadCount?: number;
  maxCacheSize?: number;
  minScale?: number;
  maxScale?: number;

  // Retry after failure
  retryOnError?: boolean;

  // Button Configuration
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

  // Custom Buttons
  customButtons?: Array<[string, () => void]>;

  // Image Info Configuration
  imageInfo?: {
    visible?: boolean;
    showName?: boolean;
    showDimensions?: boolean;
  };

  // Props Mapping Configuration
  props?: {
    url?: string | ((item: any, index: number) => string);
    title?: string | ((item: any, index: number) => string);
    thumbnail?: string | ((item: any, index: number) => string);
  };

  // Error Callbacks
  onImageError?: (data: ErrorCallbackParams) => void;
  onThumbnailError?: (data: ErrorCallbackParams) => void;

  // Event Callbacks
  onShow?: (container: HTMLDivElement) => void;
  onClose?: () => void;
  onChange?: (data: ChangeEventData) => void;
  onRotate?: (data: RotateEventData) => void;
  onDrag?: (data: DragEventData) => void;
  onZoom?: (data: ZoomEventData) => void;

  // Custom Functions
  onInfo?: (data: InfoTextParams) => string | null | undefined;
  onCounter?: (data: CounterParams) => string | null | undefined;
  onZoomIndicator?: (data: ZoomIndicatorParams) => string | null | undefined;

  // Internationalization Configuration
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

  // Theme Configuration
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
    console.log('Viewer shown');
  },

  onClose: () => {
    console.log('Viewer closed');
  },

  onChange: (data) => {
    console.log('Image changed:', data.index, data.direction);
  },

  onRotate: (data) => {
    console.log('Image rotated:', data.rotation);
  },

  onDrag: (data) => {
    console.log('Image dragged:', data.translateX, data.translateY);
  },

  onZoom: (data) => {
    console.log('Image zoomed:', data.scale);
  },

  onImageError: (data) => {
    console.log('Image load failed:', data.url);
  },

  onThumbnailError: (data) => {
    console.log('Thumbnail load failed:', data.url);
  },

  onInfo: (data): string => {
    const title = typeof data.image === 'object' ? data.image.title : data.metadata.name;
    return `
      <div class="custom-info">
        <p>${title}</p>
        <p>${data.metadata.width} × ${data.metadata.height}</p>
        <p>Zoom: ${(data.scale * 100).toFixed(0)}%</p>
      </div>
    `;
  },

  onCounter: (data): string => {
    return `${data.currentPage} / ${data.totalPages}`;
  },

  onZoomIndicator: (data): string => {
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
  onRotate: (data) => {
    console.log(data.invalidProperty);  // Error: invalidProperty does not exist
  }
});
```
