---
title: Getting Started
---

# Getting Started

Welcome to the ImagesViewer documentation! This guide will help you get started with ImagesViewer quickly and easily.

## What is ImagesViewer?

ImagesViewer is a feature-rich, responsive image viewer built with vanilla JavaScript. It provides a comprehensive set of tools for viewing and interacting with images, including:

- 🖼️ Multiple image viewing
- 🔍 Zoom and rotation
- 📱 Touch support for mobile devices
- 🎨 Theme customization
- 🌍 Internationalization support
- ⌨️ Keyboard shortcuts
- 🔄 Thumbnail navigation
- 💾 Download functionality
- 🖥️ Fullscreen mode
- 📦 Cache management
- ⚡ Performance optimization

## Why Choose ImagesViewer?

- **Framework-agnostic**: Works with any JavaScript framework or no framework at all
- **Lightweight**: Minimal bundle size
- **Highly customizable**: Extensive configuration options
- **Performance optimized**: Intelligent caching and lazy loading
- **Responsive**: Adapts to any screen size
- **Well-documented**: Comprehensive API documentation

## Quick Start

### Installation

You can install ImagesViewer using npm or directly include it in your HTML:

**NPM:**

```bash
npm install images-viewer-js
```

**Direct Include:**

```html
<script src="https://cdn.jsdelivr.net/npm/images-viewer-js@latest/dist/index.js"></script>
```

### Basic Usage

```javascript
// Single image
const viewer1 = new ImagesViewer('single-image.jpg');

// Multiple images
const viewer2 = new ImagesViewer({
  images: ['img1.jpg', 'img2.jpg', 'img3.jpg']
});

// Array format
const viewer3 = new ImagesViewer(['img1.jpg', 'img2.jpg']);
```