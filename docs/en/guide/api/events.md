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

**Type:** `(data: ChangeEventData) => void`

Triggered when the image is changed.

**Parameters:**
- `data.index`: The index of the newly displayed image
- `data.oldIndex`: The index of the previously displayed image
- `data.direction`: The direction of navigation (`'prev'` or `'next'`)
- `data.data`: The current image data (string or ImageObject)
- `data.img`: Reference to the current image element
- `data.dom`: Reference to the main viewer container element

### `onRotate`

**Type:** `(data: RotateEventData) => void`

Triggered when the image is rotated.

### `onDrag`

**Type:** `(data: DragEventData) => void`

Triggered when the image is dragged.

### `onZoom`

**Type:** `(data: ZoomEventData) => void`

Triggered when the image is zoomed.

### `onImageError`

**Type:** `(data: ErrorCallbackParams) => void | string`

Triggered when an image fails to load.

**Parameters:**
- `data.data`: Current image data
- `data.index`: Current image index
- `data.url`: The URL of the failed image
- `data.img`: The corresponding image DOM element

**Returns:** Returning a string updates the image's alt attribute

### `onThumbnailError`

**Type:** `(data: ErrorCallbackParams) => void | string`

Triggered when a thumbnail fails to load.

**Parameters:**
- `data.data`: Current image data
- `data.index`: Current image index
- `data.url`: The URL of the failed thumbnail
- `data.img`: The corresponding thumbnail DOM element

**Returns:** Returning a string updates the thumbnail's alt attribute

## Event Flow

1. **Viewer initialization** - `new ImagesViewer()`
2. **Viewer shown** - `onShow` triggered
3. **Image operations** - `onChange`, `onRotate`, `onDrag`, `onZoom` triggered
4. **Image load failure** - `onImageError` / `onThumbnailError` triggered
5. **Viewer closed** - `onClose` triggered

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
  onChange: function(data) {
    console.log(`Viewing product ${data.index + 1}`);
    analytics.track('product_view', {
      productId: productIds[data.index],
      position: data.index + 1,
      total: productImages.length,
      direction: data.direction 
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
