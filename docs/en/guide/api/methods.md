---
title: Methods
---

# Methods

This page documents all methods available in the ImagesViewer class.

## Navigation Methods

### `next()`

Loads the next image in the sequence.

**Returns:** `void`

```javascript
// Go to next image
viewer.next();
```

### `prev()`

Loads the previous image in the sequence.

**Returns:** `void`

```javascript
// Go to previous image
viewer.prev();
```

### `loadCurrentImage(index?: number)`

Loads the image at the specified index.

**Parameters:**
- `index` (optional): The index of the image to load

**Returns:** `void`

```javascript
// Load specific image
viewer.loadCurrentImage(2); // Loads the 3rd image (0-indexed)

// Reload current image
viewer.loadCurrentImage();
```

## Transform Methods

### `zoom(delta: number)`

Zooms the current image by the specified delta.

**Parameters:**
- `delta`: Zoom change amount (positive for zoom in, negative for zoom out)

**Returns:** `void`

```javascript
// Zoom in by 10%
viewer.zoom(0.1);

// Zoom out by 10%
viewer.zoom(-0.1);
```

### `rotate(degrees: number)`

Rotates the current image by the specified degrees.

**Parameters:**
- `degrees`: Rotation angle in degrees (positive for clockwise, negative for counter-clockwise)

**Returns:** `void`

```javascript
// Rotate 90 degrees clockwise
viewer.rotate(90);

// Rotate 90 degrees counter-clockwise
viewer.rotate(-90);
```

### `reset()`

Resets the current image to its original state (zoom, rotation, position).

**Returns:** `void`

```javascript
// Reset image transform
viewer.reset();
```

### `showOriginalSize()`

Displays the current image at its original size.

**Returns:** `void`

```javascript
// Show original size
viewer.showOriginalSize();
```

## View Control Methods

### `toggleFullscreen()`

Toggles fullscreen mode.

**Returns:** `void`

```javascript
// Toggle fullscreen
viewer.toggleFullscreen();
```

### `toggleImageInfo()`

Toggles the image information panel.

**Returns:** `void`

```javascript
// Toggle image info
viewer.toggleImageInfo();
```

### `close()`

Closes the viewer and cleans up resources.

**Returns:** `void`

```javascript
// Close viewer
viewer.close();
```

## Utility Methods

### `downloadImage()`

Downloads the current image.

**Returns:** `void`

```javascript
// Download current image
viewer.downloadImage();
```

## Usage Examples

### Basic Navigation

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg']
});

// Navigation
document.getElementById('next-btn').addEventListener('click', () => {
  viewer.next();
});

document.getElementById('prev-btn').addEventListener('click', () => {
  viewer.prev();
});

document.getElementById('go-to-2').addEventListener('click', () => {
  viewer.loadCurrentImage(2);
});
```

### Transform Controls

```javascript
const viewer = new ImagesViewer({
  images: ['image.jpg']
});

// Transform controls
document.getElementById('zoom-in').addEventListener('click', () => {
  viewer.zoom(0.1);
});

document.getElementById('zoom-out').addEventListener('click', () => {
  viewer.zoom(-0.1);
});

document.getElementById('rotate-left').addEventListener('click', () => {
  viewer.rotate(-90);
});

document.getElementById('rotate-right').addEventListener('click', () => {
  viewer.rotate(90);
});

document.getElementById('reset').addEventListener('click', () => {
  viewer.reset();
});
```

### Programmatic Control

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  show: function() {
    // Auto-navigate through images
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % 3;
      viewer.loadCurrentImage(currentIndex);
    }, 3000);

    // Clear interval when viewer closes
    setTimeout(() => {
      clearInterval(interval);
      viewer.close();
    }, 15000);
  }
});
```
