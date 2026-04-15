---
title: Configuration
---

# Configuration

Detailed configuration options for ImagesViewer.

## Basic Configuration

### `images`

**Type:** `string | string[] | ImageObject[]`
**Required:** Yes

Images to display, supports single URL, URL array, or image object array.

```javascript
// Single image
const viewer = new ImagesViewer('image.jpg');

// Multiple images (URL array)
const viewer = new ImagesViewer(['image1.jpg', 'image2.jpg']);

// Multiple images (object array)
const viewer = new ImagesViewer({
  images: [
    {
      url: 'https://example.com/image1.jpg',
      title: 'Landscape',
      thumbnail: 'https://example.com/thumb1.jpg'
    },
    {
      url: 'https://example.com/image2.jpg',
      title: 'Architecture',
      thumbnail: 'https://example.com/thumb2.jpg'
    }
  ]
});
```

**Image object properties:**
- `url`: Image URL (required)
- `title`: Image title (optional)
- `thumbnail`: Thumbnail URL (optional)
- Other custom properties: Can add any custom properties, accessed in event callbacks

### `props`

**Type:** `object`
**Default:** `{ url: 'url', title: 'title', thumbnail: 'thumbnail' }`

Custom image object property mapping, supports string and function forms.

**Properties:**
- `url`: Property name or getter function for image URL
- `title`: Property name or getter function for image title
- `thumbnail`: Property name or getter function for thumbnail URL

**Usage examples:**

```javascript
// Custom property mapping (string form)
const viewer = new ImagesViewer({
  images: [
    {
      url2: 'https://example.com/image1.jpg',
      title2: 'Landscape',
      thumbnail2: 'https://example.com/thumb1.jpg'
    },
    {
      url2: 'https://example.com/image2.jpg',
      title2: 'Architecture',
      thumbnail2: 'https://example.com/thumb2.jpg'
    }
  ],
  props: {
    url: 'url2',
    title: 'title2',
    thumbnail: 'thumbnail2'
  }
});

// Custom property mapping (function form)
const viewer = new ImagesViewer({
  images: [
    { id: 1, path: 'photos/1.jpg', alt: 'Landscape' },
    { id: 2, path: 'photos/2.jpg', alt: 'Portrait' }
  ],
  props: {
    url: (item, index) => `https://example.com/${item.path}`,
    title: (item, index) => `${item.alt} (ID: ${item.id})`,
    thumbnail: (item, index) => `https://example.com/thumbnails/${item.id}.jpg`
  }
});
```

### `retryOnError`

**Type:** `boolean`
**Default:** `false`

Whether to retry after image or thumbnail load failure.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  retryOnError: true // Retry after load failure
});
```

### `onImageError`

**Type:** `(data: ErrorCallbackParams) => void`

Custom callback function when image load fails.

**Callback parameters:**
- `data`: Current image object
- `index`: Current image index
- `url`: Failed image URL
- `img`: Corresponding image DOM element

**Usage example:**

```javascript
const viewer = new ImagesViewer({
  images: [
    { url: 'https://example.com/image1.jpg', title: 'Image 1' },
    { url: 'https://example.com/image2.jpg', title: 'Image 2' }
  ],
  onImageError: (data) => {
    // Custom DOM operation
    data.img.alt = 'Image load failed';
  }
});
```

### `onThumbnailError`

**Type:** `(data: ErrorCallbackParams) => void`

Custom callback function when thumbnail load fails.

**Callback parameters:**
- `data`: Current image object
- `index`: Current image index
- `url`: Failed thumbnail URL
- `img`: Corresponding thumbnail DOM element

**Usage example:**

```javascript
const viewer = new ImagesViewer({
  images: [
    { url: 'https://example.com/image1.jpg', title: 'Image 1' },
    { url: 'https://example.com/image2.jpg', title: 'Image 2' }
  ],
  onThumbnailError: (data) => {
    // Custom DOM operation
    data.img.alt = 'Thumbnail load failed';
  }
});
```

### `initialIndex`

**Type:** `number`
**Default:** `0`

