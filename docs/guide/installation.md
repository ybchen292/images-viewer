---
title: 安装
---

# 安装

本指南将引导您通过不同的方式安装和设置 ImagesViewer。

## NPM 安装

推荐通过 npm 安装 ImagesViewer：

```bash
npm install images-viewer-js
```

### 使用 ES Modules

```javascript
import ImagesViewer from 'images-viewer-js';

// 创建实例
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg']
});
```

### 使用 CommonJS

```javascript
const ImagesViewer = require('images-viewer-js');

// 创建实例
const viewer = new ImagesViewer({
  images: ['image1.jpg', 'image2.jpg', 'image3.jpg']
});
```

## 通过 CDN 直接引入

您也可以通过 CDN 直接在 HTML 中引入 ImagesViewer：

```html
<!-- 从 CDN 引入 ImagesViewer -->
<script src="https://cdn.jsdelivr.net/npm/images-viewer-js@latest/dist/index.js"></script>

<script>
  // 创建实例
  const viewer = new ImagesViewer({
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg']
  });
</script>
```

## 手动下载

如果您喜欢自行托管文件，可以从 GitHub 下载最新版本：

1. 前往 [GitHub 仓库](https://github.com/ybchen292/images-viewer)
2. 下载最新版本
3. 解压文件
4. 在项目中引入 `dist/index.js` 文件：

```html
<script src="path/to/images-viewer/dist/index.js"></script>

<script>
  const viewer = new ImagesViewer({
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg']
  });
</script>
```

## TypeScript 支持

ImagesViewer 包含 TypeScript 类型定义。使用 TypeScript 时，您可以导入类型：

```typescript
import ImagesViewer, { ImagesViewerOptions } from 'images-viewer-js';

const options: ImagesViewerOptions = {
  images: ['image1.jpg', 'image2.jpg'],
  closeOnMaskClick: true
};

const viewer = new ImagesViewer(options);
```

## 开发环境设置

如果您想为 ImagesViewer 做贡献或在本地运行开发环境：

1. 克隆仓库：
   ```bash
   git clone https://github.com/ybchen292/images-viewer.git
   ```

2. 安装依赖：
   ```bash
   cd images-viewer
   npm install
   ```

3. 构建项目：
   ```bash
   npm run build
   ```

4. 运行示例：
   ```bash
   npm run dev
   ```

## 浏览器兼容性

ImagesViewer 适用于所有现代浏览器：

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）
- Opera（最新版）

## 故障排除

### 常见安装问题

1. **模块未找到错误**
   - 确保您已正确安装包：`npm install images-viewer-js`
   - 检查导入语句

2. **TypeScript 错误**
   - 确保您使用正确的类型
   - 检查您的 TypeScript 版本是否兼容

3. **CDN 加载失败**
   - 验证您的网络连接
   - 检查 CDN URL 是否正确
   - 尝试使用不同的 CDN 提供商

如果您遇到任何其他问题，请在 GitHub 上 [打开一个 issue](https://github.com/ybchen292/images-viewer/issues)。