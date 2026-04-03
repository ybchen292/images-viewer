---
title: Advanced Configuration
---

# Advanced Configuration Example

This example demonstrates advanced configuration options for ImagesViewer, including performance optimization, custom behavior, and integration with other libraries.

## Performance Optimization

### Cache Management

```javascript
const viewer = new ImagesViewer({
  images: largeImageArray,
  maxCacheSize: 20, // Limit cache to 20 images
  preloadCount: 5,   // Preload 5 adjacent images
});
```

### Thumbnail Optimization

```javascript
const viewer = new ImagesViewer({
  images: imageArray,
  theme: {
    thumbItemWidth: '60px', // Smaller thumbnails for better performance
    thumbItemHeight: '40px',
    thumbGap: '8px',
    thumbMaxWidth: '60%'
  }
});
```

## Custom Behavior

### Event Callbacks

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  onShow: function(container) {
    console.log('Viewer opened');
    // Add custom elements
    const header = document.createElement('div');
    header.textContent = 'Custom Header';
    header.style.cssText = 'color: white; position: absolute; top: 20px; left: 50%; transform: translateX(-50%);';
    container.appendChild(header);
  },
  onClose: function() {
    console.log('Viewer closed');
    // Clean up resources
  },
  onChange: function(index, direction) {
    console.log('Image changed:', index, direction);
    // Track analytics
  }
});
```

### Custom Buttons

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  customButtons: [
    [
      '🔍',
      () => {
        console.log('Search button clicked');
        // Custom search functionality
      }
    ],
    [
      '📌',
      () => {
        console.log('Pin button clicked');
        // Custom pin functionality
      }
    ],
    [
      '� Share',
      () => {
        console.log('Share button clicked');
        // Share functionality
      }
    ]
  ]
});
```

## Complete Advanced Example

```html
<!DOCTYPE html>
<html>
  <head>
    <title>ImagesViewer Advanced Configuration Example</title>
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
      .config-option {
        margin: 15px 0;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      .config-option h3 {
        margin-top: 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>ImagesViewer Advanced Configuration Example</h1>
      
      <div class="config-option">
        <h3>Performance Optimized</h3>
        <button class="button" onclick="openPerformanceOptimized()">Open Optimized Viewer</button>
      </div>
      
      <div class="config-option">
        <h3>Custom Buttons</h3>
        <button class="button" onclick="openWithCustomButtons()">Open with Custom Buttons</button>
      </div>
      
      <div class="config-option">
        <h3>Event Callbacks</h3>
        <button class="button" onclick="openWithCallbacks()">Open with Callbacks</button>
      </div>
      
      <div class="config-option">
        <h3>Full Customization</h3>
        <button class="button" onclick="openFullyCustomized()">Open Fully Customized</button>
      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/images-viewer-js@latest/dist/index.js"></script>
    <script>
      // Generate large image array for testing
      function generateImageArray(count) {
        const images = [];
        for (let i = 1; i <= count; i++) {
          images.push(`https://picsum.photos/800/1200?random=${i}`);
        }
        return images;
      }

      const largeImageArray = generateImageArray(50);

      function openPerformanceOptimized() {
        new ImagesViewer({
          images: largeImageArray,
          maxCacheSize: 15, // Smaller cache for large images
          preloadCount: 3,   // Fewer preloaded images
          theme: {
            thumbItemWidth: '60px',
            thumbItemHeight: '40px'
          },
          buttons: {
            thumbnails: true
          }
        });
      }

      function openWithCustomButtons() {
        new ImagesViewer({
          images: ['https://picsum.photos/800/1200?random=1', 'https://picsum.photos/800/1200?random=2'],
          customButtons: [
            ['🔍', () => console.log('Search')],
            ['📌', () => console.log('Pin')],
            ['📤', () => console.log('Share')],
            ['❤️', () => console.log('Favorite')]
          ]
        });
      }

      function openWithCallbacks() {
        new ImagesViewer({
          images: ['https://picsum.photos/800/1200?random=1', 'https://picsum.photos/800/1200?random=2', 'https://picsum.photos/800/1200?random=3'],
          onShow: function(container) {
            console.log('Viewer opened');
            // Add custom loading indicator
            const loading = document.createElement('div');
            loading.textContent = 'Loading...';
            loading.style.cssText = 'color: white; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);';
            container.appendChild(loading);
            
            // Remove loading after 2 seconds
            setTimeout(() => {
              loading.remove();
            }, 2000);
          },
          onClose: function() {
            console.log('Viewer closed');
            alert('Viewer closed!');
          },
          onChange: function(index, direction) {
            console.log(`Changed to image ${index} (${direction})`);
            document.title = `Image ${index + 1} | ImagesViewer`;
          }
        });
      }

      function openFullyCustomized() {
        new ImagesViewer({
          images: ['https://picsum.photos/800/1200?random=1', 'https://picsum.photos/800/1200?random=2', 'https://picsum.photos/800/1200?random=3'],
          closeOnMaskClick: true,
          loop: true,
          maxCacheSize: 10,
          preloadCount: 4,
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
          customButtons: [
            ['🔍', () => console.log('Search')],
            ['📌', () => console.log('Pin')]
          ],
          imageInfo: {
            visible: true,
            showName: true,
            showDimensions: true
          },
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
              close: 'Close (Esc)'
            }
          },
          theme: {
            viewerBgColor: 'rgba(0, 0, 0, 0.95)',
            toolbarBgColor: 'rgba(30, 30, 30, 0.9)',
            buttonBgColor: 'rgba(50, 50, 50, 0.8)',
            buttonHoverBg: 'rgba(80, 80, 80, 0.8)',
            textColor: 'rgba(255, 255, 255, 0.9)',
            activeColor: 'rgba(100, 150, 255, 0.8)',
            thumbItemWidth: '80px',
            thumbItemHeight: '50px',
            thumbGap: '10px'
          },
          onShow: function(container) {
            console.log('Viewer opened');
          },
          onClose: function() {
            console.log('Viewer closed');
          },
          onChange: function(index, direction) {
            console.log('Image changed:', index, direction);
          }
        });
      }
    </script>
  </body>
