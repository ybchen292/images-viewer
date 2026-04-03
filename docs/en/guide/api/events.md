---
title: Events
---

# Events

ImagesViewer's event callback system.

## Event Callbacks

### `onShow`

**Type:** `(container: HTMLElement) => void`

Triggered when the viewer is shown.

**Parameters:**
- `container`: The main viewer container element

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  onShow: function(container) {
    console.log('Viewer shown:', container);
    
    // Add custom elements
    const customElement = document.createElement('div');
    customElement.textContent = 'Welcome!';
    customElement.style.cssText = 'color: white; position: absolute; top: 10px; left: 50%; transform: translateX(-50%);';
    container.appendChild(customElement);
  }
});
```

### `onClose`

**Type:** `() => void`

Triggered when the viewer is closed.

### `onChange`

**Type:** `(currentIndex: number, direction: 'prev' | 'next') => void`

Triggered when the image is changed.

**Parameters:**
- `currentIndex`: The index of the newly displayed image
- `direction`: The direction of navigation (`'prev'` or `'next'`)

### `onRotate`

**Type:** `(data: RotateEventData) => void`

Triggered when the image is rotated.

### `onDrag`

**Type:** `(data: DragEventData) => void`

Triggered when the image is dragged.

### `onZoom`

**Type:** `(data: ZoomEventData) => void`

Triggered when the image is zoomed.

## Event Flow

1. **Viewer initialization** - `new ImagesViewer()`
2. **Viewer shown** - `onShow` triggered
3. **Image operations** - `onChange`、`onRotate`、`onDrag`、`onZoom` triggered
4. **Viewer closed** - `onClose` triggered

## Usage Examples

### Tracking User Interactions

```javascript
const viewer = new ImagesViewer({
  images: productImages,
  onShow: function() {
    console.log('Product gallery opened');
    analytics.track('gallery_opened');
  },
  onClose: function() {
    console.log('Product gallery closed');
    analytics.track('gallery_closed');
  },
  onChange: function(index, direction) {
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

### Asynchronous Operations

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  onShow: async function() {
    try {
      // Load additional data
      const data = await fetchImageData();
      console.log('Image data loaded:', data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }
});
```

## Best Practices

- **Event Handler Cleanup**: Clean up event listeners added in callbacks to avoid memory leaks
- **Asynchronous Operations**: Event callbacks support async operations for loading additional data
- **Performance Optimization**: Avoid heavy computations in event callbacks to maintain responsiveness
