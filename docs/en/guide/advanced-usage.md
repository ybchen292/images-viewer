---
title: Advanced Usage
---

# Advanced Usage

This guide covers advanced features and configurations of ImagesViewer, including customization options, performance optimization, and integration with frameworks.

## Custom Theme

You can fully customize the appearance of ImagesViewer using the `theme` configuration:

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  theme: {
    // Background
    viewerBgColor: 'rgba(0, 0, 0, 0.9)',
    
    // Toolbar
    toolbarBgColor: 'rgba(30, 30, 30, 0.8)',
    toolbarBorderRadius: '8px',
    toolbarPadding: '10px 15px',
    
    // Buttons
    buttonBgColor: 'rgba(50, 50, 50, 0.7)',
    buttonHoverBg: 'rgba(80, 80, 80, 0.7)',
    buttonSize: '45px',
    
    // Navigation buttons
    navButtonBgColor: 'rgba(50, 50, 50, 0.7)',
    navButtonSize: '55px',
    
    // Info panel
    infoBgColor: 'rgba(30, 30, 30, 0.8)',
    infoBorderRadius: '8px',
    
    // Thumbnails
    thumbItemWidth: '80px',
    thumbItemHeight: '50px',
    thumbGap: '12px',
    
    // Colors
    textColor: 'rgba(255, 255, 255, 0.9)',
    activeColor: 'rgba(100, 150, 255, 0.8)',
    
    // Animation
    transitionSpeed: '0.3s'
  }
});
```

## Internationalization

ImagesViewer supports internationalization through the `i18n` configuration:

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
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
      close: '关闭 (Esc)'
    }
  }
});
```

## Cache Management

Optimize performance with cache management:

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg'],
  maxCacheSize: 20, // Maximum 20 images in cache
  preloadCount: 5, // Preload 5 adjacent images
});
```

## Custom Buttons

Add custom buttons to the toolbar:

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  customButtons: [
    [
      '🔍',
      () => {
        console.log('Custom search button clicked');
        // Custom functionality
      }
    ],
    [
      '📌',
      () => {
        console.log('Custom pin button clicked');
        // Custom functionality
      }
    ]
  ]
});
```

## Programmatic Control

Full programmatic control over the viewer:

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  onShow: function(container) {
    // Access DOM elements
    const toolbar = container.querySelector('.images-viewer-toolbar');
    
    // Add custom elements
    const customElement = document.createElement('div');
    customElement.textContent = 'Custom content';
    customElement.style.cssText = 'color: white; margin: 10px;';
    container.appendChild(customElement);
  }
});

// Later in your code
setTimeout(() => {
  viewer.next(); // Go to next image
}, 3000);

setTimeout(() => {
  viewer.close(); // Close viewer
}, 10000);
```

## Integration with Frameworks

### Vue.js

```vue
<template>
  <div>
    <button @click="openViewer">View Images</button>
  </div>
</template>

<script>
import ImagesViewer from 'images-viewer-js';

export default {
  methods: {
    openViewer() {
      new ImagesViewer({
        images: ['image1.jpg', 'image2.jpg'],
        closeOnMaskClick: true
      });
    }
  }
};
</script>
```

### React

```jsx
import React from 'react';
import ImagesViewer from 'images-viewer-js';

function ImageGallery() {
  const openViewer = () => {
    new ImagesViewer({
      images: ['image1.jpg', 'image2.jpg'],
      closeOnMaskClick: true
    });
  };

  return (
    <button onClick={openViewer}>View Images</button>
  );
}

export default ImageGallery;
```

### Angular

```typescript
import { Component } from '@angular/core';
import ImagesViewer from 'images-viewer-js';

@Component({
  selector: 'app-image-viewer',
  template: '<button (click)="openViewer()">View Images</button>'
})
export class ImageViewerComponent {
  openViewer() {
    new ImagesViewer({
      images: ['image1.jpg', 'image2.jpg'],
      closeOnMaskClick: true
    });
  }
}
```

## Performance Optimization

### Lazy Loading

ImagesViewer automatically implements lazy loading for images, but you can optimize further:

```javascript
const viewer = new ImagesViewer({
  images: largeImageArray,
  preloadCount: 3, // Only preload 3 adjacent images
  maxCacheSize: 10, // Limit cache size
});
```

### Thumbnail Optimization

Customize thumbnail settings for better performance:

```javascript
const viewer = new ImagesViewer({
  images: imageArray,
  theme: {
    thumbItemWidth: '60px', // Smaller thumbnails
    thumbItemHeight: '40px',
    thumbMaxWidth: '60%' // Limit thumbnail container width
  }
});
```

## Advanced Event Handling

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  onShow: function(container) {
    console.log('Viewer opened');
    // Add custom event listeners
    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('custom-element')) {
        // Handle custom element click
      }
    });
  },
  onClose: function() {
    console.log('Viewer closed');
    // Clean up resources
  },
  onChange: function(index, direction) {
    console.log(`Changed to image ${index} (${direction})`);
    // Track image views
  }
});
```

## Security Considerations

### Image Source Security

When loading images from external sources, ensure they are from trusted domains to prevent security issues.

### CSP Compliance

If your site uses Content Security Policy (CSP), you may need to add appropriate directives:

```html
<meta http-equiv="Content-Security-Policy" content="img-src 'self' https: data:;">
```