# Images Viewer

A feature-rich, responsive image viewer supporting zoom, rotation, navigation, and more. Built with vanilla JavaScript, framework-agnostic.

[中文](./README.md) | [Gitee](https://gitee.com/ybchen292/images-viewer) | [GitHub](https://github.com/ybchen292/images-viewer)

#### [Live Demo](https://ybchen292.github.io/images-viewer/)

## Features

- 🖼️ **Multiple Images Support** - Single or multiple images viewing
- 🔍 **Zoom Operations** - Mouse wheel, button, and double-click zoom
- 🔄 **Rotation** - Left and right image rotation
- 📱 **Touch Support** - Mobile gesture controls
- 🎨 **Theme Customization** - Customizable colors, styles, and buttons
- ⌨️ **Keyboard Shortcuts** - Rich keyboard operation support
- 📱 **Responsive Design** - Adapts to desktop and mobile devices
- 🔄 **Thumbnail Navigation** - Quick image switching
- 💾 **Download Functionality** - Image download support
- 🖥️ **Fullscreen Mode** - Fullscreen image viewing

## Installation and Usage

### Simple Usage

```javascript
// Single image
const viewer1 = new ImagesViewer('single-image.jpg');

// Multiple images
const viewer2 = new ImagesViewer({
  images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
});

// Array format
const viewer3 = new ImagesViewer(['img1.jpg', 'img2.jpg']);
```

### npm

```html
<!-- Install package -->
npm install images-viewer-js

<!-- Vue environment -->
<script>
  import ImagesViewer from 'images-viewer-js';
  // Usage
  const viewer = new ImagesViewer({
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  });
</script>
```

### Browser Environment

```html
<!-- Import script -->
<script src="images-viewer.js"></script>

<script>
  // Use global variable ImagesViewer
  const viewer = new ImagesViewer({
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  });
</script>
```

### CommonJS/Node.js

```javascript
const ImagesViewer = require('./images-viewer-js');

const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
});
```

### AMD

```javascript
define(['images-viewer-js'], function (ImagesViewer) {
  const viewer = new ImagesViewer({
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  });
});
```

## Configuration Options

### Basic Configuration

```javascript
const viewer = new ImagesViewer({
  // Image array (required)
  images: ['image1.jpg', 'image2.jpg'],

  // Close on mask click
  closeOnMaskClick: false,

  // Zoom range
  minScale: 0.1,
  maxScale: 5,

  // Loop through images
  loop: true,

  // Button configuration
  buttons: {
    zoomIn: true, // Zoom in
    zoomOut: true, // Zoom out
    rotateLeft: true, // Rotate left
    rotateRight: true, // Rotate right
    reset: true, // Reset
    download: true, // Download
    fullscreen: true, // Fullscreen
    prev: true, // Previous
    next: true, // Next
    close: true, // Close
    topClose: true, // Top-right close
    thumbnails: true, // Thumbnails
    info: true, // Info panel
    originalSize: true, // Original size
  },

  // Custom buttons
  customButtons: [
    ['🔍', function() { console.log('Custom button clicked'); }]
  ],

  // Event callbacks
  show: function(container) {
    console.log('Viewer shown');
  },

  close: function() {
    console.log('Viewer closed');
  },

  change: function(currentIndex, direction) {
    console.log('Image changed:', currentIndex, direction);
  }

  // Image information display
  imageInfo: {
    visible: false, // Show info by default
    showName: true, // Show filename
    showDimensions: true, // Show dimensions
  },

  // Theme configuration
  theme: {
    // Background related
    viewerBgColor: 'rgba(0, 0, 0, 0.4)',

    // Toolbar related
    toolbarBgColor: 'rgba(150, 150, 150, 0.7)',
    toolbarBorderRadius: '30px',
    toolbarPadding: '8px 12px',
    toolbarBottom: '20px',

    // Button related (semi-transparent medium gray)
    buttonBgColor: 'rgba(150, 150, 150, 0.7)',
    buttonHoverBg: 'rgba(200, 200, 200, 0.4)',
    buttonSize: '40px',
    buttonFontSize: '20px',
    buttonBorderRadius: '50%',

    // Navigation button related (semi-transparent medium gray)
    navButtonBgColor: 'rgba(150, 150, 150, 0.7)',
    navButtonHoverBg: 'rgba(200, 200, 200, 0.4)',
    navButtonSize: '50px',
    navButtonFontSize: '20px',
    navButtonBorderRadius: '50%',

    // Top-right close button
    topCloseBtnSize: '50px',
    topCloseBtnTop: '20px',
    topCloseBtnRight: '20px',
    topCloseBtnFontSize: '24px',
    topCloseBtnBgColor: 'rgba(150, 150, 150, 0.7)',
    topCloseBtnHoverBg: 'rgba(200, 200, 200, 0.4)',

    // Info bar related (semi-transparent light gray)
    infoBgColor: 'rgba(150, 150, 150, 0.7)',
    infoBorderRadius: '12px',
    infoPadding: '10px 15px',
    infoFontSize: '13px',
    infoTop: '70px',
    infoLeft: '20px',

    // Zoom indicator
    zoomIndicatorBg: 'rgba(150, 150, 150, 0.7)',
    zoomIndicatorBorderRadius: '18px',
    zoomIndicatorPadding: '6px 12px',
    zoomIndicatorFontSize: '14px',
    zoomIndicatorTop: '20px',
    zoomIndicatorLeft: '20px',

    // General
    activeColor: 'rgba(100, 150, 255, 0.8)',
    textColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    transitionSpeed: '0.3s',
  },
});
```

## Methods

### Image Navigation

```javascript
// Next image
viewer.next();

// Previous image
viewer.prev();

// Jump to specific index
viewer.loadCurrentImage(2);
```

### Transform Operations

```javascript
// Zoom
viewer.zoom(0.1); // Zoom in 10%
viewer.zoom(-0.1); // Zoom out 10%

// Rotate
viewer.rotate(90); // Rotate 90 degrees clockwise
viewer.rotate(-90); // Rotate 90 degrees counter-clockwise

// Reset transform
viewer.reset();

// Show original size
viewer.showOriginalSize();
```

### View Control

```javascript
// Toggle fullscreen
viewer.toggleFullscreen();

// Show/hide image info
viewer.toggleImageInfo();

// Close viewer
viewer.close();
```

### Download

```javascript
// Download current image
viewer.downloadImage();
```

## Keyboard Shortcuts

| Shortcut | Function                    |
| -------- | --------------------------- |
| `ESC`    | Close viewer                |
| `←`      | Previous image              |
| `→`      | Next image                  |
| `↑` `+`  | Zoom in                     |
| `↓` `-`  | Zoom out                    |
| `0`      | Reset transform             |
| `F`      | Toggle fullscreen           |
| `I`      | Show/hide info panel        |

## Mouse/Touch Operations

### Mouse Operations

- **Drag**: Hold left mouse button to drag image
- **Zoom**: Mouse wheel
- **Double-click**: Toggle zoom state

### Touch Operations

- **Single-finger drag**: Move image
- **Two-finger pinch**: Zoom image
- **Double-tap**: Toggle zoom state

## Responsive Design

The viewer automatically adapts to different screen sizes:

- **Desktop**: Full toolbar and features
- **Tablet**: Appropriately scaled buttons and spacing
- **Mobile**: Compact layout optimized for touch

## Examples

### Basic Example

```html
<!DOCTYPE html>
<html>
  <head>
    <title>ImagesViewer Example</title>
  </head>
  <body>
    <button onclick="openViewer()">View Images</button>

    <script src="images-viewer.js"></script>
    <script>
      function openViewer() {
        const viewer = new ImagesViewer({
          images: [
            'https://example.com/image1.jpg',
            'https://example.com/image2.jpg',
            'https://example.com/image3.jpg',
          ],
          closeOnMaskClick: true,
          imageInfo: {
            visible: true,
          },
        });
      }
    </script>
  </body>
</html>
```

### Advanced Customization Example

```javascript
const viewer = new ImagesViewer({
  images: imageArray,
  buttons: {
    download: false, // Disable download
  },
  imageInfo: {
    visible: true,
  },
  theme: {
    viewerBgColor: 'rgba(0, 0, 0, 0.6)',
    toolbarBgColor: 'rgba(30, 30, 30, 0.8)',
  },
  // Custom buttons
  customButtons: [
    [
      '🔍',
      () => {
        console.log('🔍');
        viewer.loadCurrentImage(1);
      },
    ],
  ],
  change: (index, direction) => {
    // direction: 'prev' | 'next'
    console.log(index, direction);
  },
  show: dom => {
    // Custom button
    const toolbar = dom.querySelector('.images-viewer-toolbar');
    const button = document.createElement('button');
    button.className = 'images-viewer-tool-btn';

    const iconSpan = document.createElement('span');
    iconSpan.textContent = 'test';
    button.appendChild(iconSpan);

    button.addEventListener('click', e => {
      console.log('test');
      // e.stopPropagation();
    });
    toolbar.appendChild(button);
    console.log('show', dom);
  },
  close: () => {
    console.log('close');
  },
});
```

## License

MIT License
