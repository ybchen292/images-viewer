---
title: Events
---

# Events

This page documents all events available in ImagesViewer.

## Event Callbacks

ImagesViewer provides callback functions that are triggered at specific points in the viewer's lifecycle.

### `show`

**Type:** `(container: HTMLElement) => void`

Triggered when the viewer is shown.

**Parameters:**
- `container`: The main viewer container element

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  show: function(container) {
    console.log('Viewer shown:', container);
    
    // Add custom elements
    const customElement = document.createElement('div');
    customElement.textContent = 'Welcome!';
    customElement.style.cssText = 'color: white; position: absolute; top: 10px; left: 50%; transform: translateX(-50%);';
    container.appendChild(customElement);
  }
});
```

### `close`

**Type:** `() => void`

Triggered when the viewer is closed.

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  close: function() {
    console.log('Viewer closed');
    
    // Clean up resources
    cleanupResources();
  }
});
```

### `change`

**Type:** `(currentIndex: number, direction: 'prev' | 'next') => void`

Triggered when the current image is changed.

**Parameters:**
- `currentIndex`: The index of the newly displayed image
- `direction`: The direction of navigation (`'prev'` or `'next'`)

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  change: function(currentIndex, direction) {
    console.log('Image changed to:', currentIndex);
    console.log('Direction:', direction);
    
    // Track image views
    analytics.track('image_view', {
      imageIndex: currentIndex,
      direction: direction
    });
  }
});
```

## Event Flow

The typical event flow when using ImagesViewer is:

1. **Viewer initialization** - `new ImagesViewer()`
2. **Viewer shown** - `show` callback triggered
3. **Image changes** - `change` callback triggered (multiple times)
4. **Viewer closed** - `close` callback triggered

## Usage Examples

### Tracking User Interactions

```javascript
const viewer = new ImagesViewer({
  images: productImages,
  show: function() {
    console.log('Product gallery opened');
    analytics.track('gallery_opened');
  },
  close: function() {
    console.log('Product gallery closed');
    analytics.track('gallery_closed');
  },
  change: function(index, direction) {
    console.log(`Viewing product ${index + 1}`);
    analytics.track('product_view', {
      productId: productIds[index],
      position: index + 1,
      total: productImages.length,
      direction: direction
    });
  }
});
```

### Custom UI Elements

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  show: function(container) {
    // Add custom header
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
    header.textContent = 'Image Gallery';
    container.appendChild(header);
    
    // Add custom footer
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
    footer.textContent = 'Click on images to zoom';
    container.appendChild(footer);
  }
});
```

### Dynamic Content

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  change: function(index) {
    // Update custom content based on current image
    updateImageInfo(index);
  }
});

function updateImageInfo(index) {
  const imageInfo = imageDetails[index];
  // Update UI with image-specific information
  console.log('Updating info for:', imageInfo.title);
}
```

## Best Practices

### Event Handler Cleanup

When adding event listeners within callbacks, make sure to clean them up to avoid memory leaks:

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  show: function(container) {
    const customButton = document.createElement('button');
    customButton.textContent = 'Custom Action';
    customButton.style.cssText = 'position: absolute; top: 20px; right: 20px; z-index: 1000;';
    
    const handleClick = () => {
      console.log('Custom button clicked');
    };
    
    customButton.addEventListener('click', handleClick);
    container.appendChild(customButton);
    
    // Store reference for cleanup
    container._customButton = customButton;
    container._handleClick = handleClick;
  },
  close: function() {
    // Clean up event listeners
    if (viewer.container && viewer.container._customButton) {
      viewer.container._customButton.removeEventListener('click', viewer.container._handleClick);
    }
  }
});
```

### Asynchronous Operations

You can perform asynchronous operations in event callbacks:

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  show: async function() {
    try {
      // Load additional data
      const data = await fetchImageData();
      console.log('Image data loaded:', data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  },
  change: async function(index) {
    // Load image metadata
    const metadata = await loadImageMetadata(index);
    console.log('Metadata for image', index, ':', metadata);
  }
});
```
