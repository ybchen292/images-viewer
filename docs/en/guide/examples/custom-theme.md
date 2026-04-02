---
title: Custom Theme
---

# Custom Theme

This example demonstrates how to customize the appearance of ImagesViewer with a custom theme.

## Basic Theme Customization

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  theme: {
    // Background
    viewerBgColor: 'rgba(0, 0, 0, 0.9)',
    
    // Toolbar
    toolbarBgColor: 'rgba(30, 30, 30, 0.8)',
    toolbarBorderRadius: '8px',
    toolbarPadding: '10px 15px',
    
    // Buttons
    buttonBgColor: 'rgba(50, 50, 50, 0.7)',
    buttonHoverBg: 'rgba(80, 80, 80, 0.7)',
    buttonSize: '45px',
    buttonFontSize: '20px',
    
    // Text
    textColor: 'rgba(255, 255, 255, 0.9)',
    activeColor: 'rgba(100, 150, 255, 0.8)'
  }
});
```

## Complete Theme Example

```html
<!DOCTYPE html>
<html>
  <head>
    <title>ImagesViewer Custom Theme Example</title>
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
      .theme-option {
        margin: 15px 0;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      .theme-option h3 {
        margin-top: 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>ImagesViewer Custom Theme Example</h1>
      
      <div class="theme-option">
        <h3>Dark Theme</h3>
        <button class="button" onclick="openDarkTheme()">Open Dark Theme</button>
      </div>
      
      <div class="theme-option">
        <h3>Light Theme</h3>
        <button class="button" onclick="openLightTheme()">Open Light Theme</button>
      </div>
      
      <div class="theme-option">
        <h3>Colorful Theme</h3>
        <button class="button" onclick="openColorfulTheme()">Open Colorful Theme</button>
      </div>
      
      <div class="theme-option">
        <h3>Minimal Theme</h3>
        <button class="button" onclick="openMinimalTheme()">Open Minimal Theme</button>
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

      function openDarkTheme() {
        new ImagesViewer({
          images: images,
          theme: {
            viewerBgColor: 'rgba(0, 0, 0, 0.95)',
            toolbarBgColor: 'rgba(30, 30, 30, 0.9)',
            buttonBgColor: 'rgba(50, 50, 50, 0.8)',
            buttonHoverBg: 'rgba(80, 80, 80, 0.8)',
            textColor: 'rgba(255, 255, 255, 0.9)',
            activeColor: 'rgba(100, 150, 255, 0.8)',
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        });
      }

      function openLightTheme() {
        new ImagesViewer({
          images: images,
          theme: {
            viewerBgColor: 'rgba(255, 255, 255, 0.95)',
            toolbarBgColor: 'rgba(240, 240, 240, 0.9)',
            buttonBgColor: 'rgba(220, 220, 220, 0.8)',
            buttonHoverBg: 'rgba(200, 200, 200, 0.8)',
            textColor: 'rgba(0, 0, 0, 0.9)',
            activeColor: 'rgba(0, 100, 255, 0.8)',
            shadowColor: 'rgba(0, 0, 0, 0.1)'
          }
        });
      }

      function openColorfulTheme() {
        new ImagesViewer({
          images: images,
          theme: {
            viewerBgColor: 'rgba(10, 20, 30, 0.95)',
            toolbarBgColor: 'rgba(20, 30, 40, 0.9)',
            buttonBgColor: 'rgba(40, 60, 80, 0.8)',
            buttonHoverBg: 'rgba(60, 80, 100, 0.8)',
            textColor: 'rgba(255, 255, 255, 0.9)',
            activeColor: 'rgba(255, 100, 150, 0.8)',
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        });
      }

      function openMinimalTheme() {
        new ImagesViewer({
          images: images,
          theme: {
            viewerBgColor: 'rgba(0, 0, 0, 0.95)',
            toolbarBgColor: 'rgba(0, 0, 0, 0.7)',
            buttonBgColor: 'transparent',
            buttonHoverBg: 'rgba(255, 255, 255, 0.1)',
            buttonSize: '36px',
            buttonFontSize: '18px',
            textColor: 'rgba(255, 255, 255, 0.9)',
            activeColor: 'rgba(255, 255, 255, 0.9)',
            shadowColor: 'rgba(0, 0, 0, 0.2)'
          }
        });
      }
    </script>
  </body>
</html>
```

## Thumbnail Customization

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  buttons: {
    thumbnails: true
  },
  theme: {
    // Thumbnail settings
    thumbItemWidth: '100px',
    thumbItemHeight: '60px',
    thumbGap: '15px',
    thumbPadding: '20px',
    thumbMaxWidth: '80%',
    
    // Other theme settings
    viewerBgColor: 'rgba(0, 0, 0, 0.9)',
    toolbarBgColor: 'rgba(30, 30, 30, 0.8)'
  }
});
```

## Advanced Theme Customization

### Custom Button Sizes

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  theme: {
    // Toolbar buttons
    buttonSize: '45px',
    buttonFontSize: '20px',
    
    // Navigation buttons
    navButtonSize: '60px',
    navButtonFontSize: '24px',
    
    // Top close button
    topCloseBtnSize: '55px',
    topCloseBtnFontSize: '28px'
  }
});
```

### Custom Positioning

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg'],
  theme: {
    // Toolbar position
    toolbarBottom: '30px',
    
    // Info panel position
    infoTop: '80px',
    infoLeft: '30px',
    
    // Zoom indicator position
    zoomIndicatorTop: '30px',
    zoomIndicatorLeft: '30px',
    
    // Top close button position
    topCloseBtnTop: '30px',
    topCloseBtnRight: '30px'
  }
});
```

## CSS Customization

You can also use custom CSS to further customize the appearance:

```css
/* Custom CSS for ImagesViewer */
.images-viewer-container {
  /* Custom container styles */
}

.images-viewer-toolbar {
  /* Custom toolbar styles */
}

.images-viewer-tool-btn {
  /* Custom button styles */
}

.images-viewer-thumb-item {
  /* Custom thumbnail styles */
  transition: all 0.3s ease;
}

.images-viewer-thumb-item:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(100, 150, 255, 0.5);
}

.images-viewer-thumb-item.active {
  border: 2px solid #6496ff;
}
```

## Responsive Theme

You can create responsive themes that adapt to different screen sizes:

```javascript
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
  theme: {
    // Base styles
    buttonSize: '40px',
    navButtonSize: '50px',
    thumbItemWidth: '70px',
    thumbItemHeight: '45px',
    
    // These will be adjusted by the viewer for responsive behavior
  }
});
```

## Best Practices

### Theme Consistency

- Keep your theme consistent with your overall website design
- Use colors that complement your content
- Ensure text is readable against the background

### Performance Considerations

- Avoid overly complex animations
- Use rgba colors with appropriate alpha values
- Test your theme on different devices

### Accessibility

- Ensure sufficient contrast between text and background
- Make sure interactive elements are easily identifiable
- Test with screen readers if possible