Initial image index to display.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  initialIndex: 1 // Start from second image
});
```

### `closeOnMaskClick`

**Type:** `boolean`
**Default:** `false`

Whether to close the viewer when clicking the background mask.

### `loop`

**Type:** `boolean`
**Default:** `true`

Whether to loop through images.

### `preloadCount`

**Type:** `number`
**Default:** `3`

Number of adjacent images to preload.

### `maxCacheSize`

**Type:** `number`
**Default:** `30`

Maximum number of images to keep in cache.

### `minScale`

**Type:** `number`
**Default:** `0.1`

Minimum zoom scale (10%).

### `maxScale`

**Type:** `number`
**Default:** `5`

Maximum zoom scale (500%).

## Button Configuration

### `buttons`

**Type:** `object`

Toolbar button configuration.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  buttons: {
    zoomIn: true,         // Zoom in
    zoomOut: true,        // Zoom out
    rotateLeft: true,     // Rotate left
    rotateRight: true,    // Rotate right
    reset: true,          // Reset
    download: true,       // Download
    fullscreen: true,     // Fullscreen
    prev: true,           // Previous
    next: true,           // Next
    close: true,          // Close
    topClose: true,       // Top right close
    thumbnails: true,     // Thumbnails
    info: true,           // Info panel
    originalSize: true    // Original size
  }
});
```

## Custom Buttons

### `customButtons`

**Type:** `Array<[string, () => void]>`

Custom button array to add to toolbar.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  customButtons: [
    ['🔍', () => console.log('Search button clicked')],
    ['📌', () => console.log('Pin button clicked')]
  ]
});
```

## Image Info Configuration

### `imageInfo`

**Type:** `object`

Image info display configuration.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  imageInfo: {
    visible: false,      // Show info panel by default
    showName: true,      // Show file name
    showDimensions: true // Show image dimensions
  }
});
```

## Internationalization

### `i18n`

**Type:** `object`

Interface language configuration.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  i18n: {
    info: {
      name: 'Name:',
      dimensions: 'Dimensions:',
      shortcuts: 'Shortcuts',
      zoomIn: 'Zoom in:',
      zoomOut: 'Zoom out:',
      prev: 'Prev:',
      next: 'Next:',
      reset: 'Reset:',
      fullscreen: 'Fullscreen:',
      info: 'Info:',
      close: 'Close:'
    },
    buttons: {
      prev: 'Prev (←)',
      next: 'Next (→)',
      close: 'Close (Esc)',
      loading: 'Loading...'
    }
  }
});
```

## Theme Configuration

### `theme`

**Type:** `object`

Interface theme customization options.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  theme: {
    // Background
    viewerBgColor: 'rgba(0, 0, 0, 0.9)',

    // Toolbar
    toolbarBgColor: 'rgba(30, 30, 30, 0.8)',
    toolbarBorderRadius: '8px',
    toolbarPadding: '10px 15px',
    toolbarBottom: '20px',

    // Buttons
    buttonBgColor: 'rgba(50, 50, 50, 0.7)',
    buttonHoverBg: 'rgba(80, 80, 80, 0.7)',
    buttonSize: '45px',
    buttonFontSize: '20px',
    buttonBorderRadius: '50%',

    // Thumbnails
    thumbItemWidth: '80px',
    thumbItemHeight: '50px',
    thumbGap: '10px',
    thumbPadding: '15px',
    thumbMaxWidth: '70%',

    // General
    activeColor: 'rgba(100, 150, 255, 0.8)',
    textColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    transitionSpeed: '0.3s'
  }
});
```

## Event Callbacks

### `onShow`

**Type:** `(container: HTMLDivElement) => void`

Triggered when viewer is shown.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onShow: function(container) {
    console.log('Viewer shown:', container);
  }
});
```

### `onClose`

**Type:** `() => void`

Triggered when viewer is closed.

### `onChange`

**Type:** `(data: ChangeEventData) => void`

Triggered when image changes.

**Callback parameters:**
- `index`: Current image index
- `oldIndex`: Previous image index
- `direction`: Change direction ('next' | 'prev')
- `data`: Current image data
- `img`: Current image DOM element
- `dom`: Viewer container DOM element

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  onChange: function(data) {
    console.log('Switched to image:', data.index);
    console.log('From image:', data.oldIndex);
    console.log('Direction:', data.direction);
  }
});
```

### `onRotate`

**Type:** `(data: RotateEventData) => void`

