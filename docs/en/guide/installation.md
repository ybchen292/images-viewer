---
title: Installation
---

# Installation

This guide will walk you through the different ways to install and set up ImagesViewer in your project.

## NPM Installation

The recommended way to install ImagesViewer is through npm:

```bash
npm install images-viewer-js
```

### Usage with ES Modules

```javascript
import ImagesViewer from 'images-viewer-js';

// Create a new instance
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg']
});
```

### Usage with CommonJS

```javascript
const ImagesViewer = require('images-viewer-js');

// Create a new instance
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg']
});
```

## Direct Include via CDN

You can also include ImagesViewer directly in your HTML using a CDN:

```html
<!-- Include ImagesViewer from CDN -->
<script src="https://cdn.jsdelivr.net/npm/images-viewer-js@latest/dist/index.js"></script>

<script>
  // Create a new instance
  const viewer = new ImagesViewer({
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg']
  });
</script>
```

## Manual Download

If you prefer to host the files yourself, you can download the latest version from GitHub:

1. Go to the [GitHub repository](https://github.com/ybchen292/images-viewer)
2. Download the latest release
3. Extract the files
4. Include the `dist/index.js` file in your project:

```html
<script src="path/to/images-viewer/dist/index.js"></script>

<script>
  const viewer = new ImagesViewer({
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg']
  });
</script>
```

## TypeScript Support

ImagesViewer includes TypeScript type definitions. When using TypeScript, you can import the types:

```typescript
import ImagesViewer, { ImagesViewerOptions } from 'images-viewer-js';

const options: ImagesViewerOptions = {
  images: ['image1.jpg', 'image2.jpg'],
  closeOnMaskClick: true
};

const viewer = new ImagesViewer(options);
```

## Development Setup

If you want to contribute to ImagesViewer or run it locally for development:

1. Clone the repository:
   ```bash
   git clone https://github.com/ybchen292/images-viewer.git
   ```

2. Install dependencies:
   ```bash
   cd images-viewer
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Run the example:
   ```bash
   npm run dev
   ```

## Browser Compatibility

ImagesViewer works on all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Troubleshooting

### Common Installation Issues

1. **Module not found error**
   - Ensure you've installed the package correctly: `npm install images-viewer-js`
   - Check your import statement

2. **TypeScript errors**
   - Make sure you're using the correct types
   - Check that your TypeScript version is compatible

3. **CDN not loading**
   - Verify your internet connection
   - Check the CDN URL is correct
   - Try a different CDN provider

If you encounter any other issues, please [open an issue](https://github.com/ybchen292/images-viewer/issues) on GitHub.