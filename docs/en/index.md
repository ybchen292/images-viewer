---
title: ImagesViewer
layout: home

hero:
  name: "ImagesViewer"
  text: "A feature-rich image viewer"
  tagline: Responsive, customizable, and framework-agnostic
  actions:
    - theme: brand
      text: Get Started
      link: /en/guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com/ybchen292/images-viewer

features:
  - icon: 🖼️
    title: Multiple Images Support
    details: View single or multiple images with ease
  - icon: 🔍
    title: Zoom & Rotation
    details: Intuitive zooming and rotation controls
  - icon: 📱
    title: Touch Support
    details: Mobile-friendly gesture controls
  - icon: 🎨
    title: Theme Customization
    details: Fully customizable appearance
  - icon: 🌍
    title: Internationalization
    details: Multilingual interface support
  - icon: ⚡
    title: Performance Optimized
    details: Lazy loading and intelligent caching
---

## What is ImagesViewer?

ImagesViewer is a powerful, lightweight image viewer built with vanilla JavaScript. It provides a rich set of features for viewing and interacting with images, including zooming, rotation, navigation, and more. 

### Key Benefits

- **Framework-agnostic**: Works with any JavaScript framework or no framework at all
- **Responsive**: Adapts to any screen size
- **Highly customizable**: Extensive configuration options
- **Performance optimized**: Intelligent caching and lazy loading
- **Feature-rich**: Comprehensive set of image viewing tools

### Get Started in Minutes

```javascript
// Simple usage
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg']
});

// Advanced configuration
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg'],
  theme: {
    viewerBgColor: 'rgba(0, 0, 0, 0.8)'
  },
  i18n: {
    info: {
      name: 'Name:',
      dimensions: 'Size:'
    }
  }
});
```

## Browser Support

ImagesViewer works on all modern browsers, including:

- Chrome
- Firefox
- Safari
- Edge
- Opera

## License

MIT License