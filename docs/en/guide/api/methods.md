---
title: Methods
---

# Methods

Methods available in the ImagesViewer class.

## Navigation Methods

### `next()`

Loads the next image.

**Returns:** `void`

```javascript
// Go to next image
viewer.next();
```

### `prev()`

Loads the previous image.

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
- `degrees`: Rotation angle (positive for clockwise, negative for counter-clockwise)

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

### `showOriginalSize()`

Displays the current image at its original size.

**Returns:** `void`

## View Control Methods

### `toggleFullscreen()`

Toggles fullscreen mode.

**Returns:** `void`

### `toggleImageInfo()`

Toggles the image information panel.

**Returns:** `void`

### `close()`

Closes the viewer and cleans up resources.

**Returns:** `void`

## Utility Methods

### `downloadImage()`

Downloads the current image.

**Returns:** `void`

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
