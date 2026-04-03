---
title: Basic Usage
---

# Basic Usage

This guide will walk you through the basic usage of ImagesViewer, including how to create an instance, navigate between images, and use the core features.

## Creating an Instance

There are multiple ways to create an ImagesViewer instance:

### Single Image

```javascript
// Single image URL
const viewer = new ImagesViewer('path/to/image.jpg');
```

### Multiple Images

```javascript
// Multiple images as an array
const viewer = new ImagesViewer(['image1.jpg', 'image2.jpg', 'image3.jpg']);

// Multiple images with options
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg']
});
```

### With Configuration

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  closeOnMaskClick: true,
  loop: true,
  buttons: {
    zoomIn: true,
    zoomOut: true,
    download: true
  }
});
```

## Basic Navigation

### Next/Previous Images

```javascript
// Go to next image
viewer.next();

// Go to previous image
viewer.prev();

// Jump to specific image
viewer.loadCurrentImage(2); // Loads the 3rd image (0-indexed)
```

### Keyboard Navigation

ImagesViewer supports keyboard shortcuts for navigation:

| Shortcut | Action |
| -------- | ------ |
| `←` | Previous image |
| `→` | Next image |
| `Esc` | Close viewer |
| `↑` or `+` | Zoom in |
| `↓` or `-` | Zoom out |
| `0` | Reset zoom |
| `F` | Toggle fullscreen |
| `I` | Toggle info panel |

## Zoom and Rotation

### Zooming

```javascript
// Zoom in by 10%
viewer.zoom(0.1);

// Zoom out by 10%
viewer.zoom(-0.1);

// Reset zoom
viewer.reset();

// Show original size
viewer.showOriginalSize();
```

### Rotation

```javascript
// Rotate 90 degrees clockwise
viewer.rotate(90);

// Rotate 90 degrees counter-clockwise
viewer.rotate(-90);
```

## Fullscreen Mode

```javascript
// Toggle fullscreen
viewer.toggleFullscreen();
```

## Downloading Images

```javascript
// Download current image
viewer.downloadImage();
```

## Closing the Viewer

```javascript
// Close the viewer
viewer.close();
```

## Event Callbacks

You can listen to various events using callbacks:

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  onShow: function(container) {
    console.log('Viewer shown:', container);
  },
  onClose: function() {
    console.log('Viewer closed');
  },
  onChange: function(currentIndex, direction) {
    console.log('Image changed:', currentIndex, direction);
  }
});
```

## Mouse and Touch Operations

### Mouse Operations

- **Drag**: Hold left mouse button to drag the image
- **Zoom**: Use mouse wheel to zoom in/out
- **Double-click**: Toggle zoom state

### Touch Operations

- **Single-finger drag**: Move the image
- **Two-finger pinch**: Zoom in/out
- **Double-tap**: Toggle zoom state

## Basic Example

Here's a complete example of using ImagesViewer:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>ImagesViewer Example</title>
  </head>
  <body>
    <button onclick="openViewer()">View Images</button>

    <script src="https://cdn.jsdelivr.net/npm/images-viewer-js@latest/dist/index.js"></script>
    <script>
      function openViewer() {
        const viewer = new ImagesViewer({
          images: [
            'https://example.com/image1.jpg',
            'https://example.com/image2.jpg',
            'https://example.com/image3.jpg'
          ],
          closeOnMaskClick: true,
          imageInfo: {
            visible: true
          },
          buttons: {
            zoomIn: true,
            zoomOut: true,
            download: true,
            fullscreen: true
          }
        });
      }
    </script>
  </body>
</html>
```