</html>
```

## Integration with Other Libraries

### Integration with Analytics

```javascript
const viewer = new ImagesViewer({
  images: productImages,
  onShow: function() {
    // Track viewer open event
    analytics.track('viewer_open', {
      imageCount: productImages.length
    });
  },
  onClose: function() {
    // Track viewer close event
    analytics.track('viewer_close');
  },
  onChange: function(index, direction) {
    // Track image view event
    analytics.track('image_view', {
      imageIndex: index,
      imageId: productIds[index],
      direction: direction
    });
  }
});
```

### Integration with Lazy Loading Libraries

```javascript
// Using with lazy loading library
const lazyImages = document.querySelectorAll('.lazy-image');

lazyImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    // Get high-resolution image URL
    const highResUrl = img.dataset.highRes;
    
    // Open viewer with this image and related images
    new ImagesViewer({
      images: productImages,
      // Other configuration
    });
  });
});
```

## Advanced Use Cases

### Image Comparison

```javascript
// Image comparison functionality
const viewer = new ImagesViewer({
  images: ['before.jpg', 'after.jpg'],
  loop: true,
  buttons: {
    prev: true,
    next: true
  },
  onChange: function(index) {
    console.log(`Showing ${index === 0 ? 'before' : 'after'} image`);
  }
});
```

### Slideshow Mode

```javascript
// Slideshow functionality
const viewer = new ImagesViewer({
  images: slideshowImages,
  onShow: function() {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slideshowImages.length;
      viewer.loadCurrentImage(currentIndex);
    }, 3000);
    
    // Store interval reference for cleanup
    viewer.slideshowInterval = interval;
  },
  onClose: function() {
    // Clear interval on close
    if (viewer.slideshowInterval) {
      clearInterval(viewer.slideshowInterval);
    }
  }
});
```

## Best Practices

### For Large Image Collections

- Use smaller thumbnail sizes
- Limit cache size
- Reduce preload count
- Consider using progressive loading

### For Embedded Systems

- Disable unnecessary features
- Use minimal theme
- Limit image resolution
- Optimize for memory usage

### For High-Traffic Websites

- Use CDN for images
- Implement server-side caching
- Consider using WebP format for images
- Monitor performance metrics