Triggered when image is rotated.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onRotate: function(data) {
    console.log('Image rotated:', data.rotation);
  }
});
```

### `onDrag`

**Type:** `(data: DragEventData) => void`

Triggered when image is dragged.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onDrag: function(data) {
    console.log('Image dragged:', data.translateX, data.translateY);
  }
});
```

### `onZoom`

**Type:** `(data: ZoomEventData) => void`

Triggered when image is zoomed.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onZoom: function(data) {
    console.log('Image zoomed:', data.scale);
  }
});
```

## Custom Functions

### `onInfo`

**Type:** `(data: InfoTextParams) => string | null | undefined`

Custom info bar content.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onInfo: function(data) {
    return `
      <div class="custom-info">
        <p>Image ${data.index + 1} / ${data.totalPages}</p>
        <p>Zoom: ${(data.scale * 100).toFixed(0)}%</p>
        <p>Rotation: ${data.rotation}°</p>
      </div>
    `;
  }
});
```

### `onCounter`

**Type:** `(data: CounterParams) => string | null | undefined`

Custom page counter display.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  onCounter: function(data) {
    return `Page ${data.currentPage} of ${data.totalPages}`;
  }
});
```

### `onZoomIndicator`

**Type:** `(data: ZoomIndicatorParams) => string | null | undefined`

Custom zoom indicator display.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onZoomIndicator: function(data) {
    return `Zoom: ${data.percentage}%`;
  }
});
```

## Complete Configuration Example

```javascript
const viewer = new ImagesViewer({
  // Basic settings
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  initialIndex: 0,
  closeOnMaskClick: true,
  loop: true,
  preloadCount: 3,
  maxCacheSize: 30,
  minScale: 0.1,
  maxScale: 5,
  retryOnError: false,

  // Property mapping
  props: {
    url: 'url',
    title: 'title',
    thumbnail: 'thumbnail'
  },

  // Buttons
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

  // Custom buttons
  customButtons: [
    ['🔍', () => console.log('Search')],
    ['📌', () => console.log('Pin')]
  ],

  // Image info
  imageInfo: {
    visible: false,
    showName: true,
    showDimensions: true
  },

  // Internationalization
  i18n: {
    info: {
      name: 'Name:',
      dimensions: 'Dimensions:',
      shortcuts: 'Shortcuts',
      zoomIn: 'Zoom in:',
      zoomOut: 'Zoom out:',
      prev: 'Prev:',
      next: 'Next:',
      reset: 'Reset:',
      fullscreen: 'Fullscreen:',
      info: 'Info:',
      close: 'Close:'
    },
    buttons: {
      prev: 'Prev (←)',
      next: 'Next (→)',
      close: 'Close (Esc)',
      loading: 'Loading...'
    }
  },

  // Theme
  theme: {
    viewerBgColor: 'rgba(0, 0, 0, 0.9)',
    toolbarBgColor: 'rgba(30, 30, 30, 0.8)',
    buttonBgColor: 'rgba(50, 50, 50, 0.7)',
    textColor: 'rgba(255, 255, 255, 0.9)'
  },

  // Event callbacks
  onShow: function(container) {
    console.log('Viewer shown');
  },
  onClose: function() {
    console.log('Viewer closed');
  },
  onChange: function(data) {
    console.log('Image changed:', data.index, data.direction);
  },
  onRotate: function(data) {
    console.log('Image rotated:', data.rotation);
  },
  onDrag: function(data) {
    console.log('Image dragged:', data.translateX, data.translateY);
  },
  onZoom: function(data) {
    console.log('Image zoomed:', data.scale);
  },
  onImageError: function(data) {
    console.log('Image load failed:', data.url);
  },
  onThumbnailError: function(data) {
    console.log('Thumbnail load failed:', data.url);
  },

  // Custom functions
  onInfo: function(data) {
    return `
      <div class="custom-info">
        <p>Image ${data.index + 1} / ${data.totalPages}</p>
        <p>Zoom: ${(data.scale * 100).toFixed(0)}%</p>
        <p>Rotation: ${data.rotation}°</p>
      </div>
    `;
  },
  onCounter: function(data) {
    return `Page ${data.currentPage} of ${data.totalPages}`;
  },
  onZoomIndicator: function(data) {
    return `Zoom: ${data.percentage}%`;
  }
});
```
