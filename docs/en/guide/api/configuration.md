---
title: Configuration
---

# Configuration

This page documents all configuration options available for ImagesViewer.

## Basic Configuration

### `images`

**Type:** `string | string[]`
**Required:** Yes

The image(s) to display. Can be a single image URL or an array of image URLs.

```javascript
// Single image
const viewer = new ImagesViewer('image.jpg');

// Multiple images
const viewer = new ImagesViewer(['image1.jpg', 'image2.jpg']);

// With options
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg']
});
```

### `closeOnMaskClick`

**Type:** `boolean`
**Default:** `false`

Whether to close the viewer when clicking on the background mask.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  closeOnMaskClick: true
});
```

### `loop`

**Type:** `boolean`
**Default:** `true`

Whether to loop through images when reaching the first or last image.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  loop: false
});
```

### `preloadCount`

**Type:** `number`
**Default:** `3`

Number of adjacent images to preload.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  preloadCount: 5
});
```

### `maxCacheSize`

**Type:** `number`
**Default:** `30`

Maximum number of images to keep in cache.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  maxCacheSize: 20
});
```

### `minScale`

**Type:** `number`
**Default:** `0.1`

Minimum zoom scale (10%).

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  minScale: 0.5 // Minimum 50% zoom
});
```

### `maxScale`

**Type:** `number`
**Default:** `5`

Maximum zoom scale (500%).

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  maxScale: 3 // Maximum 300% zoom
});
```

## Buttons Configuration

### `buttons`

**Type:** `object`

Configuration for toolbar buttons.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  buttons: {
    zoomIn: true,         // Show zoom in button
    zoomOut: true,        // Show zoom out button
    rotateLeft: true,     // Show rotate left button
    rotateRight: true,    // Show rotate right button
    reset: true,          // Show reset button
    download: true,       // Show download button
    fullscreen: true,     // Show fullscreen button
    prev: true,           // Show previous button
    next: true,           // Show next button
    close: true,          // Show close button
    topClose: true,       // Show top-right close button
    thumbnails: true,     // Show thumbnail navigation
    info: true,           // Show info panel button
    originalSize: true    // Show original size button
  }
});
```

## Custom Buttons

### `customButtons`

**Type:** `Array<[string, () => void]>`

Array of custom buttons to add to the toolbar.

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

Configuration for image information display.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  imageInfo: {
    visible: false,      // Show info panel by default
    showName: true,      // Show filename
    showDimensions: true // Show image dimensions
  }
});
```

## Internationalization

### `i18n`

**Type:** `object`

Internationalization configuration.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
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
      close: 'Close:'
    },
    buttons: {
      prev: 'Previous (←)',
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

Theme customization options.

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
    
    // Navigation buttons
    navButtonBgColor: 'rgba(50, 50, 50, 0.7)',
    navButtonHoverBg: 'rgba(80, 80, 80, 0.7)',
    navButtonSize: '55px',
    navButtonFontSize: '20px',
    navButtonBorderRadius: '50%',
    
    // Top close button
    topCloseBtnSize: '50px',
    topCloseBtnTop: '20px',
    topCloseBtnRight: '20px',
    topCloseBtnFontSize: '24px',
    topCloseBtnBgColor: 'rgba(50, 50, 50, 0.7)',
    topCloseBtnHoverBg: 'rgba(80, 80, 80, 0.7)',
    
    // Info panel
    infoBgColor: 'rgba(30, 30, 30, 0.8)',
    infoBorderRadius: '12px',
    infoPadding: '10px 15px',
    infoFontSize: '13px',
    infoTop: '70px',
    infoLeft: '20px',
    
    // Zoom indicator
    zoomIndicatorBg: 'rgba(0, 0, 0, 0.7)',
    zoomIndicatorBorderRadius: '18px',
    zoomIndicatorPadding: '6px 12px',
    zoomIndicatorFontSize: '14px',
    zoomIndicatorTop: '20px',
    zoomIndicatorLeft: '20px',
    
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

### `show`

**Type:** `(container: HTMLElement) => void`

Callback when the viewer is shown.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  show: function(container) {
    console.log('Viewer shown:', container);
  }
});
```

### `close`

**Type:** `() => void`

Callback when the viewer is closed.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  close: function() {
    console.log('Viewer closed');
  }
});
```

### `change`

**Type:** `(currentIndex: number, direction: 'prev' | 'next') => void`

Callback when the image is changed.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  change: function(currentIndex, direction) {
    console.log('Image changed:', currentIndex, direction);
  }
});
```

## Full Configuration Example

```javascript
const viewer = new ImagesViewer({
  // Basic settings
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  closeOnMaskClick: true,
  loop: true,
  preloadCount: 3,
  maxCacheSize: 30,
  minScale: 0.1,
  maxScale: 5,
  
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
      dimensions: 'Size:',
      shortcuts: 'Shortcuts',
      zoomIn: 'Zoom In:',
      zoomOut: 'Zoom Out:',
      prev: 'Previous:',
      next: 'Next:',
      reset: 'Reset:',
      fullscreen: 'Fullscreen:',
      info: 'Info:',
      close: 'Close:'
    },
    buttons: {
      prev: 'Previous (←)',
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
  show: function(container) {
    console.log('Viewer shown');
  },
  close: function() {
    console.log('Viewer closed');
  },
  change: function(index, direction) {
    console.log('Image changed:', index, direction);
  }
});
```
