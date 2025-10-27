(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ImageViewer = factory());
})(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var imagesViewer = {exports: {}};

	(function (module, exports) {
		(function (global, factory) {
		  // UMD包装器，支持CommonJS、AMD和全局变量
		  {
		    // CommonJS/Node.js环境
		    module.exports = factory();
		  }
		})(typeof self !== 'undefined' ? self : commonjsGlobal, function () {

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

		  class ImagesViewer {
		    constructor(options) {
		      // 默认配置
		      this.defaultOptions = {
		        closeOnMaskClick: false,
		        loop: true,
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
		          showDimensions: true,
		        },
		        theme: {
		          // 背景相关
		          viewerBgColor: 'rgba(0, 0, 0, 0.4)',

		          // 工具栏相关（半透明浅灰，营造朦胧感）
		          toolbarBgColor: 'rgba(150, 150, 150, 0.7)',
		          toolbarBorderRadius: '30px',
		          toolbarPadding: '8px 12px',
		          toolbarBottom: '20px',

		          // 按钮相关（半透明中灰）
		          buttonBgColor: 'rgba(150, 150, 150, 0.7)',
		          buttonHoverBg: 'rgba(200, 200, 200, 0.4)',
		          buttonSize: '50px',
		          buttonFontSize: '20px',
		          buttonBorderRadius: '50%',

		          // 右上角关闭按钮
		          topCloseBtnSize: '44px',
		          topCloseBtnTop: '20px',
		          topCloseBtnRight: '20px',

		          // 信息栏相关（半透明浅灰）
		          infoBgColor: 'rgba(150, 150, 150, 0.7)',
		          infoBorderRadius: '12px',
		          infoPadding: '10px 15px',
		          infoFontSize: '13px',
		          infoTop: '70px',
		          infoLeft: '20px',

		          // 缩放指示器
		          zoomIndicatorBg: 'rgba(150, 150, 150, 0.7)',
		          zoomIndicatorBorderRadius: '18px',
		          zoomIndicatorPadding: '6px 12px',
		          zoomIndicatorFontSize: '14px',
		          zoomIndicatorTop: '20px',
		          zoomIndicatorLeft: '20px',

		          // 通用
		          activeColor: 'rgba(100, 150, 255, 0.8)',
		          textColor: 'rgba(255, 255, 255, 0.9)',
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

		      // 创建优化的DOM元素
		      this.createOptimizedElements();

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
		      const style = document.createElement('style');
		      style.id = 'images-viewer-styles';
		      style.textContent = `
        :root {
          /* 背景相关变量 */
          --viewer-bg-color: ${this.options.theme.viewerBgColor};
          
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

        .images-viewer-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          opacity: 0;
          transition: opacity var(--transition-speed) ease;
          touch-action: none;
          -webkit-user-select: none;
          user-select: none;
          display: none;
          background-color: var(--viewer-bg-color);
        }

        /* 修复图片容器样式 - 确保居中 */
        .images-viewer-image-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* 修复图片样式 - 确保居中 */
        .images-viewer-image {
          position: relative;
          object-fit: contain;
          cursor: grab;
          transition: transform 0.1s ease-out, opacity var(--transition-speed) ease;
          transform-origin: center center;
          opacity: 0;
          box-shadow: 0 8px 25px var(--shadow-color);
          border-radius: 4px;
          user-select: none;
          touch-action: none;
        }

        .images-viewer-image.loaded {
          opacity: 1;
        }

        .images-viewer-image.dragging {
          cursor: grabbing;
          transition: none;
        }

        /* 加载指示器 */
        .images-viewer-loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(127, 127, 127, 0.7);
          padding: 20px 30px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 15px;
          color: var(--text-color);
          font-size: 18px;
          opacity: 0;
          pointer-events: none;
          transition: opacity var(--transition-speed) ease;
          z-index: 3;
        }

        .images-viewer-loading.active {
          opacity: 1;
        }

        .images-viewer-loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255, 255, 255, 0.2);
          border-top-color: var(--active-color);
          border-radius: 50%;
          animation: imageViewerSpin 1s linear infinite;
        }

        @keyframes imageViewerSpin {
          to {
            transform: rotate(360deg);
          }
        }

        /* 右上角关闭按钮样式 */
        .images-viewer-top-close-btn {
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
          z-index: 10;
          backdrop-filter: blur(4px);
          box-shadow: 0 2px 8px var(--shadow-color);
        }

        .images-viewer-top-close-btn:hover {
          background-color: rgba(255, 50, 50, 0.3);
          transform: scale(1.1);
        }

        /* 缩放指示器样式 */
        .images-viewer-zoom-indicator {
          position: absolute;
          top: var(--zoom-indicator-top);
          left: var(--zoom-indicator-left);
          color: var(--text-color);
          background-color: var(--zoom-indicator-bg);
          padding: var(--zoom-indicator-padding);
          border-radius: var(--zoom-indicator-border-radius);
          font-size: var(--zoom-indicator-font-size);
          z-index: 10;
          min-width: 60px;
          text-align: center;
          backdrop-filter: blur(4px);
          box-shadow: 0 2px 8px var(--shadow-color);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* 信息栏样式 */
        .images-viewer-image-info {
          position: absolute;
          top: var(--info-top);
          left: var(--info-left);
          color: var(--text-color);
          background-color: var(--info-bg-color);
          padding: var(--info-padding);
          border-radius: var(--info-border-radius);
          font-size: var(--info-font-size);
          z-index: 10;
          max-width: calc(100% - 40px);
          backdrop-filter: blur(4px);
          box-shadow: 0 4px 12px var(--shadow-color);
          display: none;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .images-viewer-image-info.visible {
          display: block;
          animation: imageViewerFadeIn 0.3s ease;
        }

        .images-viewer-image-info p {
          margin: 4px 0;
          line-height: 1.4;
        }

        .images-viewer-image-info .info-label {
          color: #ddd;
          margin-right: 5px;
        }

        .images-viewer-shortcuts-title {
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

        /* 图片计数器 */
        .images-viewer-image-counter {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          color: var(--text-color);
          background-color: var(--info-bg-color);
          padding: 6px 12px;
          border-radius: 18px;
          font-size: 14px;
          z-index: 10;
          backdrop-filter: blur(4px);
          box-shadow: 0 2px 8px var(--shadow-color);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* 导航按钮 */
        .images-viewer-nav-buttons {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          pointer-events: none;
          z-index: 5;
          padding: 0 10px;
        }

        .images-viewer-nav-btn {
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
          z-index: 6;
        }

        .images-viewer-nav-btn:hover {
          background-color: var(--button-hover-bg);
          opacity: 1;
          transform: scale(1.1);
        }

        .images-viewer-nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
          transform: none;
        }

        /* 工具栏样式 */
        .images-viewer-toolbar {
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
          z-index: 10;
          box-shadow: 0 6px 25px var(--shadow-color);
          max-width: calc(100% - 40px);
          overflow-x: auto;
          overflow-y: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
        }

        .images-viewer-toolbar::-webkit-scrollbar {
          display: none;
        }

        .images-viewer-tool-btn {
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
          z-index: 11;
          line-height: 1;
        }

        .images-viewer-tool-btn:hover {
          background-color: var(--button-hover-bg);
          transform: translateY(-2px);
          box-shadow: 0 4px 10px var(--shadow-color);
        }

        .images-viewer-tool-btn:active {
          background-color: rgba(255, 255, 255, 0.3);
          transform: translateY(0);
        }

        .images-viewer-tool-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* 缩略图容器 */
        .images-viewer-thumbnails-container {
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
          z-index: 10;
          box-shadow: 0 3px 15px var(--shadow-color);
          max-width: calc(100% - 40px);
          -webkit-overflow-scrolling: touch;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .images-viewer-thumbnails-container::-webkit-scrollbar {
          display: none;
        }

        .images-viewer-thumbnail-item {
          width: 70px;
          height: 45px;
          border: 2px solid transparent;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.2s;
          z-index: 11;
        }

        .images-viewer-thumbnail-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .images-viewer-thumbnail-item.active {
          border-color: var(--active-color);
          transform: scale(1.05);
        }

        .images-viewer-thumbnail-item:hover {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .images-viewer-tool-btn {
            width: 44px;
            height: 44px;
            font-size: 18px;
          }

          .images-viewer-toolbar {
            padding: 6px 8px;
            bottom: 15px;
            border-radius: 25px;
            max-width: 95%;
          }

          .images-viewer-thumbnails-container {
            bottom: 80px;
            padding: 8px 10px;
            gap: 8px;
            max-width: 95%;
          }

          .images-viewer-thumbnail-item {
            width: 60px;
            height: 40px;
          }

          .images-viewer-nav-btn {
            width: 44px;
            height: 44px;
            font-size: 20px;
          }

          .images-viewer-top-close-btn {
            width: 40px;
            height: 40px;
            top: 15px;
            right: 15px;
          }

          .images-viewer-image-info {
            font-size: 12px;
            padding: 8px 12px;
          }

          .images-viewer-zoom-indicator,
          .images-viewer-image-counter {
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .images-viewer-thumbnails-container {
            max-width: 95%;
            padding: 6px 8px;
          }

          .images-viewer-thumbnail-item {
            width: 50px;
            height: 35px;
          }

          .images-viewer-toolbar {
            max-width: 95%;
          }
        }
      `;
		      document.head.appendChild(style);
		    }

		    // 创建优化的DOM结构
		    createOptimizedElements() {
		      // 主容器
		      this.container = document.createElement('div');
		      this.container.className = 'images-viewer-container';
		      document.body.appendChild(this.container);

		      // 图片容器 - 使用flex确保居中
		      this.imageContainer = document.createElement('div');
		      this.imageContainer.className = 'images-viewer-image-container';
		      this.container.appendChild(this.imageContainer);

		      // 图片元素
		      this.image = document.createElement('img');
		      this.image.className = 'images-viewer-image';
		      this.image.alt = '预览图片';
		      this.image.crossOrigin = 'anonymous';
		      this.imageContainer.appendChild(this.image);

		      // 加载指示器
		      this.loading = document.createElement('div');
		      this.loading.className = 'images-viewer-loading';
		      this.loading.innerHTML = `
        <div class="images-viewer-loading-spinner"></div>
        <div>加载中...</div>
      `;
		      this.imageContainer.appendChild(this.loading);

		      // 右上角关闭按钮
		      if (this.options.buttons.topClose) {
		        this.topCloseBtn = document.createElement('button');
		        this.topCloseBtn.className = 'images-viewer-top-close-btn';
		        this.topCloseBtn.textContent = '×';
		        this.topCloseBtn.title = '关闭预览 (ESC)';
		        this.container.appendChild(this.topCloseBtn);
		      }

		      // 缩放比例显示元素
		      this.zoomIndicator = document.createElement('div');
		      this.zoomIndicator.className = 'images-viewer-zoom-indicator';
		      this.container.appendChild(this.zoomIndicator);

		      // 图片信息面板
		      if (this.options.buttons.info) {
		        this.imageInfoPanel = document.createElement('div');
		        this.imageInfoPanel.className = `images-viewer-image-info ${this.imageInfoVisible ? 'visible' : ''}`;
		        this.container.appendChild(this.imageInfoPanel);
		      }

		      // 图片计数器
		      if (this.images.length > 1) {
		        this.counter = document.createElement('div');
		        this.counter.className = 'images-viewer-image-counter';
		        this.container.appendChild(this.counter);
		      }

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

		    // 创建导航按钮
		    createNavButtons() {
		      const navContainer = document.createElement('div');
		      navContainer.className = 'images-viewer-nav-buttons';

		      navContainer.addEventListener('click', e => {
		        e.stopPropagation();
		      });

		      if (this.options.buttons.prev) {
		        this.prevBtn = document.createElement('button');
		        this.prevBtn.className = 'images-viewer-nav-btn images-viewer-prev-btn';
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
		        this.nextBtn.className = 'images-viewer-nav-btn images-viewer-next-btn';
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

		    // 创建工具栏
		    createToolbar() {
		      const toolbar = document.createElement('div');
		      toolbar.className = 'images-viewer-toolbar';

		      toolbar.addEventListener('click', e => {
		        e.stopPropagation();
		      });

		      // 导航按钮
		      if (this.images.length > 1) {
		        if (this.options.buttons.prev) {
		          this.toolbarPrevBtn = this.createToolButton('←', () => this.prevImage());
		          toolbar.appendChild(this.toolbarPrevBtn);
		        }

		        if (this.options.buttons.next) {
		          this.toolbarNextBtn = this.createToolButton('→', () => this.nextImage());
		          toolbar.appendChild(this.toolbarNextBtn);
		        }
		      }

		      // 缩放按钮
		      if (this.options.buttons.zoomOut) {
		        this.zoomOutBtn = this.createToolButton('−', () => this.zoom(-0.1));
		        toolbar.appendChild(this.zoomOutBtn);
		      }

		      if (this.options.buttons.zoomIn) {
		        this.zoomInBtn = this.createToolButton('+', () => this.zoom(0.1));
		        toolbar.appendChild(this.zoomInBtn);
		      }

		      // 旋转按钮
		      if (this.options.buttons.rotateLeft) {
		        this.rotateLeftBtn = this.createToolButton('↺', () => this.rotate(-90));
		        toolbar.appendChild(this.rotateLeftBtn);
		      }

		      if (this.options.buttons.rotateRight) {
		        this.rotateRightBtn = this.createToolButton('↻', () => this.rotate(90));
		        toolbar.appendChild(this.rotateRightBtn);
		      }

		      // 其他功能按钮
		      if (this.options.buttons.reset) {
		        this.resetBtn = this.createToolButton('⟳', () => this.resetTransform());
		        toolbar.appendChild(this.resetBtn);
		      }

		      if (this.options.buttons.originalSize) {
		        this.originalSizeBtn = this.createToolButton('1:1', () => this.showOriginalSize());
		        toolbar.appendChild(this.originalSizeBtn);
		      }

		      if (this.options.buttons.info) {
		        this.infoBtn = this.createToolButton('ⓘ', () => this.toggleImageInfo());
		        toolbar.appendChild(this.infoBtn);
		      }

		      if (this.options.buttons.download) {
		        this.downloadBtn = this.createToolButton('↡', () => this.downloadImage());
		        toolbar.appendChild(this.downloadBtn);
		      }

		      if (this.options.buttons.fullscreen) {
		        this.fullscreenBtn = this.createToolButton('⛶', () => this.toggleFullscreen());
		        toolbar.appendChild(this.fullscreenBtn);
		      }

		      if (this.options.buttons.close) {
		        this.closeBtn = this.createToolButton('×', () => this.close());
		        toolbar.appendChild(this.closeBtn);
		      }

		      this.container.appendChild(toolbar);
		    }

		    // 创建工具按钮
		    createToolButton(icon, onClick) {
		      const button = document.createElement('button');
		      button.className = 'images-viewer-tool-btn';

		      const iconSpan = document.createElement('span');
		      iconSpan.textContent = icon;

		      button.appendChild(iconSpan);

		      button.addEventListener('click', e => {
		        e.stopPropagation();
		        onClick();
		      });

		      return button;
		    }

		    // 创建缩略图
		    createThumbnails() {
		      const thumbContainer = document.createElement('div');
		      thumbContainer.className = 'images-viewer-thumbnails-container';

		      thumbContainer.addEventListener('click', e => {
		        e.stopPropagation();
		      });

		      this.images.forEach((url, index) => {
		        const thumbItem = document.createElement('div');
		        thumbItem.className = `images-viewer-thumbnail-item ${index === 0 ? 'active' : ''}`;
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

		    // 更新图片变换 - 修复居中问题
		    updateImageTransform() {
		      // 使用绝对定位和transform来确保居中
		      const transform = `
        translate(${this.translateX}px, ${this.translateY}px)
        scale(${this.scale})
        rotate(${this.rotation}deg)
      `;

		      this.image.style.transform = transform;
		    }

		    // 调整图片大小以适应屏幕 - 修复居中问题
		    fitImageToScreen(imageWidth, imageHeight) {
		      this.scale = 1;
		      this.translateX = 0;
		      this.translateY = 0;

		      const containerWidth = this.imageContainer.clientWidth;
		      const containerHeight = this.imageContainer.clientHeight;

		      const angle = this.rotation % 360;
		      let effectiveWidth = imageWidth;
		      let effectiveHeight = imageHeight;

		      if (angle === 90 || angle === 270) {
		        effectiveWidth = imageHeight;
		        effectiveHeight = imageWidth;
		      }

		      if (effectiveWidth > containerWidth || effectiveHeight > containerHeight) {
		        const widthRatio = containerWidth / effectiveWidth;
		        const heightRatio = containerHeight / effectiveHeight;
		        this.scale = Math.min(widthRatio, heightRatio);
		      }

		      this.scale = Math.max(0.1, this.scale);

		      this.updateImageTransform();
		      this.updateZoomIndicator();
		    }

		    parseImageOptions(options) {
		      this.images = [];

		      if (typeof options === 'string') {
		        this.images = [options];
		      } else if (Array.isArray(options)) {
		        this.images = options.filter(url => typeof url === 'string' && url.trim() !== '');
		      } else if (typeof options === 'object') {
		        if (options.images && Array.isArray(options.images)) {
		          this.images = options.images.filter(url => typeof url === 'string' && url.trim() !== '');
		        }
		      }
		    }

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
		        // this.showLoading();

		        const cachedImg = this.loadedImages.get(currentUrl);
		        const tempImg = new Image();
		        tempImg.crossOrigin = 'anonymous';
		        tempImg.src = cachedImg.src;

		        tempImg.onload = () => {
		          this.image.src = tempImg.src;
		          this.image.classList.add('loaded');

		          const metadata = this.imageMetadata[this.currentIndex];
		          if (metadata) {
		            this.fitImageToScreen(metadata.width, metadata.height);
		            this.updateImageInfo();
		          }

		          setTimeout(() => {
		            this.hideLoading();
		          }, 300);
		        };

		        return;
		      }

		      // 新图片加载流程
		      this.showLoading();
		      this.image.classList.remove('loaded');

		      const tempImg = new Image();
		      tempImg.crossOrigin = 'anonymous';
		      tempImg.src = currentUrl;

		      tempImg.onload = () => {
		        this.loadedImages.set(currentUrl, tempImg);
		        this.imageMetadata[this.currentIndex] = {
		          name: this.extractFileName(currentUrl),
		          width: tempImg.width,
		          height: tempImg.height,
		        };

		        this.image.src = tempImg.src;
		        this.image.classList.add('loaded');
		        this.fitImageToScreen(tempImg.width, tempImg.height);
		        this.updateImageInfo();

		        setTimeout(() => {
		          this.hideLoading();
		        }, 300);
		      };

		      tempImg.onerror = () => {
		        this.hideLoading();
		        alert('图片加载失败');
		      };
		    }

		    updateZoomIndicator() {
		      const percentage = Math.round(this.scale * 100);
		      this.zoomIndicator.textContent = `${percentage}%`;
		    }

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

		      infoHtml += `
        <div class="images-viewer-shortcuts-title">快捷键</div>
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

		    toggleImageInfo() {
		      if (!this.options.buttons.info || !this.imageInfoPanel) return;

		      this.imageInfoVisible = !this.imageInfoVisible;
		      if (this.imageInfoVisible) {
		        this.imageInfoPanel.classList.add('visible');
		      } else {
		        this.imageInfoPanel.classList.remove('visible');
		      }
		    }

		    updateNavButtons() {
		      if (this.images.length <= 1) return;

		      const canGoPrev = this.options.loop ? true : this.currentIndex > 0;
		      const canGoNext = this.options.loop ? true : this.currentIndex < this.images.length - 1;

		      if (this.prevBtn) this.prevBtn.disabled = !canGoPrev;
		      if (this.nextBtn) this.nextBtn.disabled = !canGoNext;
		      if (this.toolbarPrevBtn) this.toolbarPrevBtn.disabled = !canGoPrev;
		      if (this.toolbarNextBtn) this.toolbarNextBtn.disabled = !canGoNext;
		    }

		    updateThumbnails() {
		      if (this.images.length <= 1) return;

		      document.querySelectorAll('.images-viewer-thumbnail-item').forEach(item => {
		        item.classList.remove('active');
		      });

		      const activeItem = document.querySelector(`.images-viewer-thumbnail-item[data-index="${this.currentIndex}"]`);
		      if (activeItem) {
		        activeItem.classList.add('active');
		        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
		      }
		    }

		    showLoading() {
		      if (this.loading) {
		        this.loading.classList.add('active');
		      }
		    }

		    hideLoading() {
		      if (this.loading) {
		        this.loading.classList.remove('active');
		      }
		    }

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

		    bindEvents() {
		      // 关闭按钮事件
		      if (this.topCloseBtn) {
		        this.addEvent(this.topCloseBtn, 'click', () => this.close());
		      }

		      // 点击遮罩关闭
		      if (this.options.closeOnMaskClick) {
		        this.addEvent(this.imageContainer, 'click', e => {
		          if (e.target == this.imageContainer) this.close();
		        });
		      }

		      // 键盘事件
		      this.addEvent(document, 'keydown', e => this.handleKeydown(e));

		      // 窗口大小改变事件
		      const throttledResize = throttle(() => {
		        this.handleResize();
		      }, 300);
		      this.addEvent(window, 'resize', throttledResize);

		      // 鼠标/触摸事件 - 直接绑定到图片
		      this.bindDragEvents();
		      this.bindTouchEvents();
		    }

		    addEvent(element, event, handler, options) {
		      element.addEventListener(event, handler, options);
		      const key = `${event}-${Date.now()}-${Math.random()}`;
		      this.eventListeners.set(key, { element, event, handler });
		    }

		    removeAllEvents() {
		      this.eventListeners.forEach(({ element, event, handler }) => {
		        element.removeEventListener(event, handler);
		      });
		      this.eventListeners.clear();
		    }

		    rotatePoint(x, y, angleDegrees) {
		      const angle = angleDegrees * Math.PI;
		      const cos = Math.cos(angle);
		      const sin = Math.sin(angle);
		      return {
		        x: x * cos - y * sin,
		        y: x * sin + y * cos,
		      };
		    }

		    bindDragEvents() {
		      // 鼠标按下 - 直接绑定到图片
		      this.addEvent(this.image, 'mousedown', e => {
		        if (e.button !== 0) return;

		        this.isDragging = true;
		        this.image.classList.add('dragging');
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

		        const rotatedDelta = this.rotatePoint(deltaX, deltaY, -this.rotation);

		        this.translateX = this.startTranslateX + rotatedDelta.x;
		        this.translateY = this.startTranslateY + rotatedDelta.y;

		        this.updateImageTransform();
		        e.preventDefault();
		      });

		      // this.addEvent(document, 'mousemove', e => {
		      //   if (!this.isDragging) return;

		      //   const deltaX = e.clientX - this.startX;
		      //   const deltaY = e.clientY - this.startY;

		      //   // 修复：根据旋转角度正确计算拖拽方向
		      //   const angleRad = this.rotation * Math.PI;

		      //   // 直接应用旋转矩阵到拖拽向量
		      //   const rotatedDeltaX = deltaX * Math.cos(angleRad) - deltaY * Math.sin(angleRad);
		      //   console.log('🚀 ~ rotatedDeltaX:', rotatedDeltaX);
		      //   const rotatedDeltaY = deltaX * Math.sin(angleRad) + deltaY * Math.cos(angleRad);
		      //   console.log('🚀 ~ rotatedDeltaY:', rotatedDeltaY);

		      //   this.translateX = this.startTranslateX + rotatedDeltaX;
		      //   this.translateY = this.startTranslateY + rotatedDeltaY;

		      //   this.updateImageTransform();
		      //   e.preventDefault();
		      // });

		      // 鼠标释放
		      this.addEvent(document, 'mouseup', () => {
		        if (this.isDragging) {
		          this.isDragging = false;
		          this.image.classList.remove('dragging');
		        }
		      });

		      // 鼠标离开窗口
		      this.addEvent(document, 'mouseleave', () => {
		        if (this.isDragging) {
		          this.isDragging = false;
		          this.image.classList.remove('dragging');
		        }
		      });

		      // 鼠标滚轮缩放
		      this.addEvent(this.imageContainer, 'wheel', e => {
		        e.preventDefault();

		        const rect = this.imageContainer.getBoundingClientRect();
		        const mouseX = e.clientX - rect.left;
		        const mouseY = e.clientY - rect.top;

		        const delta = e.deltaY > 0 ? -0.05 : 0.05;
		        this.zoomAtPoint(delta, mouseX, mouseY);
		      });

		      // 双击缩放
		      this.addEvent(this.image, 'dblclick', e => {
		        e.preventDefault();

		        const rect = this.imageContainer.getBoundingClientRect();
		        const mouseX = e.clientX - rect.left;
		        const mouseY = e.clientY - rect.top;

		        if (Math.abs(this.scale - 1.0) < 0.01) {
		          if (this.hasPreviousState) {
		            this.scale = this.lastScale;
		            this.translateX = this.lastTranslateX;
		            this.translateY = this.lastTranslateY;
		            this.hasPreviousState = false;
		          } else {
		            this.lastScale = this.scale;
		            this.lastTranslateX = this.translateX;
		            this.lastTranslateY = this.translateY;
		            this.hasPreviousState = true;

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
		        } else {
		          this.lastScale = this.scale;
		          this.lastTranslateX = this.translateX;
		          this.lastTranslateY = this.translateY;
		          this.hasPreviousState = true;

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
		            this.image.classList.add('dragging');
		          }
		        } else if (e.touches.length === 2) {
		          this.touchState.isPinching = true;
		          this.touchState.isDragging = false;
		          this.image.classList.remove('dragging');

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

		          const minScale = 0.1;
		          const maxScale = 5;
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
		          this.image.classList.remove('dragging');
		        } else if (e.touches.length === 1 && this.touchState.isPinching) {
		          this.touchState.isPinching = false;
		          this.touchState.isDragging = true;
		          this.touchState.startX = e.touches[0].clientX;
		          this.touchState.startY = e.touches[0].clientY;
		          this.touchState.startTranslateX = this.translateX;
		          this.touchState.startTranslateY = this.translateY;
		          this.image.classList.add('dragging');
		        }

		        e.preventDefault();
		      });

		      this.addEvent(this.image, 'touchcancel', () => {
		        this.touchState.isDragging = false;
		        this.touchState.isPinching = false;
		        this.image.classList.remove('dragging');
		      });
		    }

		    getDistance(touch1, touch2) {
		      const dx = touch1.clientX - touch2.clientX;
		      const dy = touch1.clientY - touch2.clientY;
		      return Math.sqrt(dx * dx + dy * dy);
		    }

		    calculateRelativeCenter(x, y) {
		      const metadata = this.imageMetadata[this.currentIndex];
		      if (!metadata) return;

		      const containerWidth = this.imageContainer.clientWidth;
		      const containerHeight = this.imageContainer.clientHeight;
		      const containerCenterX = containerWidth / 2;
		      const containerCenterY = containerHeight / 2;

		      const offsetX = x - containerCenterX - this.translateX;
		      const offsetY = y - containerCenterY - this.translateY;

		      this.touchState.relativeCenterX = offsetX / this.scale;
		      this.touchState.relativeCenterY = offsetY / this.scale;
		    }

		    zoomAtPoint(delta, x, y) {
		      const oldScale = this.scale;
		      const maxScale = 5;
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

		    zoom(delta) {
		      const containerWidth = this.imageContainer.clientWidth;
		      const containerHeight = this.imageContainer.clientHeight;
		      this.zoomAtPoint(delta, containerWidth / 2, containerHeight / 2);
		    }

		    rotate(degrees) {
		      const oldRotation = this.rotation;
		      const newRotation = oldRotation + degrees;

		      if (oldRotation === newRotation) return;

		      const containerRect = this.imageContainer.getBoundingClientRect();
		      const viewportCenterX = containerRect.width / 2;
		      const viewportCenterY = containerRect.height / 2;

		      const currentCenterX = viewportCenterX + this.translateX;
		      const currentCenterY = viewportCenterY + this.translateY;

		      this.rotation = newRotation;

		      this.translateX = 0;
		      this.translateY = 0;

		      const metadata = this.imageMetadata[this.currentIndex];
		      if (metadata) {
		        const newBoundingBox = this.calculateBoundingBox(metadata.width, metadata.height, newRotation);
		        const scaledWidth = newBoundingBox.width * this.scale;
		        const scaledHeight = newBoundingBox.height * this.scale;

		        this.translateX = (currentCenterX - viewportCenterX) * (scaledWidth / (scaledWidth - this.translateX));
		        this.translateY = (currentCenterY - viewportCenterY) * (scaledHeight / (scaledHeight - this.translateY));
		      }

		      this.updateImageTransform();
		      this.updateZoomIndicator();
		    }

		    calculateBoundingBox(width, height, rotation) {
		      const rad = (rotation * Math.PI) / 180;
		      const absCos = Math.abs(Math.cos(rad));
		      const absSin = Math.abs(Math.sin(rad));

		      return {
		        width: width * absCos + height * absSin,
		        height: width * absSin + height * absCos,
		      };
		    }

		    resetTransform() {
		      this.rotation = 0;
		      const metadata = this.imageMetadata[this.currentIndex];
		      if (metadata) {
		        this.fitImageToScreen(metadata.width, metadata.height);
		      }
		    }

		    showOriginalSize() {
		      this.rotation = 0;
		      this.scale = 1;
		      this.translateX = 0;
		      this.translateY = 0;
		      this.updateImageTransform();
		      this.updateZoomIndicator();
		    }

		    downloadImage() {
		      const currentUrl = this.images[this.currentIndex];
		      const metadata = this.imageMetadata[this.currentIndex];

		      const img = new Image();
		      img.crossOrigin = 'anonymous';
		      img.onload = () => {
		        try {
		          const canvas = document.createElement('canvas');
		          canvas.width = img.width;
		          canvas.height = img.height;

		          const ctx = canvas.getContext('2d');
		          ctx.drawImage(img, 0, 0);

		          const dataURL = canvas.toDataURL('image/jpeg');

		          const a = document.createElement('a');
		          a.href = dataURL;
		          a.download = metadata ? metadata.name : 'image.jpg';
		          document.body.appendChild(a);
		          a.click();
		          document.body.removeChild(a);
		        } catch (error) {
		          console.error('图片下载失败:', error);
		          this.downloadOriginalImage(currentUrl, metadata);
		        }
		      };

		      img.onerror = () => {
		        this.downloadOriginalImage(currentUrl, metadata);
		      };

		      img.src = currentUrl;
		    }

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

		    handleResize() {
		      const metadata = this.imageMetadata[this.currentIndex];
		      if (!metadata) return;

		      const containerWidth = this.imageContainer.clientWidth;
		      const containerHeight = this.imageContainer.clientHeight;

		      // 计算旋转后的有效尺寸
		      const angle = this.rotation % 360;
		      let effectiveWidth = metadata.width;
		      let effectiveHeight = metadata.height;

		      if (angle === 90 || angle === 270) {
		        effectiveWidth = metadata.height;
		        effectiveHeight = metadata.width;
		      }

		      // 计算适合容器的缩放比例
		      const fitScale = Math.min(containerWidth / effectiveWidth, containerHeight / effectiveHeight);

		      // 当前缩放后的图片尺寸
		      const currentScaledWidth = effectiveWidth * this.scale;
		      const currentScaledHeight = effectiveHeight * this.scale;

		      // 判断是否超出容器
		      const isOverflowing = currentScaledWidth > containerWidth || currentScaledHeight > containerHeight;

		      let targetScale = this.scale;

		      if (isOverflowing) {
		        // 图片超出容器，缩小到适合比例
		        targetScale = Math.max(0.1, fitScale);
		      } else if (fitScale >= 1.0) {
		        // 图片小于100%且有足够空间，放大到100%
		        targetScale = 1.0;
		      } else {
		        targetScale = fitScale;
		      }

		      // 只有当变化显著时才更新（避免微小调整）
		      if (Math.abs(targetScale - this.scale) > 0.01) {
		        this.scale = targetScale;
		        this.translateX = 0;
		        this.translateY = 0;
		        this.updateImageTransform();
		        this.updateZoomIndicator();
		      }
		    }

		    show() {
		      this.container.style.display = 'block';
		      setTimeout(() => {
		        this.container.style.opacity = '1';
		      }, 10);
		    }

		    close() {
		      this.removeAllEvents();

		      this.container.style.opacity = '0';
		      setTimeout(() => {
		        this.container.style.display = 'none';
		        const styles = document.getElementById('images-viewer-styles');
		        if (styles) styles.remove();
		        if (this.container) this.container.remove();
		      }, 300);
		    }
		  }

		  return ImagesViewer;
		}); 
	} (imagesViewer));

	var imagesViewerExports = imagesViewer.exports;
	var index = /*@__PURE__*/getDefaultExportFromCjs(imagesViewerExports);

	return index;

}));
