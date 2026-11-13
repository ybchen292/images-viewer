class u{constructor(t){this.maxSize=t,this.cache=new Map}get(t){if(!this.cache.has(t))return null;const e=this.cache.get(t);return this.cache.delete(t),this.cache.set(t,e),e}set(t,e){if(this.cache.has(t)&&this.cache.delete(t),this.cache.set(t,e),this.cache.size>this.maxSize){const i=this.cache.keys().next().value;this.cache.delete(i)}}has(t){return this.cache.has(t)}delete(t){this.cache.delete(t)}clear(){this.cache.clear()}get size(){return this.cache.size}keys(){return this.cache.keys()}values(){return this.cache.values()}entries(){return this.cache.entries()}}class p{constructor(t){var i,s;if(this.defaultOptions={initialIndex:0,closeOnMaskClick:!1,loop:!0,preloadCount:3,maxCacheSize:30,minScale:.1,maxScale:5,retryOnError:!1,props:{url:"url",title:"title",thumbnail:"thumbnail"},buttons:{zoomIn:!0,zoomOut:!0,rotateLeft:!0,rotateRight:!0,reset:!0,download:!0,fullscreen:!0,prev:!0,next:!0,close:!0,topClose:!0,thumbnails:!0,info:!0,originalSize:!0},imageInfo:{visible:!1,showName:!0,showDimensions:!0},i18n:{info:{name:"名称:",dimensions:"尺寸:",shortcuts:"快捷键",zoomIn:"放大:",zoomOut:"缩小:",prev:"上一张:",next:"下一张:",reset:"重置:",fullscreen:"全屏:",info:"信息:",close:"关闭:"},buttons:{prev:"上一张 (←)",next:"下一张 (→)",close:"关闭 (Esc)",loading:"加载中..."}},theme:{viewerBgColor:"rgba(0, 0, 0, 0.4)",toolbarBgColor:"rgba(150, 150, 150, 0.7)",toolbarBorderRadius:"30px",toolbarPadding:"8px 12px",toolbarBottom:"20px",buttonBgColor:"rgba(150, 150, 150, 0.7)",buttonHoverBg:"rgba(200, 200, 200, 0.4)",buttonSize:"40px",buttonFontSize:"20px",buttonBorderRadius:"50%",navButtonBgColor:"rgba(150, 150, 150, 0.7)",navButtonHoverBg:"rgba(200, 200, 200, 0.4)",navButtonSize:"50px",navButtonFontSize:"20px",navButtonBorderRadius:"50%",topCloseBtnSize:"50px",topCloseBtnTop:"20px",topCloseBtnRight:"20px",topCloseBtnFontSize:"24px",topCloseBtnBgColor:"rgba(150, 150, 150, 0.7)",topCloseBtnHoverBg:"rgba(200, 200, 200, 0.4)",infoBgColor:"rgba(150, 150, 150, 0.7)",infoBorderRadius:"12px",infoPadding:"10px 15px",infoFontSize:"13px",infoTop:"70px",infoLeft:"20px",zoomIndicatorBg:"rgba(150, 150, 150, 0.7)",zoomIndicatorBorderRadius:"18px",zoomIndicatorPadding:"6px 12px",zoomIndicatorFontSize:"14px",zoomIndicatorTop:"20px",zoomIndicatorLeft:"20px",activeColor:"rgba(100, 150, 255, 0.8)",textColor:"rgba(255, 255, 255, 0.9)",shadowColor:"rgba(0, 0, 0, 0.2)",transitionSpeed:"0.3s",thumbItemWidth:"70px",thumbItemHeight:"45px",thumbGap:"10px",thumbPadding:"15px",thumbMaxWidth:"90%"}},this.options={...this.defaultOptions,...t,buttons:{...this.defaultOptions.buttons,...(t==null?void 0:t.buttons)||{}},imageInfo:{...this.defaultOptions.imageInfo,...(t==null?void 0:t.imageInfo)||{}},props:{...this.defaultOptions.props,...(t==null?void 0:t.props)||{}},i18n:{...this.defaultOptions.i18n,...(t==null?void 0:t.i18n)||{},info:{...this.defaultOptions.i18n.info,...((i=t==null?void 0:t.i18n)==null?void 0:i.info)||{}},buttons:{...this.defaultOptions.i18n.buttons,...((s=t==null?void 0:t.i18n)==null?void 0:s.buttons)||{}}},theme:{...this.defaultOptions.theme,...(t==null?void 0:t.theme)||{}}},this.parseImageOptions(t),this.images.length===0)throw new Error("No images URL");const e=Math.max(0,Math.min(this.options.initialIndex||0,this.images.length-1));this.currentIndex=e,this.scale=1,this.rotation=0,this.translateX=0,this.translateY=0,this.isDragging=!1,this.startX=0,this.startY=0,this.startTranslateX=0,this.startTranslateY=0,this.isFullscreen=!1,this.imageInfoVisible=this.options.imageInfo.visible,this.imageMetadata=[],this.loadedImages=new Map,this.loadingImages=new Map,this.failedImages=new Set,this.loadingThumbnails=new Map,this.failedThumbnails=new Set,this.thumbnailCache=new u(this.options.maxCacheSize),this.renderedThumbnails=new Map,this.virtualListStartIndex=0,this.virtualListEndIndex=0,this.isInitialScrollSetup=!1,this.thumbnailItemWidth=parseInt(this.options.theme.thumbItemWidth),this.thumbnailItemHeight=parseInt(this.options.theme.thumbItemHeight),this.thumbnailGap=parseInt(this.options.theme.thumbGap),this.thumbnailPadding=parseInt(this.options.theme.thumbPadding),this.lastTapTime=0,this.lastScale=1,this.lastTranslateX=0,this.lastTranslateY=0,this.hasPreviousState=!1,this.isToggledState=!1,this.touchState={isDragging:!1,isPinching:!1,initialDistance:null,initialScale:null,initialTranslateX:null,initialTranslateY:null,centerX:null,centerY:null,relativeCenterX:null,relativeCenterY:null,lastTouchTime:0,startX:0,startY:0,startTranslateX:0,startTranslateY:0,minScaleChange:.005,scaleRatio:1,stabilizationThreshold:3,movementCount:0},this.eventListeners=new Map,this.injectStyles(),this.preloadImages(),this.createOptimizedElements(),this.bindEvents(),this.onShow(),this.loadCurrentImage()}injectStyles(){const t=document.createElement("style");t.id="images-viewer-styles",t.textContent=`
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

        /* 图片容器样式 */
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

        /* 图片样式 */
        .images-viewer-image {
          position: relative;
          object-fit: contain;
          cursor: grab;
          opacity: 0;
          box-shadow: 0 8px 25px var(--shadow-color);
          border-radius: 4px;
          user-select: none;
          touch-action: none;
        }

        .images-viewer-image.loaded {
          opacity: 1;
          transition: transform 0.1s ease-out, opacity var(--transition-speed) ease;
          transform-origin: center center;
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
          box-shadow: 0 2px 8px var(--shadow-color);
        }

        /* 图片标题显示 */
        .images-viewer-image-title {
          position: absolute;
          top: 60px;
          left: 50%;
          transform: translateX(-50%);
          color: var(--text-color);
          padding: 4px 12px;
          border-radius: 18px;
          font-size: 12px;
          z-index: 10;
          max-width: 80%;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
          border-radius: 12px;
          overflow-x: auto;
          overflow-y: hidden;
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

        /* 虚拟滚动容器 */
        .images-viewer-thumbnails-scroll {
          position: relative;
          height: 100%;
        }

        .images-viewer-thumbnail-item {
          width: var(--thumb-item-width);
          height: var(--thumb-item-height);
          border: 2px solid transparent;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 11;
          opacity: 0.6;
        }

        .images-viewer-thumbnail-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .images-viewer-thumbnail-item.active {
          border-color: var(--active-color);
          transform: scale(1.2);
          opacity: 1;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
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
          transform: scale(1.2);
          opacity: 0.9;
        }
      `,document.head.appendChild(t)}createOptimizedElements(){this.container=document.createElement("div"),this.container.className="images-viewer-container",document.body.appendChild(this.container),this.imageContainer=document.createElement("div"),this.imageContainer.className="images-viewer-image-container",this.container.appendChild(this.imageContainer),this.image=document.createElement("img"),this.image.className="images-viewer-image",this.image.crossOrigin="anonymous",this.image.alt=" ",this.imageContainer.appendChild(this.image),this.loading=document.createElement("div"),this.loading.className="images-viewer-loading",this.loading.innerHTML=`
        <div class="images-viewer-loading-spinner"></div>
        <div>${this.options.i18n.buttons.loading}</div>
      `,this.imageContainer.appendChild(this.loading),this.options.buttons.topClose&&(this.topCloseBtn=document.createElement("button"),this.topCloseBtn.className="images-viewer-top-close-btn",this.topCloseBtn.textContent="×",this.topCloseBtn.title=this.options.i18n.buttons.close,this.container.appendChild(this.topCloseBtn)),this.zoomIndicator=document.createElement("div"),this.zoomIndicator.className="images-viewer-zoom-indicator",this.zoomIndicator.textContent="100%",this.container.appendChild(this.zoomIndicator),this.options.buttons.info&&(this.imageInfoPanel=document.createElement("div"),this.imageInfoPanel.className=`images-viewer-image-info ${this.imageInfoVisible?"visible":""}`,this.container.appendChild(this.imageInfoPanel)),this.images.length>1&&(this.counter=document.createElement("div"),this.counter.className="images-viewer-image-counter",this.container.appendChild(this.counter)),this.imageTitle=document.createElement("div"),this.imageTitle.className="images-viewer-image-title",this.container.appendChild(this.imageTitle),this.images.length>1&&(this.options.buttons.prev||this.options.buttons.next)&&this.createNavButtons(),this.images.length>1&&this.options.buttons.thumbnails&&this.createThumbnails(),this.createToolbar()}createNavButtons(){const t=document.createElement("div");t.className="images-viewer-nav-buttons",this.addEvent(t,"click",e=>{e.stopPropagation()}),this.options.buttons.prev&&(this.prevBtn=document.createElement("button"),this.prevBtn.className="images-viewer-nav-btn images-viewer-prev-btn",this.prevBtn.textContent="←",this.prevBtn.title=this.options.i18n.buttons.prev,this.addEvent(this.prevBtn,"click",e=>{e.stopPropagation(),this.prev()}),t.appendChild(this.prevBtn)),this.options.buttons.next&&(this.nextBtn=document.createElement("button"),this.nextBtn.className="images-viewer-nav-btn images-viewer-next-btn",this.nextBtn.textContent="→",this.nextBtn.title=this.options.i18n.buttons.next,this.addEvent(this.nextBtn,"click",e=>{e.stopPropagation(),this.next()}),t.appendChild(this.nextBtn)),this.container.appendChild(t)}createToolbar(){const t=document.createElement("div");t.className="images-viewer-toolbar",this.addEvent(t,"click",e=>{e.stopPropagation()}),this.addEvent(t,"wheel",e=>{e.preventDefault(),e.stopPropagation(),t.scrollLeft+=e.deltaY}),this.images.length>1&&(this.options.buttons.prev&&(this.toolbarPrevBtn=this.createToolButton("←",()=>this.prev()),t.appendChild(this.toolbarPrevBtn)),this.options.buttons.next&&(this.toolbarNextBtn=this.createToolButton("→",()=>this.next()),t.appendChild(this.toolbarNextBtn))),this.options.buttons.zoomOut&&(this.zoomOutBtn=this.createToolButton("−",()=>this.zoom(-.1)),t.appendChild(this.zoomOutBtn)),this.options.buttons.zoomIn&&(this.zoomInBtn=this.createToolButton("+",()=>this.zoom(.1)),t.appendChild(this.zoomInBtn)),this.options.buttons.rotateLeft&&(this.rotateLeftBtn=this.createToolButton("↺",()=>this.rotate(-90)),t.appendChild(this.rotateLeftBtn)),this.options.buttons.rotateRight&&(this.rotateRightBtn=this.createToolButton("↻",()=>this.rotate(90)),t.appendChild(this.rotateRightBtn)),this.options.buttons.reset&&(this.resetBtn=this.createToolButton("⟳",()=>this.reset()),t.appendChild(this.resetBtn)),this.options.buttons.originalSize&&(this.originalSizeBtn=this.createToolButton("1:1",()=>this.showOriginalSize()),t.appendChild(this.originalSizeBtn)),this.options.buttons.info&&(this.infoBtn=this.createToolButton("ⓘ",()=>this.toggleImageInfo()),t.appendChild(this.infoBtn)),this.options.buttons.download&&(this.downloadBtn=this.createToolButton("↡",()=>this.downloadImage()),t.appendChild(this.downloadBtn)),this.options.buttons.fullscreen&&(this.fullscreenBtn=this.createToolButton("⛶",()=>this.toggleFullscreen()),t.appendChild(this.fullscreenBtn)),this.options.buttons.close&&(this.closeBtn=this.createToolButton("×",()=>this.close()),t.appendChild(this.closeBtn)),this.options.customButtons&&this.options.customButtons.forEach(e=>{t.appendChild(this.createToolButton(e[0],e[1]))}),this.container.appendChild(t)}createToolButton(t,e){const i=document.createElement("button");i.className="images-viewer-tool-btn";const s=document.createElement("span");return s.textContent=t,i.appendChild(s),this.addEvent(i,"click",a=>{a.stopPropagation(),e()}),i}createThumbnails(){const t=document.createElement("div");t.className="images-viewer-thumbnails-container";const e=this.images.length*(this.thumbnailItemWidth+this.thumbnailGap)-this.thumbnailGap;t.style.height=`${this.thumbnailItemHeight||parseInt(this.options.theme.thumbItemHeight)}px`;const i=document.createElement("div");i.className="images-viewer-thumbnails-scroll",i.style.width=`${e}px`,i.style.height="100%",i.style.position="relative",t.appendChild(i),this.thumbnailScrollContainer=i,this.addEvent(t,"click",s=>{s.stopPropagation();const a=s.target.closest(".images-viewer-thumbnail-item");if(a){const n=parseInt(a.dataset.index);if(!isNaN(n)&&n!==this.currentIndex){const o=this.currentIndex;this.currentIndex=n,this.loadCurrentImage(),this.updateThumbnails(),this.checkAndAutoLoadThumbnails(n),this.options.onChange&&this.options.onChange({index:this.currentIndex,oldIndex:o,direction:this.currentIndex>o?"next":"prev",data:this.images[this.currentIndex],img:this.image,dom:this.container})}}}),this.addEvent(t,"wheel",s=>{s.preventDefault(),s.stopPropagation(),t.scrollLeft+=s.deltaY}),this.addEvent(t,"scroll",()=>{this.isInitialScrollSetup&&this.renderVisibleThumbnails()}),this.container.appendChild(t),this.thumbContainer=t,requestAnimationFrame(()=>{const{start:s,end:a}=this.getInitialThumbnailRange(),n=this.thumbnailItemWidth+this.thumbnailGap,o=s*n;this.thumbContainer.scrollLeft=o;for(let r=s;r<=a;r++)this.createVirtualThumbnailItem(r);this.virtualListStartIndex=s,this.virtualListEndIndex=a,this.isInitialScrollSetup=!0})}getVisibleThumbnailRange(){if(!this.thumbContainer)return{start:0,end:0};const t=this.thumbContainer.scrollLeft,e=this.thumbContainer.clientWidth,i=Math.max(0,Math.floor(t/(this.thumbnailItemWidth+this.thumbnailGap))-2),s=Math.min(this.images.length-1,Math.ceil((t+e)/(this.thumbnailItemWidth+this.thumbnailGap))+2);return{start:i,end:s}}getInitialThumbnailRange(){const t=this.thumbContainer.clientWidth,e=this.thumbnailItemWidth+this.thumbnailGap,i=Math.ceil(t/e),s=this.options.preloadCount,a=i+s;let n=Math.max(0,this.currentIndex),o=Math.min(this.images.length-1,this.currentIndex+a);return o-n+1<i&&(o===this.images.length-1?n=Math.max(0,o-i+1):o=Math.min(this.images.length-1,n+i-1)),{start:n,end:o}}renderVisibleThumbnails(){if(!this.thumbContainer||!this.thumbnailScrollContainer)return;const{start:t,end:e}=this.getVisibleThumbnailRange();for(const[i,s]of this.renderedThumbnails.entries())(i<t||i>e)&&(s.remove(),this.renderedThumbnails.delete(i));for(let i=t;i<=e;i++)this.renderedThumbnails.has(i)||this.createVirtualThumbnailItem(i);this.virtualListStartIndex=t,this.virtualListEndIndex=e}checkAndAutoLoadThumbnails(t){if(!this.thumbContainer||!this.thumbnailScrollContainer)return;const e=this.thumbnailItemWidth+this.thumbnailGap,i=this.thumbContainer.scrollLeft,s=this.thumbContainer.clientWidth,a=Math.floor(i/e),n=Math.ceil((i+s)/e)-1;if(t<=a+3&&t>0){const o=Math.max(0,(t-3)*e);this.thumbContainer.scrollTo({left:o,behavior:"smooth"})}if(t>=n-3&&t<this.images.length-1){const o=(t-3)*e;this.thumbContainer.scrollTo({left:Math.min(o,this.thumbnailScrollContainer.scrollWidth-s),behavior:"smooth"})}}renderInitialThumbnails(){if(!this.thumbContainer||!this.thumbnailScrollContainer)return;const{start:t,end:e}=this.getInitialThumbnailRange();for(let i=t;i<=e;i++)this.createVirtualThumbnailItem(i);this.virtualListStartIndex=t,this.virtualListEndIndex=e}createVirtualThumbnailItem(t){const e=this.getThumbnailUrl(t),i=this.getImageUrl(t),s=document.createElement("div");s.className=`images-viewer-thumbnail-item ${t===this.currentIndex?"active":""}`,s.dataset.index=t;const a=t*(this.thumbnailItemWidth+this.thumbnailGap);s.style.position="absolute",s.style.left=`${a}px`,s.style.top="0";const n=new Image;n.crossOrigin="anonymous",n.src="";const o=document.createElement("div");o.className="images-viewer-thumbnail-loading",o.innerHTML='<div class="loading-spinner"></div>',s.appendChild(o);const r=this.thumbnailCache.get(e);if(r)n.src=r.src,o.remove();else if(this.loadingThumbnails.has(e)){o.style.display="flex";const h=n.onload;n.onload=()=>{o.remove(),n.onload=null,n.onerror=null,h&&h()},n.onerror=()=>{o.remove(),this.failedThumbnails.add(e),n.onload=null,n.onerror=null,this.options.onThumbnailError&&this.options.onThumbnailError({data:this.images[t],index:t,url:e,img:n})},n.src=e}else this.failedThumbnails.has(e)&&!this.options.retryOnError?o.remove():this.loadedImages.has(i)?(n.src=this.loadedImages.get(i).src,o.remove()):(this.loadingThumbnails.set(e,n),o.style.display="flex",n.onload=()=>{this.thumbnailCache.set(e,n),this.loadingThumbnails.delete(e),this.failedThumbnails.delete(e),o.remove(),n.onload=null,n.onerror=null},n.onerror=()=>{this.loadingThumbnails.delete(e),this.failedThumbnails.add(e),o.remove(),n.onload=null,n.onerror=null,this.options.onThumbnailError&&this.options.onThumbnailError({data:this.images[t],index:t,url:e,img:n})},n.src=e);s.appendChild(n),this.thumbnailScrollContainer.appendChild(s),this.renderedThumbnails.set(t,s)}updateThumbnailDisplay(t){if(!this.thumbContainer)return;const e=this.renderedThumbnails.get(t);if(e){const i=this.getThumbnailUrl(t),s=e.querySelector("img");if(s&&this.thumbnailCache.has(i)){const a=this.thumbnailCache.get(i);s.src=a.src,s.style.display="block";const n=e.querySelector(".images-viewer-thumbnail-loading");n&&n.remove()}}}updateImageTransform(){const t=`
        translate(${this.translateX}px, ${this.translateY}px)
        scale(${this.scale})
        rotate(${this.rotation}deg)
      `;this.image.style.transform=t}fitImageToScreen(t,e){this.scale=1,this.translateX=0,this.translateY=0;const i=this.imageContainer.clientWidth,s=this.imageContainer.clientHeight,a=this.rotation%360;let n=t,o=e;if((a===90||a===270)&&(n=e,o=t),n>i||o>s){const r=i/n,h=s/o;this.scale=Math.min(r,h)}this.scale=Math.max(.1,this.scale),this.updateImageTransform(),this.updateZoomIndicator()}parseImageOptions(t){this.images=[],typeof t=="string"?this.images=[t]:Array.isArray(t)?this.images=t.filter(e=>e!==""):typeof t=="object"&&t.images&&Array.isArray(t.images)&&(this.images=t.images.filter(e=>e!==""))}getImageUrl(t){const e=this.images[t];if(typeof e=="string")return e;if(typeof e=="object"){const i=this.options.props.url;if(typeof i=="function")return i(e,t);if(typeof i=="string"&&e[i])return e[i]}return""}getThumbnailUrl(t){const e=this.images[t];if(typeof e=="object"){const i=this.options.props.thumbnail;if(typeof i=="function")return i(e,t);if(typeof i=="string"&&e[i])return e[i]}return this.getImageUrl(t)}getImageTitle(t){const e=this.images[t];if(typeof e=="object"){const i=this.options.props.title;if(typeof i=="function")return i(e,t);if(typeof i=="string"&&e[i])return e[i]}return""}preloadImages(){const t=this.options.preloadCount;if(t<=0)return;const e=Math.max(0,this.currentIndex-t),i=Math.min(this.images.length-1,this.currentIndex+t);for(let s=e;s<=i;s++)this.loadImageAtIndex(s)}addToCache(t,e){this.loadedImages.set(t,e);const i=this.options.maxCacheSize;if(i>0&&this.loadedImages.size>i){const s=this.loadedImages.keys().next().value;this.loadedImages.delete(s)}}loadImageAtIndex(t){const e=this.getImageUrl(t);if(!e||this.loadedImages.has(e)||this.loadingImages.has(e)||!this.options.retryOnError&&this.failedImages.has(e))return;const i=new Image;i.onload=()=>{this.addToCache(e,i),this.loadingImages.delete(e),this.failedImages.delete(e),this.imageMetadata[t]={name:this.extractFileName(e),width:i.naturalWidth||i.width,height:i.naturalHeight||i.height},i.onload=null,i.onerror=null},i.onerror=()=>{this.loadingImages.delete(e),this.failedImages.add(e),i.onload=null,i.onerror=null;const s=this.getImageUrl(this.currentIndex);e===s&&(this.hideLoading(),this.image.classList.add("loaded"),this.options.onImageError&&this.options.onImageError({data:this.images[t],index:t,url:e,img:this.image})),console.error(`Image loading failed: ${e}`)},i.crossOrigin="anonymous",i.src=e,this.loadingImages.set(e,i)}extractFileName(t){try{const i=new URL(t).pathname.split("/");let s=i[i.length-1];const a=s.indexOf("?");return a>-1&&(s=s.substring(0,a)),s||"unknown-image"}catch{return"unknown-image"}}loadCurrentImage(t,e=!0){if(t!==void 0&&(this.currentIndex=t),this.hasPreviousState=!1,this.isToggledState=!1,this.images.length>1&&this.counter){let a=null;this.options.onCounter&&(a=this.options.onCounter({data:this.images[this.currentIndex],index:this.currentIndex,currentPage:this.currentIndex+1,totalPages:this.images.length,scale:this.scale,rotation:this.rotation})),a?this.counter.innerHTML=a:this.counter.textContent=`${this.currentIndex+1} / ${this.images.length}`}const i=this.getImageTitle(this.currentIndex);this.imageTitle&&i?(this.imageTitle.innerHTML=i,this.imageTitle.style.display="block"):this.imageTitle.style.display="none",this.updateNavButtons(),this.updateThumbnails(e),this.scale=1,this.rotation=0,this.translateX=0,this.translateY=0;const s=this.getImageUrl(this.currentIndex);!this.loadedImages.has(s)&&!this.loadingImages.has(s)&&this.loadImageAtIndex(this.currentIndex),this.preloadAdjacentImages(),this.isImageLoaded()}preloadAdjacentImages(){const e=Math.max(0,this.currentIndex-2),i=Math.min(this.images.length-1,this.currentIndex+2);for(let s=e;s<=i;s++)this.loadThumbnailAtIndex(s);for(let s=e;s<=i;s++)this.loadImageAtIndex(s)}loadThumbnailAtIndex(t){const e=this.getThumbnailUrl(t);if(!e||this.thumbnailCache.has(e)||this.loadingThumbnails.has(e)||!this.options.retryOnError&&this.failedThumbnails.has(e))return;const i=new Image;i.onload=()=>{this.thumbnailCache.set(e,i),this.loadingThumbnails.delete(e),this.failedThumbnails.delete(e),this.updateThumbnailDisplay(t),i.onload=null,i.onerror=null},i.onerror=()=>{this.loadingThumbnails.delete(e),this.failedThumbnails.add(e),i.onload=null,i.onerror=null;let s=null;if(this.thumbContainer){const a=this.renderedThumbnails.get(t);if(a){s=a.querySelector("img");const n=a.querySelector(".images-viewer-thumbnail-loading");n&&n.remove()}}this.options.onThumbnailError?this.options.onThumbnailError({data:this.images[t],index:t,url:e,img:s}):console.error(`Thumbnail load failed: ${e}`)},i.crossOrigin="anonymous",i.src=e,this.loadingThumbnails.set(e,i)}isImageLoaded(){const t=this.getImageUrl(this.currentIndex),e=this.loadedImages.has(t),i=this.loadingImages.has(t),s=this.failedImages.has(t);if(this.showLoading(),this.image.classList.remove("loaded"),this.image.src="",e){const n=this.loadedImages.get(t),o=document.createElement("canvas"),r=o.getContext("2d");o.width=n.naturalWidth||n.width,o.height=n.naturalHeight||n.height,r.drawImage(n,0,0),o.toBlob(c=>{if(c){const l=URL.createObjectURL(c);this.image.onload=()=>{this.image.onload=null},this.image.src=l,this._currentBlobUrl&&(URL.revokeObjectURL(this._currentBlobUrl),this._currentBlobUrl=null),this._currentBlobUrl=l}});const h=this.imageMetadata[this.currentIndex];h&&(this.fitImageToScreen(h.width,h.height),this.updateImageInfo()),this.image.classList.add("loaded"),this.hideLoading();return}if(s&&!this.options.retryOnError){this.hideLoading(),this.image.classList.add("loaded"),this.options.onImageError&&this.options.onImageError({data:this.images[this.currentIndex],index:this.currentIndex,url:t,img:this.image});return}if(i){const n=()=>{const o=this.getImageUrl(this.currentIndex);this.loadedImages.has(t)?t===o&&this.isImageLoaded():this.loadingImages.has(t)?setTimeout(n,100):(this.hideLoading(),t===o&&(this.image.classList.add("loaded"),this.options.onImageError&&this.options.onImageError({data:this.images[this.currentIndex],index:this.currentIndex,url:t,img:this.image})))};setTimeout(n,100);return}const a=new Image;a.onload=()=>{this.addToCache(t,a),this.loadingImages.delete(t),this.imageMetadata[this.currentIndex]={name:this.extractFileName(t),width:a.naturalWidth||a.width,height:a.naturalHeight||a.height},this.isImageLoaded()},a.onerror=()=>{this.loadingImages.delete(t),this.hideLoading();const n=this.getImageUrl(this.currentIndex);t===n&&(this.image.classList.add("loaded"),this.options.onImageError&&this.options.onImageError({data:this.images[this.currentIndex],index:this.currentIndex,url:t,img:this.image}))},a.crossOrigin="anonymous",a.src=t,this.loadingImages.set(t,a)}updateZoomIndicator(){const t=Math.round(this.scale*100);if(this.options.onZoomIndicator){const e=this.options.onZoomIndicator({data:this.images[this.currentIndex],index:this.currentIndex,scale:this.scale,percentage:t,rotation:this.rotation});if(e){this.zoomIndicator.innerHTML=e;return}}this.zoomIndicator.textContent=`${t}%`}updateImageInfo(){if(!this.options.buttons.info||!this.imageInfoPanel)return;const t=this.imageMetadata[this.currentIndex];if(!t)return;const e=this.options.i18n;let i="";if(this.options.onInfo&&(i=this.options.onInfo({data:this.images[this.currentIndex],index:this.currentIndex,metadata:t,scale:this.scale,rotation:this.rotation}),i)){this.imageInfoPanel.innerHTML=i;return}this.options.imageInfo.showName&&(i+=`<p><span class="info-label">${e.info.name}</span> ${t.name}</p>`),this.options.imageInfo.showDimensions&&(i+=`<p><span class="info-label">${e.info.dimensions}</span> ${t.width} × ${t.height}</p>`),i+=`
          <div class="images-viewer-shortcuts-title">${e.info.shortcuts}</div>
          <p><span class="info-label">${e.info.zoomIn}</span> ↑ +</p>
          <p><span class="info-label">${e.info.zoomOut}</span> ↓ -</p>
          <p><span class="info-label">${e.info.prev}</span> ←</p>
          <p><span class="info-label">${e.info.next}</span> →</p>
          <p><span class="info-label">${e.info.reset}</span> 0</p>
          <p><span class="info-label">${e.info.fullscreen}</span> F</p>
          <p><span class="info-label">${e.info.info}</span> I</p>
          <p><span class="info-label">${e.info.close}</span> ESC</p>
        `,this.imageInfoPanel.innerHTML=i}toggleImageInfo(){!this.options.buttons.info||!this.imageInfoPanel||(this.imageInfoVisible=!this.imageInfoVisible,this.imageInfoVisible?this.imageInfoPanel.classList.add("visible"):this.imageInfoPanel.classList.remove("visible"))}updateNavButtons(){if(this.images.length<=1)return;const t=this.options.loop?!0:this.currentIndex>0,e=this.options.loop?!0:this.currentIndex<this.images.length-1;this.prevBtn&&(this.prevBtn.disabled=!t),this.nextBtn&&(this.nextBtn.disabled=!e),this.toolbarPrevBtn&&(this.toolbarPrevBtn.disabled=!t),this.toolbarNextBtn&&(this.toolbarNextBtn.disabled=!e)}updateThumbnails(t=!0){if(!(this.images.length<=1)){for(const[e,i]of this.renderedThumbnails.entries())e===this.currentIndex?i.classList.add("active"):i.classList.remove("active");if(this.thumbContainer){const i=this.currentIndex*(this.thumbnailItemWidth+this.thumbnailGap),s=i+this.thumbnailItemWidth,a=this.thumbContainer.scrollLeft,n=this.thumbContainer.clientWidth;if(i<a||s>a+n){const o=i-(n-this.thumbnailItemWidth)/2;this.thumbContainer.scrollTo({left:Math.max(0,o),behavior:t?"smooth":"auto"})}}}}showLoading(){this.loading&&this.loading.classList.add("active")}hideLoading(){this.loading&&this.loading.classList.remove("active")}prev(){if(this.images.length<=1)return;let t=this.currentIndex-1;t<0&&(t=this.options.loop?this.images.length-1:0);const e=this.currentIndex;t!==this.currentIndex&&(this.currentIndex=t,this.loadCurrentImage()),this.options.onChange&&this.options.onChange({oldIndex:e,index:this.currentIndex,data:this.images[this.currentIndex],direction:"prev",img:this.image,dom:this.container})}next(){if(this.images.length<=1)return;let t=this.currentIndex+1;t>=this.images.length&&(t=this.options.loop?0:this.images.length-1),t!==this.currentIndex&&(this.currentIndex=t,this.loadCurrentImage());const e=this.currentIndex;this.options.onChange&&this.options.onChange({oldIndex:e,index:this.currentIndex,data:this.images[this.currentIndex],index:this.currentIndex,direction:"next",img:this.image,dom:this.container})}bindEvents(){this.topCloseBtn&&this.addEvent(this.topCloseBtn,"click",()=>this.close()),this.options.closeOnMaskClick&&this.addEvent(this.imageContainer,"click",e=>{e.target==this.imageContainer&&this.close()}),this.addEvent(document,"keydown",e=>this.handleKeydown(e));const t=g(()=>{this.handleResize()},300);this.addEvent(window,"resize",t),this.bindDragEvents(),this.bindTouchEvents()}addEvent(t,e,i,s){t.addEventListener(e,i,s);const a=`${e}-${Date.now()}-${Math.random()}`;this.eventListeners.set(a,{element:t,event:e,handler:i})}removeAllEvents(){this.eventListeners.forEach(({element:t,event:e,handler:i})=>{t.removeEventListener(e,i)}),this.eventListeners.clear()}rotatePoint(t,e,i){const s=i*Math.PI,a=Math.cos(s),n=Math.sin(s);return{x:t*a-e*n,y:t*n+e*a}}bindDragEvents(){this.addEvent(this.image,"mousedown",t=>{t.button===0&&(this.isDragging=!0,this.image.classList.add("dragging"),this.startX=t.clientX,this.startY=t.clientY,this.startTranslateX=this.translateX,this.startTranslateY=this.translateY,t.preventDefault())}),this.addEvent(document,"mousemove",t=>{if(!this.isDragging)return;const e=t.clientX-this.startX,i=t.clientY-this.startY,s=this.rotatePoint(e,i,-this.rotation);this.translateX=this.startTranslateX+s.x,this.translateY=this.startTranslateY+s.y,this.updateImageTransform(),this.options.onDrag&&this.options.onDrag({data:this.images[this.currentIndex],index:this.currentIndex,translateX:this.translateX,translateY:this.translateY}),t.preventDefault()}),this.addEvent(document,"mouseup",()=>{this.isDragging&&(this.isDragging=!1,this.image.classList.remove("dragging"))}),this.addEvent(document,"mouseleave",()=>{this.isDragging&&(this.isDragging=!1,this.image.classList.remove("dragging"))}),this.addEvent(this.imageContainer,"wheel",t=>{t.preventDefault();const e=this.imageContainer.getBoundingClientRect(),i=t.clientX-e.left,s=t.clientY-e.top,a=t.deltaY>0?-.05:.05;this.zoomAtPoint(a,i,s)}),this.addEvent(this.image,"dblclick",t=>{t.preventDefault();const e=this.imageContainer.getBoundingClientRect(),i=t.clientX-e.left,s=t.clientY-e.top;if(Math.abs(this.scale-1)<.01)if(this.hasPreviousState)this.scale=this.lastScale,this.translateX=this.lastTranslateX,this.translateY=this.lastTranslateY,this.hasPreviousState=!1;else{this.lastScale=this.scale,this.lastTranslateX=this.translateX,this.lastTranslateY=this.translateY,this.hasPreviousState=!0;const a=1.5,n=this.scale,o=a/n,r=this.imageContainer.clientWidth,h=this.imageContainer.clientHeight;this.translateX=this.translateX*o+i-r/2-o*(i-r/2),this.translateY=this.translateY*o+s-h/2-o*(s-h/2),this.scale=a}else{this.lastScale=this.scale,this.lastTranslateX=this.translateX,this.lastTranslateY=this.translateY,this.hasPreviousState=!0;const a=1,n=this.scale,o=a/n,r=this.imageContainer.clientWidth,h=this.imageContainer.clientHeight;this.translateX=this.translateX*o+i-r/2-o*(i-r/2),this.translateY=this.translateY*o+s-h/2-o*(s-h/2),this.scale=a}this.updateImageTransform(),this.updateZoomIndicator()})}bindTouchEvents(){this.addEvent(this.image,"touchstart",t=>{if(this.touchState.lastTouchTime=Date.now(),t.touches.length===1)this.touchState.isPinching||(this.touchState.isDragging=!0,this.touchState.startX=t.touches[0].clientX,this.touchState.startY=t.touches[0].clientY,this.touchState.startTranslateX=this.translateX,this.touchState.startTranslateY=this.translateY,this.image.classList.add("dragging"));else if(t.touches.length===2){this.touchState.isPinching=!0,this.touchState.isDragging=!1,this.image.classList.remove("dragging");const e=t.touches[0],i=t.touches[1];this.touchState.initialDistance=this.getDistance(e,i),this.touchState.initialScale=this.scale,this.touchState.initialTranslateX=this.translateX,this.touchState.initialTranslateY=this.translateY,this.touchState.centerX=(e.clientX+i.clientX)/2,this.touchState.centerY=(e.clientY+i.clientY)/2;const s=this.imageContainer.getBoundingClientRect(),a=this.touchState.centerX-s.left,n=this.touchState.centerY-s.top;this.calculateRelativeCenter(a,n),this.touchState.movementCount=0,this.touchState.scaleRatio=1}t.preventDefault()}),this.addEvent(this.image,"touchmove",t=>{if(!(Date.now()-this.touchState.lastTouchTime<16)){if(this.touchState.lastTouchTime=Date.now(),t.touches.length===1&&this.touchState.isDragging&&!this.touchState.isPinching){const e=t.touches[0].clientX-this.touchState.startX,i=t.touches[0].clientY-this.touchState.startY,s=this.rotatePoint(e,i,-this.rotation);this.touchState.movementCount++,(this.touchState.movementCount>this.touchState.stabilizationThreshold||Math.abs(e)>5||Math.abs(i)>5)&&(this.translateX=this.touchState.startTranslateX+s.x,this.translateY=this.touchState.startTranslateY+s.y,this.updateImageTransform(),this.options.onDrag&&this.options.onDrag({data:this.images[this.currentIndex],index:this.currentIndex,translateX:this.translateX,translateY:this.translateY}))}else if(t.touches.length===2&&this.touchState.isPinching){const e=t.touches[0],i=t.touches[1],s=this.getDistance(e,i);this.touchState.scaleRatio=s/this.touchState.initialDistance;const a=this.touchState.initialScale*this.touchState.scaleRatio,n=this.options.minScale,o=this.options.maxScale,r=Math.max(n,Math.min(o,a));if(Math.abs(r-this.scale)>this.touchState.minScaleChange){const h=r/this.touchState.initialScale,c=this.imageContainer.getBoundingClientRect(),l=c.width,d=c.height;this.translateX=this.touchState.initialTranslateX*h+this.touchState.centerX-l/2-h*(this.touchState.centerX-l/2),this.translateY=this.touchState.initialTranslateY*h+this.touchState.centerY-d/2-h*(this.touchState.centerY-d/2),this.scale=r,this.updateImageTransform(),this.updateZoomIndicator(),this.options.onZoom&&this.options.onZoom({data:this.images[this.currentIndex],index:this.currentIndex,scale:this.scale,oldScale:this.touchState.initialScale})}}t.preventDefault()}}),this.addEvent(this.image,"touchend",t=>{t.touches.length===0?(this.touchState.isDragging=!1,this.touchState.isPinching=!1,this.image.classList.remove("dragging")):t.touches.length===1&&this.touchState.isPinching&&(this.touchState.isPinching=!1,this.touchState.isDragging=!0,this.touchState.startX=t.touches[0].clientX,this.touchState.startY=t.touches[0].clientY,this.touchState.startTranslateX=this.translateX,this.touchState.startTranslateY=this.translateY,this.image.classList.add("dragging")),t.preventDefault()}),this.addEvent(this.image,"touchcancel",()=>{this.touchState.isDragging=!1,this.touchState.isPinching=!1,this.image.classList.remove("dragging")})}getDistance(t,e){const i=t.clientX-e.clientX,s=t.clientY-e.clientY;return Math.sqrt(i*i+s*s)}calculateRelativeCenter(t,e){if(!this.imageMetadata[this.currentIndex])return;const s=this.imageContainer.clientWidth,a=this.imageContainer.clientHeight,n=s/2,o=a/2,r=t-n-this.translateX,h=e-o-this.translateY;this.touchState.relativeCenterX=r/this.scale,this.touchState.relativeCenterY=h/this.scale}zoomAtPoint(t,e,i){const s=this.scale,a=this.options.maxScale,n=this.options.minScale,o=Math.max(n,Math.min(a,this.scale+t));if(o===this.scale)return;const r=o/s,h=this.imageContainer.clientWidth,c=this.imageContainer.clientHeight;this.translateX=this.translateX*r+e-h/2-r*(e-h/2),this.translateY=this.translateY*r+i-c/2-r*(i-c/2),this.scale=o,this.updateImageTransform(),this.updateZoomIndicator(),this.options.onZoom&&this.options.onZoom({data:this.images[this.currentIndex],index:this.currentIndex,scale:this.scale,oldScale:s})}zoom(t){const e=this.imageContainer.clientWidth,i=this.imageContainer.clientHeight;this.zoomAtPoint(t,e/2,i/2)}rotate(t){const e=this.rotation,i=e+t;if(e===i)return;const s=this.imageContainer.getBoundingClientRect(),a=s.width/2,n=s.height/2,o=a+this.translateX,r=n+this.translateY;this.rotation=i,this.translateX=0,this.translateY=0;const h=this.imageMetadata[this.currentIndex];if(h){const c=this.calculateBoundingBox(h.width,h.height,i),l=c.width*this.scale,d=c.height*this.scale;this.translateX=(o-a)*(l/(l-this.translateX)),this.translateY=(r-n)*(d/(d-this.translateY))}this.updateImageTransform(),this.updateZoomIndicator(),this.options.onRotate&&this.options.onRotate({data:this.images[this.currentIndex],index:this.currentIndex,rotation:this.rotation,oldRotation:e})}calculateBoundingBox(t,e,i){const s=i*Math.PI/180,a=Math.abs(Math.cos(s)),n=Math.abs(Math.sin(s));return{width:t*a+e*n,height:t*n+e*a}}reset(){this.rotation=0;const t=this.imageMetadata[this.currentIndex];t&&this.fitImageToScreen(t.width,t.height)}showOriginalSize(){this.rotation=0,this.scale=1,this.translateX=0,this.translateY=0,this.updateImageTransform(),this.updateZoomIndicator()}downloadImage(){const t=this.getImageUrl(this.currentIndex),e=this.imageMetadata[this.currentIndex];if(this.loadedImages.has(t)){const i=this.loadedImages.get(t);this.downloadFromImage(i,e)}else console.error("Image download failed:",t)}downloadFromImage(t,e){try{const i=document.createElement("canvas");i.width=t.naturalWidth||t.width,i.height=t.naturalHeight||t.height,i.getContext("2d").drawImage(t,0,0);const a=i.toDataURL("image/jpeg");this.downloadedImage(a,e)}catch(i){console.error("Image download failed:",i);const s=this.getImageUrl(this.currentIndex);this.downloadedImage(s,e)}}downloadedImage(t,e){try{const i=document.createElement("a");i.href=t,i.download=e?e.name:"image.jpg",document.body.appendChild(i),i.click(),document.body.removeChild(i)}catch(i){console.error("Original image download failed:",i)}}toggleFullscreen(){document.fullscreenElement?document.exitFullscreen&&(document.exitFullscreen(),this.isFullscreen=!1):(this.container.requestFullscreen().catch(t=>{console.error(`Fullscreen request failed: ${t.message}`)}),this.isFullscreen=!0)}handleKeydown(t){if(this.container.style.display==="block"){switch(t.key){case"Escape":this.close();break;case"ArrowLeft":this.prev();break;case"ArrowRight":this.next();break;case"ArrowUp":case"+":case"=":this.zoom(.1);break;case"ArrowDown":case"-":this.zoom(-.1);break;case"0":this.reset();break;case"f":case"F":this.toggleFullscreen();break;case"i":case"I":this.toggleImageInfo();break}t.preventDefault()}}handleResize(){const t=this.imageMetadata[this.currentIndex];if(!t)return;const e=this.imageContainer.clientWidth,i=this.imageContainer.clientHeight,s=this.rotation%360;let a=t.width,n=t.height;(s===90||s===270)&&(a=t.height,n=t.width);const o=Math.min(e/a,i/n),r=a*this.scale,h=n*this.scale,c=r>e||h>i;let l=this.scale;c?l=Math.max(.1,o):o>=1?l=1:l=o,Math.abs(l-this.scale)>.01&&(this.scale=l,this.translateX=0,this.translateY=0,this.updateImageTransform(),this.updateZoomIndicator()),this.updateThumbnailsOnResize()}updateThumbnailsOnResize(){this.thumbContainer&&this.renderVisibleThumbnails()}onShow(){this.container.style.display="block",setTimeout(()=>{this.container.style.opacity="1",this.options.onShow&&this.options.onShow(this.container)},10)}close(){this.removeAllEvents(),this.cleanup(),this.container.style.opacity="0",setTimeout(()=>{this.container.style.display="none";const t=document.getElementById("images-viewer-styles");t&&t.remove(),this.container&&this.container.remove(),this.options.onClose&&this.options.onClose()},300)}cleanup(){for(const[t,e]of this.loadingImages.entries())e.onload=null,e.onerror=null,e.src="";this.loadedImages.clear(),this.loadingImages.clear(),this.imageMetadata=[],this.thumbnailCache.clear(),this.renderedThumbnails.clear(),this._currentBlobUrl&&(URL.revokeObjectURL(this._currentBlobUrl),this._currentBlobUrl=null)}}function g(m,t){let e,i=0;return function(...s){const a=Date.now(),n=a-i;n>t?(m.apply(this,s),i=a):(clearTimeout(e),e=setTimeout(()=>{m.apply(this,s),i=a},t-n))}}export{p as I};
