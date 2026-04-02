---
title: Basic Example
---

# Basic Example

This example demonstrates the basic usage of ImagesViewer with minimal configuration.

## Simple Usage

### Single Image

```javascript
// Single image URL
const viewer = new ImagesViewer('path/to/image.jpg');
```

### Multiple Images

```javascript
// Multiple images as an array
const viewer = new ImagesViewer(['image1.jpg', 'image2.jpg', 'image3.jpg']);
```

### With Basic Options

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  closeOnMaskClick: true,
  loop: true
});
```

## Complete HTML Example

```html
<!DOCTYPE html>
<html>
  <head>
    <title>ImagesViewer Basic Example</title>
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
      .gallery {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 20px 0;
      }
      .gallery img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        cursor: pointer;
        border-radius: 4px;
        transition: transform 0.2s;
      }
      .gallery img:hover {
        transform: scale(1.05);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>ImagesViewer Basic Example</h1>
      
      <h2>Single Image</h2>
      <button class="button" onclick="openSingleImage()">View Single Image</button>
      
      <h2>Multiple Images</h2>
      <button class="button" onclick="openMultipleImages()">View Multiple Images</button>
      
      <h2>Gallery</h2>
      <div class="gallery">
        <img src="https://picsum.photos/200/300?random=1" onclick="openGallery(0)" alt="Image 1">
        <img src="https://picsum.photos/200/300?random=2" onclick="openGallery(1)" alt="Image 2">
        <img src="https://picsum.photos/200/300?random=3" onclick="openGallery(2)" alt="Image 3">
        <img src="https://picsum.photos/200/300?random=4" onclick="openGallery(3)" alt="Image 4">
        <img src="https://picsum.photos/200/300?random=5" onclick="openGallery(4)" alt="Image 5">
      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/images-viewer-js@latest/dist/index.js"></script>
    <script>
      // Sample images
      const images = [
        'https://picsum.photos/800/1200?random=1',
        'https://picsum.photos/800/1200?random=2',
        'https://picsum.photos/800/1200?random=3',
        'https://picsum.photos/800/1200?random=4',
        'https://picsum.photos/800/1200?random=5'
      ];

      function openSingleImage() {
        new ImagesViewer(images[0]);
      }

      function openMultipleImages() {
        new ImagesViewer({
          images: images,
          closeOnMaskClick: true,
          loop: true,
          buttons: {
            zoomIn: true,
            zoomOut: true,
            download: true,
            fullscreen: true
          }
        });
      }

      function openGallery(index) {
        new ImagesViewer({
          images: images,
          closeOnMaskClick: true,
          loop: true,
          buttons: {
            zoomIn: true,
            zoomOut: true,
            download: true,
            fullscreen: true,
            thumbnails: true
          },
          imageInfo: {
            visible: true
          }
        });
      }
    </script>
  </body>
</html>
```

## Usage with Frameworks

### Vue.js Example

```vue
<template>
  <div>
    <h1>ImagesViewer in Vue</h1>
    <button @click="openViewer">View Images</button>
    <div class="gallery">
      <img 
        v-for="(image, index) in images" 
        :key="index"
        :src="image.thumbnail"
        @click="openViewer(index)"
        alt="Image"
      >
    </div>
  </div>
</template>

<script>
import ImagesViewer from 'images-viewer-js';

export default {
  data() {
    return {
      images: [
        {
          thumbnail: 'https://picsum.photos/200/300?random=1',
          full: 'https://picsum.photos/800/1200?random=1'
        },
        {
          thumbnail: 'https://picsum.photos/200/300?random=2',
          full: 'https://picsum.photos/800/1200?random=2'
        },
        {
          thumbnail: 'https://picsum.photos/200/300?random=3',
          full: 'https://picsum.photos/800/1200?random=3'
        }
      ]
    };
  },
  methods: {
    openViewer(startIndex = 0) {
      const fullImages = this.images.map(img => img.full);
      const viewer = new ImagesViewer({
        images: fullImages,
        closeOnMaskClick: true,
        loop: true
      });
      
      // Jump to the clicked image
      if (startIndex > 0) {
        setTimeout(() => {
          viewer.loadCurrentImage(startIndex);
        }, 100);
      }
    }
  }
};
</script>

<style scoped>
.gallery {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.gallery img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 4px;
}
</style>
```

### React Example

```jsx
import React from 'react';
import ImagesViewer from 'images-viewer-js';

function ImageGallery() {
  const images = [
    'https://picsum.photos/800/1200?random=1',
    'https://picsum.photos/800/1200?random=2',
    'https://picsum.photos/800/1200?random=3'
  ];

  const openViewer = (startIndex = 0) => {
    const viewer = new ImagesViewer({
      images: images,
      closeOnMaskClick: true,
      loop: true
    });

    if (startIndex > 0) {
      setTimeout(() => {
        viewer.loadCurrentImage(startIndex);
      }, 100);
    }
  };

  return (
    <div>
      <h1>ImagesViewer in React</h1>
      <button onClick={() => openViewer()}>View All Images</button>
      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
            onClick={() => openViewer(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
```

## Key Features Demonstrated

- **Basic initialization** - Creating a simple ImagesViewer instance
- **Multiple images** - Viewing multiple images in a gallery
- **Navigation** - Using next/previous buttons and keyboard shortcuts
- **Zoom** - Using mouse wheel and zoom buttons
- **Fullscreen** - Toggling fullscreen mode
- **Download** - Downloading images
- **Image info** - Displaying image information
- **Thumbnails** - Using thumbnail navigation
