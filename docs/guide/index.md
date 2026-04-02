---
title: 快速开始
---

# 快速开始

欢迎使用 ImagesViewer 文档！本指南将帮助您快速上手 ImagesViewer。

## 什么是 ImagesViewer？

ImagesViewer 是一个功能丰富、响应式的图片查看器，使用原生 JavaScript 构建。它提供了全面的工具集，用于查看和交互图片，包括：

- 🖼️ 多图片查看
- 🔍 缩放和旋转
- 📱 移动设备触摸支持
- 🎨 主题定制
- 🌍 国际化支持
- ⌨️ 键盘快捷键
- 🔄 缩略图导航
- 💾 下载功能
- 🖥️ 全屏模式
- 📦 缓存管理
- ⚡ 性能优化

## 为什么选择 ImagesViewer？

- **框架无关**：可与任何 JavaScript 框架一起使用，或不使用框架
- **轻量级**：最小化的包大小
- **高度可定制**：丰富的配置选项
- **性能优化**：智能缓存和懒加载
- **响应式**：适应任何屏幕尺寸
- **文档完善**：全面的 API 文档

## 快速开始

### 安装

您可以使用 npm 安装 ImagesViewer，或直接在 HTML 中包含：

**NPM：**

```bash
npm install images-viewer-js
```

**直接包含：**

```html
<script src="https://cdn.jsdelivr.net/npm/images-viewer-js@latest/dist/index.js"></script>
```

### 基本使用

```javascript
// 单张图片
const viewer1 = new ImagesViewer('single-image.jpg');

// 多张图片
const viewer2 = new ImagesViewer(['img1.jpg', 'img2.jpg']);

// 数组格式
const viewer3 = new ImagesViewer(['img1.jpg', 'img2.jpg']);
```