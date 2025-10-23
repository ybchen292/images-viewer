// image-viewer.js
(function (global, factory) {
  // UMD包装器，支持CommonJS、AMD和全局变量
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    // CommonJS/Node.js环境
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD环境 (RequireJS等)
    define([], factory);
  } else {
    // 浏览器全局环境
    global.ImageViewer = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // 节流函数
  function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();
      const timeSinceLastExec = currentTime - lastExecTime;

      if (timeSinceLastExec > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = currentTime;
        }, delay - timeSinceLastExec);
      }
    };
  }

  class ImageViewer {
    constructor(options) {
      // 默认配置
      this.defaultOptions = {
        closeOnMaskClick: true,
        loop: false,
        buttons: {
          zoomIn: true,
          zoomOut: true,
          rotateLeft: true,
          rotateRight: true,
          reset: true,
          download: true,
          fullscreen: true,
          prev: true,
          next: true,
          close: true,
          topClose: true,
          thumbnails: true,
          info: true,
          originalSize: true,
        },
        imageInfo: {
          visible: false,
          showName: true,
          showSize: false,
          showDimensions: true,
        },
        theme: {
          // 背景相关
          viewerBgColor: 'rgba(127, 127, 127, 0.95)',
          backdropBlur: '10px',

          // 工具栏相关
          toolbarBgColor: 'rgba(127, 127, 127, 0.85)',
          toolbarBorderRadius: '30px',
          toolbarPadding: '8px 12px',
          toolbarBottom: '20px',

          // 按钮相关
          buttonBgColor: 'rgba(255, 255, 255, 0.15)',
          buttonHoverBg: 'rgba(255, 255, 255, 0.25)',
          buttonSize: '50px',
          buttonFontSize: '20px',
          buttonBorderRadius: '50%',

          // 右上角关闭按钮
          topCloseBtnSize: '44px',
          topCloseBtnTop: '20px',
          topCloseBtnRight: '20px',

          // 信息栏相关
          infoBgColor: 'rgba(127, 127, 127, 0.9)',
          infoBorderRadius: '12px',
          infoPadding: '10px 15px',
          infoFontSize: '13px',
          infoTop: '70px',
          infoLeft: '20px',

          // 缩放指示器
          zoomIndicatorBg: 'rgba(127, 127, 127, 0.9)',
          zoomIndicatorBorderRadius: '18px',
          zoomIndicatorPadding: '6px 12px',
          zoomIndicatorFontSize: '14px',
          zoomIndicatorTop: '20px',
          zoomIndicatorLeft: '20px',

          // 通用
          activeColor: '#4285f4',
          textColor: '#ffffff',
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          transitionSpeed: '0.3s',
        },
      };

      // 合并用户配置
      this.options = {
        ...this.defaultOptions,
        ...options,
        buttons: { ...this.defaultOptions.buttons, ...(options?.buttons || {}) },
        imageInfo: { ...this.defaultOptions.imageInfo, ...(options?.imageInfo || {}) },
        theme: { ...this.defaultOptions.theme, ...(options?.theme || {}) },
      };

      // 解析图片参数
      this.parseImageOptions(options);
      if (this.images.length === 0) {
        throw new Error('未提供有效的图片URL');
      }

      // 初始化状态变量
      this.currentIndex = 0;
      this.scale = 1.0;
      this.rotation = 0;
      this.translateX = 0;
      this.translateY = 0;
      this.isDragging = false;
      this.startX = 0;
      this.startY = 0;
      this.startTranslateX = 0;
      this.startTranslateY = 0;
      this.isFullscreen = false;
      this.imageInfoVisible = this.options.imageInfo.visible;
      this.imageMetadata = [];
      this.preloadedImages = new Map();
      this.loadedImages = new Map();

      // 双击相关状态
      this.lastTapTime = 0;
      this.lastScale = 1.0;
      this.lastTranslateX = 0;
      this.lastTranslateY = 0;
      this.hasPreviousState = false;
      this.isToggledState = false;

      // 触摸状态
      this.touchState = {
        isDragging: false,
        isPinching: false,
        initialDistance: null,
        initialScale: null,
        initialTranslateX: null,
        initialTranslateY: null,
        centerX: null,
        centerY: null,
        relativeCenterX: null,
        relativeCenterY: null,
        lastTouchTime: 0,
        startX: 0,
        startY: 0,
        startTranslateX: 0,
        startTranslateY: 0,
        minScaleChange: 0.005,
        scaleRatio: 1,
        stabilizationThreshold: 3,
        movementCount: 0,
      };

      // 事件监听器引用
      this.eventListeners = new Map();

      // 注入CSS样式
      this.injectStyles();

      // 应用主题
      this.applyTheme();

      // 创建DOM元素
      this.createElements();

      // 绑定事件
      this.bindEvents();

      // 预加载图片
      this.preloadImages();

      // 加载第一张图片
      this.loadCurrentImage();

      // 显示预览器
      this.show();
    }

    // 注入CSS样式
    injectStyles() {
      // 检查样式是否已存在，避免重复注入
      if (document.getElementById('image-viewer-styles')) return;

      const style = document.createElement('style');
      style.id = 'image-viewer-styles';
      style.textContent = `
        :root {
          /* 背景相关变量 */
          --viewer-bg-color: ${this.options.theme.viewerBgColor};
          --backdrop-blur: ${this.options.theme.backdropBlur};
          
          /* 工具栏相关变量 */
          --toolbar-bg-color: ${this.options.theme.toolbarBgColor};
          --toolbar-border-radius: ${this.options.theme.toolbarBorderRadius};
          --toolbar-padding: ${this.options.theme.toolbarPadding};
          --toolbar-bottom: ${this.options.theme.toolbarBottom};
          
          /* 按钮相关变量 */
          --button-bg-color: ${this.options.theme.buttonBgColor};
          --button-hover-bg: ${this.options.theme.buttonHoverBg};
          --button-size: ${this.options.theme.buttonSize};
          --button-font-size: ${this.options.theme.buttonFontSize};
          --button-border-radius: ${this.options.theme.buttonBorderRadius};
          
          /* 右上角关闭按钮变量 */
          --top-close-btn-size: ${this.options.theme.topCloseBtnSize};
          --top-close-btn-top: ${this.options.theme.topCloseBtnTop};
          --top-close-btn-right: ${this.options.theme.topCloseBtnRight};
          
          /* 信息栏相关变量 */
          --info-bg-color: ${this.options.theme.infoBgColor};
          --info-border-radius: ${this.options.theme.infoBorderRadius};
          --info-padding: ${this.options.theme.infoPadding};
          --info-font-size: ${this.options.theme.infoFontSize};
          --info-top: ${this.options.theme.infoTop};
          --info-left: ${this.options.theme.infoLeft};
          
          /* 缩放指示器变量 */
          --zoom-indicator-bg: ${this.options.theme.zoomIndicatorBg};
          --zoom-indicator-border-radius: ${this.options.theme.zoomIndicatorBorderRadius};
          --zoom-indicator-padding: ${this.options.theme.zoomIndicatorPadding};
          --zoom-indicator-font-size: ${this.options.theme.zoomIndicatorFontSize};
          --zoom-indicator-top: ${this.options.theme.zoomIndicatorTop};
          --zoom-indicator-left: ${this.options.theme.zoomIndicatorLeft};
          
          /* 通用变量 */
          --active-color: ${this.options.theme.activeColor};
          --text-color: ${this.options.theme.textColor};
          --shadow-color: ${this.options.theme.shadowColor};
          --transition-speed: ${this.options.theme.transitionSpeed};
        }

        .image-viewer-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          overflow: hidden;
          opacity: 0;
          transition: opacity var(--transition-speed) ease;
          touch-action: none;
          -webkit-user-select: none;
          user-select: none;
          display: none;
        }

        .image-viewer-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--viewer-bg-color);
          backdrop-filter: blur(var(--backdrop-blur));
          z-index: 50;
        }

        /* 右上角关闭按钮样式 */
        .image-viewer-top-close-btn {
          position: absolute;
          top: var(--top-close-btn-top);
          right: var(--top-close-btn-right);
          width: var(--top-close-btn-size);
          height: var(--top-close-btn-size);
          border-radius: 50%;
          background-color: var(--button-bg-color);
          color: var(--text-color);
          border: none;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-speed);
          z-index: 100;
          backdrop-filter: blur(4px);
          box-shadow: 0 2px 8px var(--shadow-color);
        }

        .image-viewer-top-close-btn:hover {
          background-color: rgba(255, 50, 50, 0.3);
          transform: scale(1.1);
        }

        /* 缩放指示器样式 */
        .image-viewer-zoom-indicator {
          position: absolute;
          top: var(--zoom-indicator-top);
          left: var(--zoom-indicator-left);
          color: var(--text-color);
          background-color: var(--zoom-indicator-bg);
          padding: var(--zoom-indicator-padding);
          border-radius: var(--zoom-indicator-border-radius);
          font-size: var(--zoom-indicator-font-size);
          z-index: 100;
          min-width: 60px;
          text-align: center;
          backdrop-filter: blur(4px);
          box-shadow: 0 2px 8px var(--shadow-color);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* 信息栏样式 */
        .image-viewer-image-info {
          position: absolute;
          top: var(--info-top);
          left: var(--info-left);
          color: var(--text-color);
          background-color: var(--info-bg-color);
          padding: var(--info-padding);
          border-radius: var(--info-border-radius);
          font-size: var(--info-font-size);
          z-index: 100;
          max-width: calc(100% - 40px);
          backdrop-filter: blur(4px);
          box-shadow: 0 4px 12px var(--shadow-color);
          display: none;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .image-viewer-image-info.visible {
          display: block;
          animation: imageViewerFadeIn 0.3s ease;
        }

        .image-viewer-image-info p {
          margin: 4px 0;
          line-height: 1.4;
        }

        .image-viewer-image-info .info-label {
          color: #ddd;
          margin-right: 5px;
        }

        .image-viewer-shortcuts-title {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          font-weight: bold;
          margin-bottom: 5px;
        }

        @keyframes imageViewerFadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* 工具栏样式 */
        .image-viewer-toolbar {
          position: absolute;
          bottom: var(--toolbar-bottom);
          left: 50%;
          transform: translateX(-50%);
          background-color: var(--toolbar-bg-color);
          backdrop-filter: blur(12px);
          padding: var(--toolbar-padding);
          border-radius: var(--toolbar-border-radius);
          display: flex;
          gap: 2px;
          z-index: 100;
          box-shadow: 0 6px 25px var(--shadow-color);
          max-width: calc(100% - 40px);
          overflow-x: auto;
          overflow-y: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
        }

        .image-viewer-toolbar::-webkit-scrollbar {
          display: none;
        }

        .image-viewer-tool-btn {
          width: var(--button-size);
          height: var(--button-size);
          background-color: transparent;
          border: none;
          color: var(--text-color);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--button-font-size);
          transition: all 0.2s;
          flex-shrink: 0;
          position: relative;
          border-radius: var(--button-border-radius);
          margin: 0 2px;
          z-index: 101;
        }

        .image-viewer-tool-btn:hover {
          background-color: var(--button-hover-bg);
          transform: translateY(-2px);
          box-shadow: 0 4px 10px var(--shadow-color);
        }

        .image-viewer-tool-btn:active {
          background-color: rgba(255, 255, 255, 0.3);
          transform: translateY(0);
        }

        .image-viewer-tool-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .image-viewer-tool-btn .image-viewer-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) scale(0.9);
          background-color: rgba(0, 0, 0, 0.85);
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: all 0.2s;
          margin-bottom: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          z-index: 102;
        }

        .image-viewer-tool-btn:hover .image-viewer-tooltip {
          opacity: 1;
          transform: translateX(-50%) scale(1);
        }

        /* 其他样式... */
        .image-viewer-preview-image-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          touch-action: none;
          z-index: 60;
        }

        .image-viewer-loading-modal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(127, 127, 127, 0.7);
          padding: 20px 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 55;
          opacity: 0;
          pointer-events: none;
          transition: opacity var(--transition-speed) ease;
          border-radius: 10px;
          width: auto;
          height: auto;
        }

        .image-viewer-loading-modal.active {
          opacity: 1;
        }

        .image-viewer-loading-spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(255, 255, 255, 0.2);
          border-top-color: var(--active-color);
          border-radius: 50%;
          animation: imageViewerSpin 1s linear infinite;
          margin-right: 15px;
        }

        @keyframes imageViewerSpin {
          to {
            transform: rotate(360deg);
          }
        }

        .image-viewer-loading-content {
          display: flex;
          align-items: center;
          color: var(--text-color);
          font-size: 18px;
        }

        .image-viewer-image-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          cursor: grab;
          touch-action: none;
          pointer-events: auto;
          transition: transform var(--transition-speed) ease;
          z-index: 65;
        }

        .image-viewer-image-wrapper.dragging {
          cursor: grabbing;
          transition: none;
        }

        .image-viewer-image {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: transform 0.1s ease-out, opacity var(--transition-speed) ease;
          user-select: none;
          transform-origin: center center;
          opacity: 0;
          max-width: none;
          max-height: none;
          box-shadow: 0 8px 25px var(--shadow-color);
          border-radius: 4px;
          pointer-events: auto;
          touch-action: none;
        }

        .image-viewer-image.loaded {
          opacity: 1;
        }

        .image-viewer-image.transitioning {
          transition: opacity var(--transition-speed) ease-in-out;
        }

        .image-viewer-image-counter {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          color: var(--text-color);
          background-color: var(--info-bg-color);
          padding: 6px 12px;
          border-radius: 18px;
          font-size: 14px;
          z-index: 100;
          backdrop-filter: blur(4px);
          box-shadow: 0 2px 8px var(--shadow-color);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .image-viewer-nav-buttons {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          pointer-events: none;
          z-index: 90;
          padding: 0 10px;
        }

        .image-viewer-nav-btn {
          width: var(--button-size);
          height: var(--button-size);
          border-radius: 50%;
          background-color: var(--button-bg-color);
          color: var(--text-color);
          border: none;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          pointer-events: auto;
          opacity: 0.9;
          backdrop-filter: blur(4px);
          box-shadow: 0 2px 8px var(--shadow-color);
          z-index: 91;
        }

        .image-viewer-nav-btn:hover {
          background-color: var(--button-hover-bg);
          opacity: 1;
          transform: scale(1.1);
        }

        .image-viewer-nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: none;
        }

        .image-viewer-thumbnails-container {
          position: absolute;
          bottom: 90px;
          left: 50%;
          transform: translateX(-50%);
          padding: 10px 15px;
          background-color: var(--toolbar-bg-color);
          backdrop-filter: blur(8px);
          border-radius: 12px;
          display: flex;
          gap: 10px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          z-index: 100;
          box-shadow: 0 3px 15px var(--shadow-color);
          max-width: calc(100% - 40px);
          -webkit-overflow-scrolling: touch;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .image-viewer-thumbnails-container::-webkit-scrollbar {
          display: none;
        }

        .image-viewer-thumbnail-item {
          width: 70px;
          height: 45px;
          border: 2px solid transparent;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.2s;
          z-index: 101;
        }

        .image-viewer-thumbnail-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-viewer-thumbnail-item.active {
          border-color: var(--active-color);
          transform: scale(1.05);
        }

        .image-viewer-thumbnail-item:hover {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .image-viewer-tool-btn {
            width: 44px;
            height: 44px;
            font-size: 18px;
          }

          .image-viewer-toolbar {
            padding: 6px 8px;
            bottom: 15px;
            border-radius: 25px;
            max-width: 95%;
          }

          .image-viewer-thumbnails-container {
            bottom: 80px;
            padding: 8px 10px;
            gap: 8px;
            max-width: 95%;
          }

          .image-viewer-thumbnail-item {
            width: 60px;
            height: 40px;
          }

          .image-viewer-nav-btn {
            width: 44px;
            height: 44px;
            font-size: 20px;
          }

          .image-viewer-top-close-btn {
            width: 40px;
            height: 40px;
            top: 15px;
            right: 15px;
          }

          .image-viewer-image-info {
            font-size: 12px;
            padding: 8px 12px;
          }

          .image-viewer-zoom-indicator,
          .image-viewer-image-counter {
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .image-viewer-thumbnails-container {
            max-width: 95%;
            padding: 6px 8px;
          }

          .image-viewer-thumbnail-item {
            width: 50px;
            height: 35px;
          }

          .image-viewer-toolbar {
            max-width: 95%;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // 应用主题配置到CSS变量
    applyTheme() {
      const root = document.documentElement;
      const theme = this.options.theme;

      // 更新CSS变量
      Object.keys(theme).forEach(key => {
        const value = theme[key];
        if (value) {
          const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
          root.style.setProperty(cssVarName, value);
        }
      });
    }

    // 解析图片参数
    parseImageOptions(options) {
      this.images = [];

      if (typeof options === 'string') {
        this.images = [options];
      } else if (typeof options === 'object') {
        if (options.image) {
          this.images = [options.image];
        } else if (options.images && Array.isArray(options.images)) {
          this.images = options.images.filter(url => typeof url === 'string' && url.trim() !== '');
        }
      } else if (Array.isArray(options)) {
        this.images = options.filter(url => typeof url === 'string' && url.trim() !== '');
      }
    }

    // 预加载图片 - 存储完整的Image对象
    preloadImages() {
      this.images.forEach((url, index) => {
        if (!this.loadedImages.has(url)) {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = url;
          img.onload = () => {
            this.loadedImages.set(url, img);
            this.imageMetadata[index] = {
              name: this.extractFileName(url),
              width: img.width,
              height: img.height,
            };
          };
          img.onerror = () => {
            console.error(`图片预加载失败: ${url}`);
          };
        }
      });
    }

    // 创建所需的DOM元素
    createElements() {
      // 主容器
      this.container = document.createElement('div');
      this.container.className = 'image-viewer-container';
      document.body.appendChild(this.container);

      // 添加专门的遮罩元素
      this.backdrop = document.createElement('div');
      this.backdrop.className = 'image-viewer-backdrop';
      this.container.appendChild(this.backdrop);

      // 右上角关闭按钮
      if (this.options.buttons.topClose) {
        this.topCloseBtn = document.createElement('button');
        this.topCloseBtn.className = 'image-viewer-top-close-btn';
        this.topCloseBtn.textContent = '×';
        this.topCloseBtn.title = '关闭预览 (ESC)';
        this.container.appendChild(this.topCloseBtn);
      }

      // 缩放比例显示元素
      this.zoomIndicator = document.createElement('div');
      this.zoomIndicator.className = 'image-viewer-zoom-indicator';
      this.container.appendChild(this.zoomIndicator);

      // 图片信息面板（包含快捷键说明）
      if (this.options.buttons.info) {
        this.imageInfoPanel = document.createElement('div');
        this.imageInfoPanel.className = `image-viewer-image-info ${this.imageInfoVisible ? 'visible' : ''}`;
        this.container.appendChild(this.imageInfoPanel);
      }

      // 图片计数器
      if (this.images.length > 1) {
        this.counter = document.createElement('div');
        this.counter.className = 'image-viewer-image-counter';
        this.container.appendChild(this.counter);
      }

      // 图片显示区域
      this.imageContainer = document.createElement('div');
      this.imageContainer.className = 'image-viewer-preview-image-container';
      this.container.appendChild(this.imageContainer);

      // 加载模态框
      this.loadingModal = document.createElement('div');
      this.loadingModal.className = 'image-viewer-loading-modal';

      const loadingContent = document.createElement('div');
      loadingContent.className = 'image-viewer-loading-content';

      const spinner = document.createElement('div');
      spinner.className = 'image-viewer-loading-spinner';

      const text = document.createElement('div');
      text.textContent = '加载中...';

      loadingContent.appendChild(spinner);
      loadingContent.appendChild(text);
      this.loadingModal.appendChild(loadingContent);
      this.imageContainer.appendChild(this.loadingModal);

      // 图片包装器
      this.imageWrapper = document.createElement('div');
      this.imageWrapper.className = 'image-viewer-image-wrapper';
      this.imageContainer.appendChild(this.imageWrapper);

      // 图片元素
      this.image = document.createElement('img');
      this.image.className = 'image-viewer-image';
      this.image.alt = '预览图片';
      this.image.crossOrigin = 'anonymous';
      this.imageWrapper.appendChild(this.image);

      // 左右导航按钮
      if (this.images.length > 1 && (this.options.buttons.prev || this.options.buttons.next)) {
        this.createNavButtons();
      }

      // 底部工具栏
      this.createToolbar();

      // 缩略图导航
      if (this.images.length > 1 && this.options.buttons.thumbnails) {
        this.createThumbnails();
      }
    }

    // 更新缩放比例显示
    updateZoomIndicator() {
      const percentage = Math.round(this.scale * 100);
      this.zoomIndicator.textContent = `${percentage}%`;
    }

    // 创建左右导航按钮
    createNavButtons() {
      const navContainer = document.createElement('div');
      navContainer.className = 'image-viewer-nav-buttons';

      navContainer.addEventListener('click', e => {
        e.stopPropagation();
      });

      if (this.options.buttons.prev) {
        this.prevBtn = document.createElement('button');
        this.prevBtn.className = 'image-viewer-nav-btn image-viewer-prev-btn';
        this.prevBtn.textContent = '←';
        this.prevBtn.title = '上一张 (←)';
        this.prevBtn.addEventListener('click', e => {
          e.stopPropagation();
          this.prevImage();
        });
        navContainer.appendChild(this.prevBtn);
      }

      if (this.options.buttons.next) {
        this.nextBtn = document.createElement('button');
        this.nextBtn.className = 'image-viewer-nav-btn image-viewer-next-btn';
        this.nextBtn.textContent = '→';
        this.nextBtn.title = '下一张 (→)';
        this.nextBtn.addEventListener('click', e => {
          e.stopPropagation();
          this.nextImage();
        });
        navContainer.appendChild(this.nextBtn);
      }

      this.container.appendChild(navContainer);
    }

    // 创建底部工具栏
    createToolbar() {
      const toolbar = document.createElement('div');
      toolbar.className = 'image-viewer-toolbar';

      toolbar.addEventListener('click', e => {
        e.stopPropagation();
      });

      // 导航按钮
      if (this.images.length > 1) {
        if (this.options.buttons.prev) {
          this.toolbarPrevBtn = this.createToolButton('←', '上一张 (←)', () => this.prevImage());
          toolbar.appendChild(this.toolbarPrevBtn);
        }

        if (this.options.buttons.next) {
          this.toolbarNextBtn = this.createToolButton('→', '下一张 (→)', () => this.nextImage());
          toolbar.appendChild(this.toolbarNextBtn);
        }

        const separator = document.createElement('div');
        separator.style.width = '10px';
        separator.style.flexShrink = '0';
        toolbar.appendChild(separator);
      }

      // 缩放按钮
      if (this.options.buttons.zoomOut) {
        this.zoomOutBtn = this.createToolButton('−', '缩小 (-)', () => this.zoom(-0.1));
        toolbar.appendChild(this.zoomOutBtn);
      }

      if (this.options.buttons.zoomIn) {
        this.zoomInBtn = this.createToolButton('+', '放大 (+, =)', () => this.zoom(0.1));
        toolbar.appendChild(this.zoomInBtn);
      }

      // 旋转按钮
      if (this.options.buttons.rotateLeft) {
        this.rotateLeftBtn = this.createToolButton('↺', '向左旋转', () => this.rotate(-90));
        toolbar.appendChild(this.rotateLeftBtn);
      }

      if (this.options.buttons.rotateRight) {
        this.rotateRightBtn = this.createToolButton('↻', '向右旋转', () => this.rotate(90));
        toolbar.appendChild(this.rotateRightBtn);
      }

      // 其他功能按钮
      if (this.options.buttons.reset) {
        this.resetBtn = this.createToolButton('⟳', '重置 (0)', () => this.resetTransform());
        toolbar.appendChild(this.resetBtn);
      }

      if (this.options.buttons.originalSize) {
        this.originalSizeBtn = this.createToolButton('1:1', '1:1 (重置旋转)', () => this.showOriginalSize());
        toolbar.appendChild(this.originalSizeBtn);
      }

      if (this.options.buttons.info) {
        this.infoBtn = this.createToolButton('ⓘ', '图片信息 (I)', () => this.toggleImageInfo());
        toolbar.appendChild(this.infoBtn);
      }

      if (this.options.buttons.download) {
        this.downloadBtn = this.createToolButton('↓', '下载图片', () => this.downloadImage());
        toolbar.appendChild(this.downloadBtn);
      }

      if (this.options.buttons.fullscreen) {
        this.fullscreenBtn = this.createToolButton('⛶', '全屏 (F)', () => this.toggleFullscreen());
        toolbar.appendChild(this.fullscreenBtn);
      }

      if (this.options.buttons.close) {
        this.closeBtn = this.createToolButton('×', '关闭 (ESC)', () => this.close());
        toolbar.appendChild(this.closeBtn);
      }

      this.container.appendChild(toolbar);
    }

    // 创建工具按钮
    createToolButton(icon, tooltipText, onClick) {
      const button = document.createElement('button');
      button.className = 'image-viewer-tool-btn';

      const iconSpan = document.createElement('span');
      iconSpan.textContent = icon;

      const tooltip = document.createElement('span');
      tooltip.className = 'image-viewer-tooltip';
      tooltip.textContent = tooltipText;

      button.appendChild(iconSpan);
      button.appendChild(tooltip);

      button.addEventListener('click', e => {
        e.stopPropagation();
        onClick();
      });

      return button;
    }

    // 创建缩略图导航
    createThumbnails() {
      const thumbContainer = document.createElement('div');
      thumbContainer.className = 'image-viewer-thumbnails-container';

      thumbContainer.addEventListener('click', e => {
        e.stopPropagation();
      });

      this.images.forEach((url, index) => {
        const thumbItem = document.createElement('div');
        thumbItem.className = `image-viewer-thumbnail-item ${index === 0 ? 'active' : ''}`;
        thumbItem.dataset.index = index;

        const thumbImg = document.createElement('img');
        thumbImg.src = url;
        thumbImg.alt = `缩略图 ${index + 1}`;
        thumbImg.crossOrigin = 'anonymous';

        thumbImg.onerror = () => {
          thumbImg.src =
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTEyIDJDMTEuMzcgMiAxMC43NyAyLjAzIDEwLjIzIDIuMDljLS41MSAwLS45Ni40NS0uOTYuOTZzLjQ1Ljk2Ljk2Ljk2Ljk2LS40NS45Ni0uOTYuNDUtLjk2Ljk2LS45NiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yMCAxMkg0Yy0uNTUgMC0xIC40NS0xIDEgMCAuMTguMDIuMzUuMDcuNTFMMiAxOWMwLjU1IDAgMS0uNDUgMS0xVjVjMC0uNTUuNDUtMSAxLTEgMiAwIDMuOTggLjkgNS41IDIgMi42MyAxLjMgNC4xNyAzLjEgNS41IDMgMiAwIDUgMiA1IDV2MmMwIC41NS40NSAxIDEgMWgxNmMuNTUgMCAxLS40NSAxLTF2LTEyYzAtLjU1LS40NS0xLTEtMXptLTggMTRjLTQuNDIgMC04LTMuNTgtOC04czMuNTgtOCA4LTggOCAzLjU4IDggOFMzMC40MiAxNiAyNCAxNnoiLz48L3N2Zz4=';
        };

        thumbItem.appendChild(thumbImg);

        thumbItem.addEventListener('click', e => {
          e.stopPropagation();
          const index = parseInt(thumbItem.dataset.index);
          if (index !== this.currentIndex) {
            this.currentIndex = index;
            this.loadCurrentImage();
            this.updateThumbnails();
          }
        });

        thumbContainer.appendChild(thumbItem);
      });

      this.container.appendChild(thumbContainer);
    }

    // 更新缩略图激活状态
    updateThumbnails() {
      if (this.images.length <= 1) return;

      document.querySelectorAll('.image-viewer-thumbnail-item').forEach(item => {
        item.classList.remove('active');
      });

      const activeItem = document.querySelector(`.image-viewer-thumbnail-item[data-index="${this.currentIndex}"]`);
      if (activeItem) {
        activeItem.classList.add('active');
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }

    // 显示/隐藏加载模态框
    showLoadingModal() {
      if (this.loadingModal) {
        this.loadingModal.classList.add('active');
      }
    }

    hideLoadingModal() {
      if (this.loadingModal) {
        this.loadingModal.classList.remove('active');
      }
    }

    // 提取文件名
    extractFileName(url) {
      try {
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split('/');
        let fileName = pathParts[pathParts.length - 1];

        const queryIndex = fileName.indexOf('?');
        if (queryIndex > -1) {
          fileName = fileName.substring(0, queryIndex);
        }

        return fileName || 'unknown-image';
      } catch (e) {
        return 'unknown-image';
      }
    }

    // 加载当前索引的图片
    loadCurrentImage() {
      const currentUrl = this.images[this.currentIndex];
      const isLoaded = this.loadedImages.has(currentUrl);

      // 重置双击状态
      this.hasPreviousState = false;
      this.isToggledState = false;

      // 更新计数器
      if (this.images.length > 1 && this.counter) {
        this.counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
      }

      // 更新导航按钮状态
      this.updateNavButtons();
      // 更新缩略图状态
      this.updateThumbnails();

      // 重置变换状态
      this.scale = 1.0;
      this.rotation = 0;
      this.translateX = 0;
      this.translateY = 0;

      // 如果图片已加载，直接显示
      if (isLoaded) {
        this.showLoadingModal();

        // 立即切换图片源，确保显示正确的图片
        const cachedImg = this.loadedImages.get(currentUrl);

        // 使用新创建的Image对象，避免引用问题
        const tempImg = new Image();
        tempImg.crossOrigin = 'anonymous';
        tempImg.src = cachedImg.src;

        tempImg.onload = () => {
          this.image.src = tempImg.src;
          this.image.classList.add('loaded');

          // 使用缓存的元数据
          const metadata = this.imageMetadata[this.currentIndex];
          if (metadata) {
            this.fitImageToScreen(metadata.width, metadata.height);
            this.updateImageInfo();
          }

          // 短暂延迟后隐藏loading
          setTimeout(() => {
            this.hideLoadingModal();
          }, 300);
        };

        return;
      }

      // 新图片加载流程
      this.showLoadingModal();
      this.image.classList.remove('loaded');

      // 创建新的Image对象加载图片
      const tempImg = new Image();
      tempImg.crossOrigin = 'anonymous';
      tempImg.src = currentUrl;

      tempImg.onload = () => {
        // 存储完整的Image对象到缓存
        this.loadedImages.set(currentUrl, tempImg);
        this.imageMetadata[this.currentIndex] = {
          name: this.extractFileName(currentUrl),
          width: tempImg.width,
          height: tempImg.height,
        };

        // 设置图片源
        this.image.src = tempImg.src;
        this.image.classList.add('loaded');
        this.fitImageToScreen(tempImg.width, tempImg.height);
        this.updateImageInfo();

        // 图片加载完成并显示后隐藏loading
        setTimeout(() => {
          this.hideLoadingModal();
        }, 300);
      };

      tempImg.onerror = () => {
        this.hideLoadingModal();
        alert('图片加载失败');
      };
    }

    // 调整图片大小以适应屏幕
    fitImageToScreen(imageWidth, imageHeight) {
      // 重置缩放和平移，但保留旋转角度
      this.scale = 1;
      this.translateX = 0;
      this.translateY = 0;

      // 获取容器尺寸
      const containerWidth = this.imageContainer.clientWidth;
      const containerHeight = this.imageContainer.clientHeight;

      // 考虑旋转后的实际宽高
      const angle = this.rotation % 360;
      let effectiveWidth = imageWidth;
      let effectiveHeight = imageHeight;

      // 旋转90/270度时，宽高互换
      if (angle === 90 || angle === 270) {
        effectiveWidth = imageHeight;
        effectiveHeight = imageWidth;
      }

      // 仅当图片大于容器时才缩放
      if (effectiveWidth > containerWidth || effectiveHeight > containerHeight) {
        const widthRatio = containerWidth / effectiveWidth;
        const heightRatio = containerHeight / effectiveHeight;
        this.scale = Math.min(widthRatio, heightRatio); // 取最小比例确保图片完全显示
      }

      // 限制最小缩放为0.1
      this.scale = Math.max(0.1, this.scale);

      this.updateImageTransform();
      this.updateZoomIndicator();
    }

    // 更新图片变换
    updateImageTransform() {
      this.image.style.transform = `
            translate(-50%, -50%)
            scale(${this.scale})
            translate(${this.translateX / this.scale}px, ${this.translateY / this.scale}px)
            rotate(${this.rotation}deg)
        `;
    }

    // 更新图片信息面板（包含快捷键）
    updateImageInfo() {
      if (!this.options.buttons.info || !this.imageInfoPanel) return;

      const metadata = this.imageMetadata[this.currentIndex];
      if (!metadata) return;

      let infoHtml = '';

      if (this.options.imageInfo.showName) {
        infoHtml += `<p><span class="info-label">名称:</span> ${metadata.name}</p>`;
      }

      if (this.options.imageInfo.showDimensions) {
        infoHtml += `<p><span class="info-label">尺寸:</span> ${metadata.width} × ${metadata.height} px</p>`;
      }

      if (this.options.imageInfo.showSize) {
        infoHtml += `<p><span class="info-label">大小:</span> 未知</p>`;
      }

      // 添加快捷键说明
      infoHtml += `
            <div class="image-viewer-shortcuts-title">快捷键</div>
            <p><span class="info-label">放大:</span> + / =</p>
            <p><span class="info-label">缩小:</span> -</p>
            <p><span class="info-label">上一张:</span> ←</p>
            <p><span class="info-label">下一张:</span> →</p>
            <p><span class="info-label">重置:</span> 0</p>
            <p><span class="info-label">全屏:</span> F</p>
            <p><span class="info-label">信息:</span> I</p>
            <p><span class="info-label">关闭:</span> ESC</p>
        `;

      this.imageInfoPanel.innerHTML = infoHtml;
    }

    // 切换图片信息显示
    toggleImageInfo() {
      if (!this.options.buttons.info || !this.imageInfoPanel) return;

      this.imageInfoVisible = !this.imageInfoVisible;
      if (this.imageInfoVisible) {
        this.imageInfoPanel.classList.add('visible');
      } else {
        this.imageInfoPanel.classList.remove('visible');
      }
    }

    // 更新导航按钮状态
    updateNavButtons() {
      if (this.images.length <= 1) return;

      const canGoPrev = this.options.loop ? true : this.currentIndex > 0;
      const canGoNext = this.options.loop ? true : this.currentIndex < this.images.length - 1;

      if (this.prevBtn) this.prevBtn.disabled = !canGoPrev;
      if (this.nextBtn) this.nextBtn.disabled = !canGoNext;
      if (this.toolbarPrevBtn) this.toolbarPrevBtn.disabled = !canGoPrev;
      if (this.toolbarNextBtn) this.toolbarNextBtn.disabled = !canGoNext;
    }

    // 上一张/下一张图片
    prevImage() {
      if (this.images.length <= 1) return;

      let newIndex = this.currentIndex - 1;
      if (newIndex < 0) {
        newIndex = this.options.loop ? this.images.length - 1 : 0;
      }

      if (newIndex !== this.currentIndex) {
        this.currentIndex = newIndex;
        this.loadCurrentImage();
      }
    }

    nextImage() {
      if (this.images.length <= 1) return;

      let newIndex = this.currentIndex + 1;
      if (newIndex >= this.images.length) {
        newIndex = this.options.loop ? 0 : this.images.length - 1;
      }

      if (newIndex !== this.currentIndex) {
        this.currentIndex = newIndex;
        this.loadCurrentImage();
      }
    }

    // 绑定事件
    bindEvents() {
      // 关闭按钮事件
      if (this.topCloseBtn) {
        this.addEvent(this.topCloseBtn, 'click', () => this.close());
      }

      // 点击遮罩关闭 - 绑定到专门的遮罩元素
      if (this.options.closeOnMaskClick && this.backdrop) {
        this.addEvent(this.backdrop, 'click', () => this.close());
      }

      // 键盘事件
      this.addEvent(document, 'keydown', e => this.handleKeydown(e));

      // 窗口大小改变事件 - 添加节流
      const throttledResize = throttle(() => {
        this.handleResize();
      }, 250);
      this.addEvent(window, 'resize', throttledResize);

      // 鼠标/触摸事件
      this.bindDragEvents();
      this.bindTouchEvents();
    }

    // 添加事件监听器并保存引用
    addEvent(element, event, handler, options) {
      element.addEventListener(event, handler, options);
      const key = `${event}-${Date.now()}-${Math.random()}`;
      this.eventListeners.set(key, { element, event, handler });
    }

    // 移除所有事件监听器
    removeAllEvents() {
      this.eventListeners.forEach(({ element, event, handler }) => {
        element.removeEventListener(event, handler);
      });
      this.eventListeners.clear();
    }

    // 计算旋转后的坐标
    rotatePoint(x, y, angleDegrees) {
      const angle = (angleDegrees * Math.PI) / 180;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: x * cos - y * sin,
        y: x * sin + y * cos,
      };
    }

    // 绑定拖拽事件
    bindDragEvents() {
      // 鼠标按下
      this.addEvent(this.image, 'mousedown', e => {
        if (e.button !== 0) return;

        this.isDragging = true;
        this.imageWrapper.classList.add('dragging');
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.startTranslateX = this.translateX;
        this.startTranslateY = this.translateY;
        e.preventDefault();
      });

      // 鼠标移动
      this.addEvent(document, 'mousemove', e => {
        if (!this.isDragging) return;

        const deltaX = e.clientX - this.startX;
        const deltaY = e.clientY - this.startY;

        // 计算旋转后的位移，修复方向相反问题
        const rotatedDelta = this.rotatePoint(deltaX, deltaY, -this.rotation);

        this.translateX = this.startTranslateX + rotatedDelta.x;
        this.translateY = this.startTranslateY + rotatedDelta.y;

        this.updateImageTransform();
        e.preventDefault();
      });

      // 鼠标释放
      this.addEvent(document, 'mouseup', () => {
        if (this.isDragging) {
          this.isDragging = false;
          this.imageWrapper.classList.remove('dragging');
        }
      });

      // 鼠标离开窗口
      this.addEvent(document, 'mouseleave', () => {
        if (this.isDragging) {
          this.isDragging = false;
          this.imageWrapper.classList.remove('dragging');
        }
      });

      // 鼠标滚轮缩放
      this.addEvent(this.imageContainer, 'wheel', e => {
        e.preventDefault();

        const rect = this.imageContainer.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // 滚轮缩放改为0.05
        const delta = e.deltaY > 0 ? -0.05 : 0.05;
        this.zoomAtPoint(delta, mouseX, mouseY);
      });

      // 双击缩放 - 优化逻辑
      this.addEvent(this.image, 'dblclick', e => {
        e.preventDefault();

        const rect = this.imageContainer.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // 当前是100%缩放
        if (Math.abs(this.scale - 1.0) < 0.01) {
          // 如果之前有保存的状态，恢复之前的状态
          if (this.hasPreviousState) {
            this.scale = this.lastScale;
            this.translateX = this.lastTranslateX;
            this.translateY = this.lastTranslateY;
            this.hasPreviousState = false;
          } else {
            // 保存当前状态，然后放大到150%
            this.lastScale = this.scale;
            this.lastTranslateX = this.translateX;
            this.lastTranslateY = this.translateY;
            this.hasPreviousState = true;

            // 放大到150%
            const targetScale = 1.5;
            const oldScale = this.scale;
            const scaleDiff = targetScale / oldScale;
            const containerWidth = this.imageContainer.clientWidth;
            const containerHeight = this.imageContainer.clientHeight;

            this.translateX =
              this.translateX * scaleDiff + mouseX - containerWidth / 2 - scaleDiff * (mouseX - containerWidth / 2);
            this.translateY =
              this.translateY * scaleDiff + mouseY - containerHeight / 2 - scaleDiff * (mouseY - containerHeight / 2);

            this.scale = targetScale;
          }
        }
        // 当前不是100%缩放
        else {
          // 保存当前状态，然后回到100%
          this.lastScale = this.scale;
          this.lastTranslateX = this.translateX;
          this.lastTranslateY = this.translateY;
          this.hasPreviousState = true;

          // 回到100%
          const targetScale = 1.0;
          const oldScale = this.scale;
          const scaleDiff = targetScale / oldScale;
          const containerWidth = this.imageContainer.clientWidth;
          const containerHeight = this.imageContainer.clientHeight;

          this.translateX =
            this.translateX * scaleDiff + mouseX - containerWidth / 2 - scaleDiff * (mouseX - containerWidth / 2);
          this.translateY =
            this.translateY * scaleDiff + mouseY - containerHeight / 2 - scaleDiff * (mouseY - containerHeight / 2);

          this.scale = targetScale;
        }

        this.updateImageTransform();
        this.updateZoomIndicator();
      });
    }

    // 绑定触摸事件
    bindTouchEvents() {
      // 触摸开始
      this.addEvent(this.image, 'touchstart', e => {
        this.touchState.lastTouchTime = Date.now();

        if (e.touches.length === 1) {
          if (!this.touchState.isPinching) {
            this.touchState.isDragging = true;
            this.touchState.startX = e.touches[0].clientX;
            this.touchState.startY = e.touches[0].clientY;
            this.touchState.startTranslateX = this.translateX;
            this.touchState.startTranslateY = this.translateY;
            this.imageWrapper.classList.add('dragging');
          }
        } else if (e.touches.length === 2) {
          this.touchState.isPinching = true;
          this.touchState.isDragging = false;
          this.imageWrapper.classList.remove('dragging');

          const touch1 = e.touches[0];
          const touch2 = e.touches[1];

          this.touchState.initialDistance = this.getDistance(touch1, touch2);
          this.touchState.initialScale = this.scale;
          this.touchState.initialTranslateX = this.translateX;
          this.touchState.initialTranslateY = this.translateY;

          this.touchState.centerX = (touch1.clientX + touch2.clientX) / 2;
          this.touchState.centerY = (touch1.clientY + touch2.clientY) / 2;

          const rect = this.imageContainer.getBoundingClientRect();
          const containerX = this.touchState.centerX - rect.left;
          const containerY = this.touchState.centerY - rect.top;

          this.calculateRelativeCenter(containerX, containerY);

          this.touchState.movementCount = 0;
          this.touchState.scaleRatio = 1;
        }

        e.preventDefault();
      });

      // 触摸移动
      this.addEvent(this.image, 'touchmove', e => {
        if (Date.now() - this.touchState.lastTouchTime < 16) {
          return;
        }
        this.touchState.lastTouchTime = Date.now();

        if (e.touches.length === 1 && this.touchState.isDragging && !this.touchState.isPinching) {
          const deltaX = e.touches[0].clientX - this.touchState.startX;
          const deltaY = e.touches[0].clientY - this.touchState.startY;

          // 计算旋转后的位移，修复方向相反问题
          const rotatedDelta = this.rotatePoint(deltaX, deltaY, -this.rotation);

          this.touchState.movementCount++;

          if (
            this.touchState.movementCount > this.touchState.stabilizationThreshold ||
            Math.abs(deltaX) > 5 ||
            Math.abs(deltaY) > 5
          ) {
            this.translateX = this.touchState.startTranslateX + rotatedDelta.x;
            this.translateY = this.touchState.startTranslateY + rotatedDelta.y;
            this.updateImageTransform();
          }
        } else if (e.touches.length === 2 && this.touchState.isPinching) {
          const touch1 = e.touches[0];
          const touch2 = e.touches[1];

          const currentDistance = this.getDistance(touch1, touch2);
          this.touchState.scaleRatio = currentDistance / this.touchState.initialDistance;
          const newScale = this.touchState.initialScale * this.touchState.scaleRatio;

          // 修改：最大缩放至500%，不重置
          const minScale = 0.1;
          const maxScale = 5; // 改为5.0（500%）
          const clampedScale = Math.max(minScale, Math.min(maxScale, newScale));

          if (Math.abs(clampedScale - this.scale) > this.touchState.minScaleChange) {
            const scaleDiff = clampedScale / this.touchState.initialScale;

            const rect = this.imageContainer.getBoundingClientRect();
            const containerWidth = rect.width;
            const containerHeight = rect.height;

            this.translateX =
              this.touchState.initialTranslateX * scaleDiff +
              this.touchState.centerX -
              containerWidth / 2 -
              scaleDiff * (this.touchState.centerX - containerWidth / 2);

            this.translateY =
              this.touchState.initialTranslateY * scaleDiff +
              this.touchState.centerY -
              containerHeight / 2 -
              scaleDiff * (this.touchState.centerY - containerHeight / 2);

            this.scale = clampedScale;
            this.updateImageTransform();
            this.updateZoomIndicator();
          }
        }

        e.preventDefault();
      });

      // 触摸结束/取消
      this.addEvent(this.image, 'touchend', e => {
        if (e.touches.length === 0) {
          this.touchState.isDragging = false;
          this.touchState.isPinching = false;
          this.imageWrapper.classList.remove('dragging');
        } else if (e.touches.length === 1 && this.touchState.isPinching) {
          this.touchState.isPinching = false;
          this.touchState.isDragging = true;
          this.touchState.startX = e.touches[0].clientX;
          this.touchState.startY = e.touches[0].clientY;
          this.touchState.startTranslateX = this.translateX;
          this.touchState.startTranslateY = this.translateY;
          this.imageWrapper.classList.add('dragging');
        }

        e.preventDefault();
      });

      this.addEvent(this.image, 'touchcancel', () => {
        this.touchState.isDragging = false;
        this.touchState.isPinching = false;
        this.imageWrapper.classList.remove('dragging');
      });
    }

    // 计算两点之间的距离
    getDistance(touch1, touch2) {
      const dx = touch1.clientX - touch2.clientX;
      const dy = touch1.clientY - touch2.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    }

    // 计算相对缩放中心
    calculateRelativeCenter(x, y) {
      const metadata = this.imageMetadata[this.currentIndex];
      if (!metadata) return;

      const angle = (this.rotation * Math.PI) / 180;
      const imageWidth = metadata.width;
      const imageHeight = metadata.height;

      const rotatedWidth = Math.abs(imageWidth * Math.cos(angle)) + Math.abs(imageHeight * Math.sin(angle));
      const rotatedHeight = Math.abs(imageWidth * Math.sin(angle)) + Math.abs(imageHeight * Math.cos(angle));

      const containerWidth = this.imageContainer.clientWidth;
      const containerHeight = this.imageContainer.clientHeight;
      const containerCenterX = containerWidth / 2;
      const containerCenterY = containerHeight / 2;

      const offsetX = x - containerCenterX - this.translateX;
      const offsetY = y - containerCenterY - this.translateY;

      this.touchState.relativeCenterX = offsetX / this.scale;
      this.touchState.relativeCenterY = offsetY / this.scale;
    }

    // 以指定点为中心缩放
    zoomAtPoint(delta, x, y) {
      const oldScale = this.scale;
      // 修改：最大缩放至500%，不重置
      const maxScale = 5; // 改为5.0（500%）
      const newScale = Math.max(0.1, Math.min(maxScale, this.scale + delta));

      if (newScale === this.scale) return;

      const scaleDiff = newScale / oldScale;
      const containerWidth = this.imageContainer.clientWidth;
      const containerHeight = this.imageContainer.clientHeight;

      this.translateX = this.translateX * scaleDiff + x - containerWidth / 2 - scaleDiff * (x - containerWidth / 2);
      this.translateY = this.translateY * scaleDiff + y - containerHeight / 2 - scaleDiff * (y - containerHeight / 2);

      this.scale = newScale;
      this.updateImageTransform();
      this.updateZoomIndicator();
    }

    // 缩放图片
    zoom(delta) {
      const containerWidth = this.imageContainer.clientWidth;
      const containerHeight = this.imageContainer.clientHeight;
      this.zoomAtPoint(delta, containerWidth / 2, containerHeight / 2);
    }

    // 旋转图片 - 替代方案：重置平移但保持视觉中心
    rotate(degrees) {
      const oldRotation = this.rotation;
      const newRotation = oldRotation + degrees;

      if (oldRotation === newRotation) return;

      // 获取当前图片在容器中的视觉中心
      const containerRect = this.imageContainer.getBoundingClientRect();
      const viewportCenterX = containerRect.width / 2;
      const viewportCenterY = containerRect.height / 2;

      // 当前图片中心在视口中的位置
      const currentCenterX = viewportCenterX + this.translateX;
      const currentCenterY = viewportCenterY + this.translateY;

      // 应用新旋转
      this.rotation = newRotation;

      // 重置平移，但重新计算以保持视觉中心
      this.translateX = 0;
      this.translateY = 0;

      const metadata = this.imageMetadata[this.currentIndex];
      if (metadata) {
        // 计算新旋转下的图片尺寸
        const newBoundingBox = this.calculateBoundingBox(metadata.width, metadata.height, newRotation);
        const scaledWidth = newBoundingBox.width * this.scale;
        const scaledHeight = newBoundingBox.height * this.scale;

        // 计算保持视觉中心所需的新平移
        this.translateX = (currentCenterX - viewportCenterX) * (scaledWidth / (scaledWidth - this.translateX));
        this.translateY = (currentCenterY - viewportCenterY) * (scaledHeight / (scaledHeight - this.translateY));
      }

      this.updateImageTransform();
      this.updateZoomIndicator();
    }

    // 计算旋转后的边界框尺寸
    calculateBoundingBox(width, height, rotation) {
      const rad = (rotation * Math.PI) / 180;
      const absCos = Math.abs(Math.cos(rad));
      const absSin = Math.abs(Math.sin(rad));

      return {
        width: width * absCos + height * absSin,
        height: width * absSin + height * absCos,
      };
    }

    // 重置变换
    resetTransform() {
      this.rotation = 0; // 重置旋转角度
      const metadata = this.imageMetadata[this.currentIndex];
      if (metadata) {
        this.fitImageToScreen(metadata.width, metadata.height);
      }
    }

    // 显示原始尺寸并重置旋转
    showOriginalSize() {
      this.rotation = 0;
      this.scale = 1;
      this.translateX = 0;
      this.translateY = 0;
      this.updateImageTransform();
      this.updateZoomIndicator();
    }

    // 下载图片 - 优化跨域处理
    downloadImage() {
      const currentUrl = this.images[this.currentIndex];
      const metadata = this.imageMetadata[this.currentIndex];

      // 创建一个新的Image对象来处理跨域问题
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          // 创建canvas元素
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          // 将canvas转换为Data URL
          const dataURL = canvas.toDataURL('image/jpeg');

          // 创建下载链接
          const a = document.createElement('a');
          a.href = dataURL;
          a.download = metadata ? metadata.name : 'image.jpg';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } catch (error) {
          console.error('图片下载失败:', error);
          // 如果canvas方法失败，尝试直接下载原图
          this.downloadOriginalImage(currentUrl, metadata);
        }
      };

      img.onerror = () => {
        // 如果图片加载失败，尝试直接下载原图
        this.downloadOriginalImage(currentUrl, metadata);
      };

      img.src = currentUrl;
    }

    // 下载原图（备选方案）
    downloadOriginalImage(url, metadata) {
      try {
        const a = document.createElement('a');
        a.href = url;
        a.download = metadata ? metadata.name : 'image.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        console.error('原图下载失败:', error);
        alert('图片下载失败，可能是跨域限制导致的');
      }
    }

    // 切换全屏
    toggleFullscreen() {
      if (!document.fullscreenElement) {
        this.container.requestFullscreen().catch(err => {
          console.error(`全屏请求失败: ${err.message}`);
        });
        this.isFullscreen = true;
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          this.isFullscreen = false;
        }
      }
    }

    // 处理键盘事件
    handleKeydown(e) {
      if (this.container.style.display !== 'block') return;

      switch (e.key) {
        case 'Escape':
          this.close();
          e.preventDefault();
          break;
        case 'ArrowLeft':
          this.prevImage();
          e.preventDefault();
          break;
        case 'ArrowRight':
          this.nextImage();
          e.preventDefault();
          break;
        case '+':
        case '=':
          this.zoom(0.1);
          e.preventDefault();
          break;
        case '-':
          this.zoom(-0.1);
          e.preventDefault();
          break;
        case '0':
          this.resetTransform();
          e.preventDefault();
          break;
        case 'f':
        case 'F':
          this.toggleFullscreen();
          e.preventDefault();
          break;
        case 'i':
        case 'I':
          this.toggleImageInfo();
          e.preventDefault();
          break;
      }
    }

    // 处理窗口大小改变 - 修复缩放抖动问题
    handleResize() {
      const metadata = this.imageMetadata[this.currentIndex];
      if (metadata) {
        // 获取图片和容器的当前尺寸
        const containerWidth = this.imageContainer.clientWidth;
        const containerHeight = this.imageContainer.clientHeight;

        // 考虑旋转后的实际宽高
        const angle = this.rotation % 360;
        let effectiveWidth = metadata.width * this.scale;
        let effectiveHeight = metadata.height * this.scale;

        if (angle === 90 || angle === 270) {
          [effectiveWidth, effectiveHeight] = [effectiveHeight, effectiveWidth];
        }

        // 只有当图片明显超出容器时才调整
        const tolerance = 0.02; // 2%的容差，避免边界抖动
        const widthRatio = containerWidth / effectiveWidth;
        const heightRatio = containerHeight / effectiveHeight;

        // 如果图片明显大于容器，则缩小以适应
        if (widthRatio < 1 - tolerance || heightRatio < 1 - tolerance) {
          const newScale = this.scale * Math.min(widthRatio, heightRatio);
          this.scale = Math.max(0.1, newScale);
          this.translateX = 0;
          this.translateY = 0;
          this.updateImageTransform();
          this.updateZoomIndicator();
        }
        // 如果图片明显小于容器并且当前缩放小于100%，则放大到100%
        else if (this.scale < 1 - tolerance && widthRatio > 1 + tolerance && heightRatio > 1 + tolerance) {
          this.scale = 1.0;
          this.translateX = 0;
          this.translateY = 0;
          this.updateImageTransform();
          this.updateZoomIndicator();
        }
      }
    }

    // 显示/关闭预览器
    show() {
      this.container.style.display = 'block';
      setTimeout(() => {
        this.container.style.opacity = '1';
      }, 10);
    }

    close() {
      // 移除所有事件监听器
      this.removeAllEvents();

      this.container.style.opacity = '0';
      setTimeout(() => {
        this.container.style.display = 'none';
        if (this.container.parentNode) {
          this.container.parentNode.removeChild(this.container);
        }
      }, 300);
    }
  }

  // 返回ImageViewer类
  return ImageViewer;
});
