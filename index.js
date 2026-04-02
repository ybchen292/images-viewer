class ImagesViewer {
  constructor(options) {
    // 默认配置
    this.defaultOptions = {
      closeOnMaskClick: false,
      loop: true,
      preloadCount: 3,
      maxCacheSize: 30,
      minScale: 0.1,
      maxScale: 5,
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
      i18n: {
        // 信息栏文本
        info: {
          name: '名称:',
          dimensions: '尺寸:',
          shortcuts: '快捷键',
          zoomIn: '放大:',
          zoomOut: '缩小:',
          prev: '上一张:',
          next: '下一张:',
          reset: '重置:',
          fullscreen: '全屏:',
          info: '信息:',
          close: '关闭:',
        },
        // 按钮文本
        buttons: {
          prev: '上一张 (←)',
          next: '下一张 (→)',
          close: '关闭 (Esc)',
          loading: '加载中...',
        },
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
        buttonSize: '40px',
        buttonFontSize: '20px',
        buttonBorderRadius: '50%',

        // 导航按钮相关（半透明中灰）
        navButtonBgColor: 'rgba(150, 150, 150, 0.7)',
        navButtonHoverBg: 'rgba(200, 200, 200, 0.4)',
        navButtonSize: '50px',
        navButtonFontSize: '20px',
        navButtonBorderRadius: '50%',

        // 右上角关闭按钮
        topCloseBtnSize: '50px',
        topCloseBtnTop: '20px',
        topCloseBtnRight: '20px',
        topCloseBtnFontSize: '24px',
        topCloseBtnBgColor: 'rgba(150, 150, 150, 0.7)',
        topCloseBtnHoverBg: 'rgba(200, 200, 200, 0.4)',
        // topCloseBtnHoverBg: 'rgba(255, 50, 50, 0.3)',

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

        // 缩略图
        thumbItemWidth: '70px',
        thumbItemHeight: '45px',
        thumbGap: '10px',
        thumbPadding: '15px',
        thumbMaxWidth: '70%',
      },
    };

    // 合并用户配置
    this.options = {
      ...this.defaultOptions,
      ...options,
      buttons: { ...this.defaultOptions.buttons, ...(options?.buttons || {}) },
      imageInfo: { ...this.defaultOptions.imageInfo, ...(options?.imageInfo || {}) },
      i18n: {
        ...this.defaultOptions.i18n,
        ...(options?.i18n || {}),
        info: { ...this.defaultOptions.i18n.info, ...(options?.i18n?.info || {}) },
        buttons: { ...this.defaultOptions.i18n.buttons, ...(options?.i18n?.buttons || {}) },
      },
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
    this.loadingImages = new Map();

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

    // 预加载图片
    this.preloadImages();

    // 创建DOM元素
    this.createOptimizedElements();

    // 绑定事件
    this.bindEvents();

    // 显示预览器
    this.show();

    // 加载第一张图片
    this.loadCurrentImage();
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

          /* 导航按钮相关变量 */
          --nav-button-bg-color: ${this.options.theme.navButtonBgColor};
          --nav-button-hover-bg: ${this.options.theme.navButtonHoverBg};
          --nav-button-size: ${this.options.theme.navButtonSize};
          --nav-button-font-size: ${this.options.theme.navButtonFontSize};
          --nav-button-border-radius: ${this.options.theme.navButtonBorderRadius};
          
          /* 右上角关闭按钮变量 */
          --top-close-btn-size: ${this.options.theme.topCloseBtnSize};
          --top-close-btn-top: ${this.options.theme.topCloseBtnTop};
          --top-close-btn-right: ${this.options.theme.topCloseBtnRight};
          --top-close-btn-font-size: ${this.options.theme.topCloseBtnFontSize};
          --top-close-btn-bg-color: ${this.options.theme.topCloseBtnBgColor};
          --top-close-btn-hover-bg: ${this.options.theme.topCloseBtnHoverBg};
          
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
          
          /* 缩略图相关变量 */
          --thumb-max-width: ${this.options.theme.thumbMaxWidth};
          --thumb-gap: ${this.options.theme.thumbGap};
          --thumb-padding: ${this.options.theme.thumbPadding};
          --thumb-item-width: ${this.options.theme.thumbItemWidth};
          --thumb-item-height: ${this.options.theme.thumbItemHeight};
        }

        .images-viewer-container {
          position: fixed;
          left: 0;
          top: 0;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 9999;
          opacity: 0;
          transition: opacity var(--transition-speed) ease;
          touch-action: none;
          -webkit-user-select: none;
          user-select: none;
          display: none;
          background-color: var(--viewer-bg-color);
          overflow: hidden;
        }

        .images-viewer-container::backdrop,
        .images-viewer-container:fullscreen {
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
          font-size:  var(--top-close-btn-font-size);
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
          background-color: var(--top-close-btn-hover-bg);
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
          width: var(--nav-button-size);
          height: var(--nav-button-size);
          border-radius: var(--nav-button-border-radius);
          background-color: var(--nav-button-bg-color);
          color: var(--text-color);
          border: none;
          font-size: var(--nav-button-font-size);
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
          background-color: var(--nav-button-hover-bg);
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
          max-width: var(--thumb-max-width);
          transform: translateX(-50%);
          padding: 10px var(--thumb-padding);
          background-color: var(--toolbar-bg-color);
          backdrop-filter: blur(8px);
          border-radius: 12px;
          display: flex;
          gap: var(--thumb-gap);
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          z-index: 10;
          box-shadow: 0 3px 15px var(--shadow-color);
          -webkit-overflow-scrolling: touch;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .images-viewer-thumbnails-container::-webkit-scrollbar {
          display: none;
        }

        .images-viewer-thumbnail-item {
          width: var(--thumb-item-width);
          height: var(--thumb-item-height);
          border: 2px solid transparent;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.2s;
          z-index: 11;
          position: relative;
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

        /* 缩略图加载状态 */
        .images-viewer-thumbnail-loading {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid var(--active-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .loading-error {
          color: #ff6b6b;
          font-size: 10px;
          text-align: center;
          padding: 2px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .images-viewer-thumbnail-item:hover {
          transform: scale(1.05);
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

    // 图片容器
    this.imageContainer = document.createElement('div');
    this.imageContainer.className = 'images-viewer-image-container';
    this.container.appendChild(this.imageContainer);

    // 图片元素
    this.image = document.createElement('img');
    this.image.className = 'images-viewer-image';
    this.image.alt = 'Preview image';
    this.image.crossOrigin = 'anonymous';
    this.imageContainer.appendChild(this.image);

    // 加载指示器
    this.loading = document.createElement('div');
    this.loading.className = 'images-viewer-loading';
    this.loading.innerHTML = `
        <div class="images-viewer-loading-spinner"></div>
        <div>${this.options.i18n.buttons.loading}</div>
      `;
    this.imageContainer.appendChild(this.loading);

    // 右上角关闭按钮
    if (this.options.buttons.topClose) {
      this.topCloseBtn = document.createElement('button');
      this.topCloseBtn.className = 'images-viewer-top-close-btn';
      this.topCloseBtn.textContent = '×';
      this.topCloseBtn.title = this.options.i18n.buttons.close;
      this.container.appendChild(this.topCloseBtn);
    }

    // 缩放比例显示元素
    this.zoomIndicator = document.createElement('div');
    this.zoomIndicator.className = 'images-viewer-zoom-indicator';
    this.zoomIndicator.textContent = `100%`;
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

    // 缩略图导航
    if (this.images.length > 1 && this.options.buttons.thumbnails) {
      this.createThumbnails();
    }

    // 底部工具栏
    this.createToolbar();
  }

  // 创建导航按钮
  createNavButtons() {
    const navContainer = document.createElement('div');
    navContainer.className = 'images-viewer-nav-buttons';

    this.addEvent(navContainer, 'click', e => {
      e.stopPropagation();
    });

    if (this.options.buttons.prev) {
      this.prevBtn = document.createElement('button');
      this.prevBtn.className = 'images-viewer-nav-btn images-viewer-prev-btn';
      this.prevBtn.textContent = '←';
      this.prevBtn.title = this.options.i18n.buttons.prev;
      this.addEvent(this.prevBtn, 'click', e => {
        e.stopPropagation();
        this.prev();
      });
      navContainer.appendChild(this.prevBtn);
    }

    if (this.options.buttons.next) {
      this.nextBtn = document.createElement('button');
      this.nextBtn.className = 'images-viewer-nav-btn images-viewer-next-btn';
      this.nextBtn.textContent = '→';
      this.nextBtn.title = this.options.i18n.buttons.next;
      this.addEvent(this.nextBtn, 'click', e => {
        e.stopPropagation();
        this.next();
      });
      navContainer.appendChild(this.nextBtn);
    }

    this.container.appendChild(navContainer);
  }

  // 创建工具栏
  createToolbar() {
    const toolbar = document.createElement('div');
    toolbar.className = 'images-viewer-toolbar';

    this.addEvent(toolbar, 'click', e => {
      e.stopPropagation();
    });

    // 允许滚轮滚动
    this.addEvent(toolbar, 'wheel', e => {
      e.preventDefault(); // 阻止默认垂直滚动
      e.stopPropagation(); // 阻止事件冒泡到imageContainer

      // 实现水平滚动
      toolbar.scrollLeft += e.deltaY;
    });

    // 导航按钮
    if (this.images.length > 1) {
      if (this.options.buttons.prev) {
        this.toolbarPrevBtn = this.createToolButton('←', () => this.prev());
        toolbar.appendChild(this.toolbarPrevBtn);
      }

      if (this.options.buttons.next) {
        this.toolbarNextBtn = this.createToolButton('→', () => this.next());
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
      this.resetBtn = this.createToolButton('⟳', () => this.reset());
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

    // 自定义按钮[[按钮1,回调1],[按钮2,回调2]]
    if (this.options.customButtons) {
      this.options.customButtons.forEach(btn => {
        toolbar.appendChild(this.createToolButton(btn[0], btn[1]));
      });
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

    this.addEvent(button, 'click', e => {
      e.stopPropagation();
      onClick();
    });

    return button;
  }

  createThumbnails() {
    const thumbContainer = document.createElement('div');
    thumbContainer.className = 'images-viewer-thumbnails-container';

    this.addEvent(thumbContainer, 'click', e => {
      e.stopPropagation();
    });

    // 允许滚轮滚动
    this.addEvent(thumbContainer, 'wheel', e => {
      e.preventDefault(); // 阻止默认垂直滚动
      e.stopPropagation(); // 阻止事件冒泡到imageContainer

      // 实现水平滚动
      thumbContainer.scrollLeft += e.deltaY;
    });

    // 动态计算可视区域可放下的缩略图数量
    const thumbItemWidth = parseInt(this.options.theme.thumbItemWidth);
    const thumbGap = parseInt(this.options.theme.thumbGap);
    const thumbPadding = parseInt(this.options.theme.thumbPadding);
    const preloadCount = this.options.preloadCount;

    const viewportWidth = window.innerWidth;
    const availableWidth = viewportWidth - thumbPadding * 2;
    const visibleCount = Math.ceil(availableWidth / (thumbItemWidth + thumbGap));
    const initialCount = Math.min(visibleCount + preloadCount, this.images.length);

    for (let i = 0; i < initialCount; i++) {
      this.createThumbnailItem(thumbContainer, i);
    }

    // 滚动时懒加载更多缩略图
    let loadedCount = initialCount;
    this.addEvent(thumbContainer, 'scroll', () => {
      const scrollLeft = thumbContainer.scrollLeft;
      const containerWidth = thumbContainer.clientWidth;
      const maxScroll = thumbContainer.scrollWidth - containerWidth;

      // 当滚动到接近末尾时，加载更多缩略图
      if (scrollLeft > maxScroll - containerWidth && loadedCount < this.images.length) {
        const loadMore = Math.min(visibleCount, this.images.length - loadedCount);
        for (let i = loadedCount; i < loadedCount + loadMore; i++) {
          this.createThumbnailItem(thumbContainer, i);
        }
        loadedCount += loadMore;
      }
    });

    this.container.appendChild(thumbContainer);
    this.thumbContainer = thumbContainer;
  }

  createThumbnailItem(container, index) {
    const url = this.images[index];
    const thumbItem = document.createElement('div');
    thumbItem.className = `images-viewer-thumbnail-item ${index === this.currentIndex ? 'active' : ''}`;
    thumbItem.dataset.index = index;

    const thumbImg = new Image();
    thumbImg.crossOrigin = 'anonymous';

    // 加载状态容器
    const loadingContainer = document.createElement('div');
    loadingContainer.className = 'images-viewer-thumbnail-loading';
    loadingContainer.innerHTML = '<div class="loading-spinner"></div>';
    thumbItem.appendChild(loadingContainer);

    // 如果图片已加载，使用缓存
    if (this.loadedImages.has(url)) {
      thumbImg.src = this.loadedImages.get(url).src;
      loadingContainer.remove();
    } else if (this.loadingImages.has(url)) {
      // 正在加载中，等待加载完成
      loadingContainer.style.display = 'flex';
      thumbImg.onload = () => {
        loadingContainer.remove();
        thumbImg.onload = null;
        thumbImg.onerror = null;
      };
      thumbImg.onerror = () => {
        loadingContainer.remove();
        thumbImg.onload = null;
        thumbImg.onerror = null;
      };
      thumbImg.src = url;
    } else {
      // 未加载，加载缩略图时同时缓存
      this.loadingImages.set(url, thumbImg);
      loadingContainer.style.display = 'flex';
      thumbImg.onload = () => {
        this.addToCache(url, thumbImg);
        this.loadingImages.delete(url);
        this.imageMetadata[index] = {
          name: this.extractFileName(url),
          width: thumbImg.naturalWidth || thumbImg.width,
          height: thumbImg.naturalHeight || thumbImg.height,
        };
        loadingContainer.remove();
        thumbImg.onload = null;
        thumbImg.onerror = null;
      };
      thumbImg.onerror = () => {
        this.loadingImages.delete(url);
        loadingContainer.remove();
        thumbImg.onload = null;
        thumbImg.onerror = null;
        console.error(`Thumbnail loading failed: ${url}`);
      };
      thumbImg.src = url;
    }

    thumbItem.appendChild(thumbImg);

    this.addEvent(thumbItem, 'click', e => {
      e.stopPropagation();
      const clickedIndex = parseInt(thumbItem.dataset.index);
      if (clickedIndex !== this.currentIndex) {
        this.currentIndex = clickedIndex;
        this.loadCurrentImage();
        this.updateThumbnails();
      }
    });

    container.appendChild(thumbItem);
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
    // 懒加载：只预加载当前图片附近的几张
    const preloadRange = this.options.preloadCount;
    if (preloadRange <= 0) return;
    const startIndex = Math.max(0, this.currentIndex - preloadRange);
    const endIndex = Math.min(this.images.length - 1, this.currentIndex + preloadRange);

    for (let i = startIndex; i <= endIndex; i++) {
      this.loadImageAtIndex(i);
    }
  }

  addToCache(url, img) {
    // 添加到缓存
    this.loadedImages.set(url, img);

    // 检查是否超过最大缓存数
    const maxSize = this.options.maxCacheSize;
    if (maxSize > 0 && this.loadedImages.size > maxSize) {
      // 移除最旧的缓存（Map 的第一个元素）
      const oldestUrl = this.loadedImages.keys().next().value;
      this.loadedImages.delete(oldestUrl);
    }
  }

  loadImageAtIndex(index) {
    const url = this.images[index];
    if (!url || this.loadedImages.has(url) || this.loadingImages.has(url)) return;

    const img = new Image();

    img.onload = () => {
      this.addToCache(url, img);
      this.loadingImages.delete(url);

      this.imageMetadata[index] = {
        name: this.extractFileName(url),
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
      };
      img.onload = null;
      img.onerror = null;
    };
    img.onerror = () => {
      this.loadingImages.delete(url);
      img.onload = null;
      img.onerror = null;
      console.error(`Image loading failed: ${url}`);
    };
    img.crossOrigin = 'anonymous';
    img.src = url;
    this.loadingImages.set(url, img);
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

  loadCurrentImage(index) {
    if (index !== undefined) {
      this.currentIndex = index;
    }

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

    // 动态预加载相邻图片
    this.preloadAdjacentImages();

    this.isImageLoaded();
  }

  preloadAdjacentImages() {
    const preloadRange = 2;
    const startIndex = Math.max(0, this.currentIndex - preloadRange);
    const endIndex = Math.min(this.images.length - 1, this.currentIndex + preloadRange);

    for (let i = startIndex; i <= endIndex; i++) {
      this.loadImageAtIndex(i);
    }
  }

  isImageLoaded() {
    const currentUrl = this.images[this.currentIndex];
    const isLoaded = this.loadedImages.has(currentUrl);
    const isLoading = this.loadingImages.has(currentUrl);

    this.showLoading();
    this.image.classList.remove('loaded');

    // 如果图片已加载，直接显示
    if (isLoaded) {
      const cachedImg = this.loadedImages.get(currentUrl);
      // 使用 Canvas 绘制已加载的图片，完全避免网络请求
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = cachedImg.naturalWidth || cachedImg.width;
      canvas.height = cachedImg.naturalHeight || cachedImg.height;
      ctx.drawImage(cachedImg, 0, 0);

      // 将 Canvas 转换为 Blob，然后创建 Blob URL
      canvas.toBlob(blob => {
        if (blob) {
          const blobUrl = URL.createObjectURL(blob);
          this.image.src = blobUrl;

          // 清理之前的 Blob URL
          if (this._currentBlobUrl) {
            URL.revokeObjectURL(this._currentBlobUrl);
            this._currentBlobUrl = null;
          }
          this._currentBlobUrl = blobUrl;
        }
      });

      // 立即使用缓存的尺寸信息进行布局
      const metadata = this.imageMetadata[this.currentIndex];
      if (metadata) {
        this.fitImageToScreen(metadata.width, metadata.height);
        this.updateImageInfo();
      }

      this.image.classList.add('loaded');
      this.hideLoading();
      return;
    }

    // 如果图片正在加载中，等待加载完成
    if (isLoading) {
      const checkLoaded = () => {
        if (this.loadedImages.has(currentUrl)) {
          this.isImageLoaded();
        } else if (this.loadingImages.has(currentUrl)) {
          setTimeout(checkLoaded, 100);
        } else {
          this.hideLoading();
          console.error('Image loading failed', currentUrl);
        }
      };
      setTimeout(checkLoaded, 100);
      return;
    }

    // 图片未加载，直接加载
    const img = new Image();
    img.onload = () => {
      this.addToCache(currentUrl, img);
      this.loadingImages.delete(currentUrl);
      this.imageMetadata[this.currentIndex] = {
        name: this.extractFileName(currentUrl),
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
      };

      // 加载完成后重新调用
      this.isImageLoaded();
    };

    img.onerror = () => {
      this.loadingImages.delete(currentUrl);
      this.hideLoading();
      console.error('Image loading failed', currentUrl);
    };

    img.crossOrigin = 'anonymous';
    img.src = currentUrl;
    // 跟踪正在加载的 Image 对象
    this.loadingImages.set(currentUrl, img);
  }

  updateZoomIndicator() {
    const percentage = Math.round(this.scale * 100);
    this.zoomIndicator.textContent = `${percentage}%`;
  }

  updateImageInfo() {
    if (!this.options.buttons.info || !this.imageInfoPanel) return;

    const metadata = this.imageMetadata[this.currentIndex];
    if (!metadata) return;

    const i18n = this.options.i18n;

    let infoHtml = '';
    if (this.options.imageInfo.showName) {
      infoHtml += `<p><span class="info-label">${i18n.info.name}</span> ${metadata.name}</p>`;
    }

    if (this.options.imageInfo.showDimensions) {
      infoHtml += `<p><span class="info-label">${i18n.info.dimensions}</span> ${metadata.width} × ${metadata.height}</p>`;
    }
    infoHtml += `
        <div class="images-viewer-shortcuts-title">${i18n.info.shortcuts}</div>
        <p><span class="info-label">${i18n.info.zoomIn}</span> ↑ +</p>
        <p><span class="info-label">${i18n.info.zoomOut}</span> ↓ -</p>
        <p><span class="info-label">${i18n.info.prev}</span> ←</p>
        <p><span class="info-label">${i18n.info.next}</span> →</p>
        <p><span class="info-label">${i18n.info.reset}</span> 0</p>
        <p><span class="info-label">${i18n.info.fullscreen}</span> F</p>
        <p><span class="info-label">${i18n.info.info}</span> I</p>
        <p><span class="info-label">${i18n.info.close}</span> ESC</p>
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

  prev() {
    if (this.images.length <= 1) return;

    let newIndex = this.currentIndex - 1;
    if (newIndex < 0) {
      newIndex = this.options.loop ? this.images.length - 1 : 0;
    }

    if (newIndex !== this.currentIndex) {
      this.currentIndex = newIndex;
      this.loadCurrentImage();
    }
    if (this.options.change) this.options.change(this.currentIndex, 'prev');
  }

  next() {
    if (this.images.length <= 1) return;

    let newIndex = this.currentIndex + 1;
    if (newIndex >= this.images.length) {
      newIndex = this.options.loop ? 0 : this.images.length - 1;
    }

    if (newIndex !== this.currentIndex) {
      this.currentIndex = newIndex;
      this.loadCurrentImage();
    }
    if (this.options.change) this.options.change(this.currentIndex, 'next');
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

        const minScale = this.options.minScale;
        const maxScale = this.options.maxScale;
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
    const maxScale = this.options.maxScale;
    const minScale = this.options.minScale;
    const newScale = Math.max(minScale, Math.min(maxScale, this.scale + delta));

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

  reset() {
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
    if (this.loadedImages.has(currentUrl)) {
      const cachedImg = this.loadedImages.get(currentUrl);
      this.downloadFromImage(cachedImg, metadata);
    } else {
      console.error('Image download failed:', currentUrl);
    }
  }

  // 从 Image 对象下载
  downloadFromImage(img, metadata) {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/jpeg');
      this.downloadedImage(dataURL, metadata);
    } catch (error) {
      console.error('Image download failed:', error);
      // 下载失败，尝试使用原始 URL 下载
      const currentUrl = this.images[this.currentIndex];
      this.downloadedImage(currentUrl, metadata);
    }
  }

  downloadedImage(url, metadata) {
    try {
      const a = document.createElement('a');
      a.href = url;
      a.download = metadata ? metadata.name : 'image.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Original image download failed:', error);
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.container.requestFullscreen().catch(err => {
        console.error(`Fullscreen request failed: ${err.message}`);
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
        break;
      case 'ArrowLeft':
        this.prev();
        break;
      case 'ArrowRight':
        this.next();
        break;
      case 'ArrowUp':
      case '+':
      case '=':
        this.zoom(0.1);
        break;
      case 'ArrowDown':
      case '-':
        this.zoom(-0.1);
        break;
      case '0':
        this.reset();
        break;
      case 'f':
      case 'F':
        this.toggleFullscreen();
        break;
      case 'i':
      case 'I':
        this.toggleImageInfo();
        break;
    }
    e.preventDefault();
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

    // 更新缩略图（重新计算可视数量）
    this.updateThumbnailsOnResize();
  }

  // 窗口大小变化时更新缩略图
  updateThumbnailsOnResize() {
    if (!this.thumbContainer) return;

    // 动态计算可视区域可放下的缩略图数量
    const thumbItemWidth = parseInt(this.options.theme.thumbItemWidth);
    const thumbGap = parseInt(this.options.theme.thumbGap);
    const thumbPadding = parseInt(this.options.theme.thumbPadding);
    const preloadCount = this.options.preloadCount;

    const viewportWidth = window.innerWidth;
    const availableWidth = viewportWidth - thumbPadding * 2;
    const visibleCount = Math.ceil(availableWidth / (thumbItemWidth + thumbGap));
    const initialCount = Math.min(visibleCount + preloadCount, this.images.length);

    // 检查当前已加载的缩略图数量
    const existingItems = this.thumbContainer.querySelectorAll('.images-viewer-thumbnail-item');
    const loadedCount = existingItems.length;

    // 如果需要加载更多缩略图
    if (loadedCount < initialCount) {
      const loadMore = initialCount - loadedCount;
      for (let i = loadedCount; i < loadedCount + loadMore; i++) {
        if (i < this.images.length) {
          this.createThumbnailItem(this.thumbContainer, i);
        }
      }
    }
  }

  show() {
    this.container.style.display = 'block';
    setTimeout(() => {
      this.container.style.opacity = '1';
      if (this.options.show) this.options.show(this.container);
    }, 10);
  }

  close() {
    this.removeAllEvents();
    this.cleanup();

    this.container.style.opacity = '0';
    setTimeout(() => {
      this.container.style.display = 'none';
      const styles = document.getElementById('images-viewer-styles');
      if (styles) styles.remove();
      if (this.container) this.container.remove();
      if (this.options.close) this.options.close();
    }, 300);
  }

  cleanup() {
    // 停止正在加载的图片请求
    for (const [url, img] of this.loadingImages.entries()) {
      img.onload = null;
      img.onerror = null;
      img.src = ''; // 停止图片加载
    }

    // 清理缓存的图片
    this.loadedImages.clear();
    this.loadingImages.clear();
    this.imageMetadata = [];

    // 清理 Blob URL
    if (this._currentBlobUrl) {
      URL.revokeObjectURL(this._currentBlobUrl);
      this._currentBlobUrl = null;
    }
  }
}
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

// 导出ImagesViewer类
export default ImagesViewer;
