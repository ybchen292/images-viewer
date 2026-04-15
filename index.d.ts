/**
 * 图片对象类型
 */
export interface ImageObject {
  /**
   * 图片 URL
   */
  url: string;
  /**
   * 图片标题
   */
  title?: string;
  /**
   * 缩略图 URL
   */
  thumbnail?: string;
  /**
   * 其他自定义属性
   */
  [key: string]: any;
}

/**
 * 旋转事件参数
 */
export interface RotateEventData {
  /**
   * 当前图片数据
   */
  data: string | ImageObject;
  /**
   * 当前图片索引
   */
  index: number;
  /**
   * 当前旋转角度
   */
  rotation: number;
  /**
   * 旧的旋转角度
   */
  oldRotation: number;
}

/**
 * 拖动事件参数
 */
export interface DragEventData {
  /**
   * 当前图片数据
   */
  data: string | ImageObject;
  /**
   * 当前图片索引
   */
  index: number;
  /**
   * 当前 X 轴偏移量
   */
  translateX: number;
  /**
   * 当前 Y 轴偏移量
   */
  translateY: number;
}

/**
 * 缩放事件参数
 */
export interface ZoomEventData {
  /**
   * 当前图片数据
   */
  data: string | ImageObject;
  /**
   * 当前图片索引
   */
  index: number;
  /**
   * 当前缩放比例
   */
  scale: number;
  /**
   * 旧的缩放比例
   */
  oldScale: number;
}

/**
 * 切换事件参数
 */
export interface ChangeEventData {
  /**
   * 当前图片索引
   */
  index: number;
  /**
   * 旧的图片索引
   */
  oldIndex: number;
  /**
   * 切换方向
   */
  direction: 'next' | 'prev';
  /**
   * 当前图片数据
   */
  data: string | ImageObject;
  /**
   * 当前图片 DOM 元素
   */
  img: HTMLImageElement;
  /**
   * 查看器容器 DOM 元素
   */
  dom: HTMLDivElement;
}

/**
 * 信息栏自定义函数参数
 */
export interface InfoTextParams {
  /**
   * 当前图片数据
   */
  data: string | ImageObject;
  /**
   * 当前图片索引
   */
  index: number;
  /**
   * 图片元数据
   */
  metadata: {
    name: string;
    width: number;
    height: number;
  };
  /**
   * 当前缩放比例
   */
  scale: number;
  /**
   * 当前旋转角度
   */
  rotation: number;
}

/**
 * 页数显示自定义函数参数
 */
export interface CounterParams {
  /**
   * 当前图片数据
   */
  data: string | ImageObject;
  /**
   * 当前图片索引
   */
  index: number;
  /**
   * 当前页码（从1开始）
   */
  currentPage: number;
  /**
   * 总页数
   */
  totalPages: number;
  /**
   * 当前缩放比例
   */
  scale: number;
  /**
   * 当前旋转角度
   */
  rotation: number;
}

/**
 * 缩放指数自定义函数参数
 */
export interface ZoomIndicatorParams {
  /**
   * 当前图片数据
   */
  data: string | ImageObject;
  /**
   * 当前图片索引
   */
  index: number;
  /**
   * 当前缩放比例
   */
  scale: number;
  /**
   * 缩放百分比（scale × 100）
   */
  percentage: number;
  /**
   * 当前旋转角度
   */
  rotation: number;
}

/**
 * 错误回调参数
 */
export interface ErrorCallbackParams {
  /**
   * 当前图片数据
   */
  data: string | ImageObject;
  /**
   * 当前图片索引
   */
  index: number;
  /**
   * 加载失败的图片 URL
   */
  url: string;
  /**
   * 对应的图片或缩略图 DOM 元素
   */
  img: HTMLImageElement | null;
}

/**
 * ImagesViewer 配置选项
 */
interface ImagesViewerOptions {
  /**
   * 图片数组或单张图片 URL
   */
  images?: string | string[] | ImageObject[];

  /**
   * 初始图片索引
   * @default 0
   */
  initialIndex?: number;

  /**
   * 点击遮罩关闭查看器
   * @default false
   */
  closeOnMaskClick?: boolean;

  /**
   * 循环浏览图片
   * @default true
   */
  loop?: boolean;

  /**
   * 预加载相邻图片数量
   * @default 3
   */
  preloadCount?: number;

  /**
   * 最大缓存图片数量
   * @default 30
   */
  maxCacheSize?: number;

  /**
   * 最小缩放比例
   * @default 0.1
   */
  minScale?: number;

  /**
   * 最大缩放比例
   * @default 5
   */
  maxScale?: number;

  /**
   * 按钮配置
   */
  buttons?: {
    /** 放大按钮 */
    zoomIn?: boolean;
    /** 缩小按钮 */
    zoomOut?: boolean;
    /** 左旋转按钮 */
    rotateLeft?: boolean;
    /** 右旋转按钮 */
    rotateRight?: boolean;
    /** 重置按钮 */
    reset?: boolean;
    /** 下载按钮 */
    download?: boolean;
    /** 全屏按钮 */
    fullscreen?: boolean;
    /** 上一张按钮 */
    prev?: boolean;
    /** 下一张按钮 */
    next?: boolean;
    /** 关闭按钮 */
    close?: boolean;
    /** 右上角关闭按钮 */
    topClose?: boolean;
    /** 缩略图导航 */
    thumbnails?: boolean;
    /** 信息面板 */
    info?: boolean;
    /** 原始尺寸按钮 */
    originalSize?: boolean;
  };

  /**
   * 自定义按钮数组
   * @example [['🔍', () => console.log('custom')]]
   */
  customButtons?: Array<[string, () => void]>;

  /**
   * 图片信息显示配置
   */
  imageInfo?: {
    /** 默认显示信息面板 */
    visible?: boolean;
    /** 显示文件名 */
    showName?: boolean;
    /** 显示图片尺寸 */
    showDimensions?: boolean;
  };

  /**
   * 图片信息显示配置
   */
  props?: {
    /** 图片 URL 的属性名或获取函数 */
    url?: string | ((item: any, index: number) => string);
    /** 图片标题的属性名或获取函数 */
    title?: string | ((item: any, index: number) => string);
    /** 缩略图 URL 的属性名或获取函数 */
    thumbnail?: string | ((item: any, index: number) => string);
  };

  /**
   * 是否在失败后重新请求
   * @default false
   */
  retryOnError?: boolean;

  /**
   * 图片加载失败回调
   */
  onImageError?: (data: ErrorCallbackParams) => void;

  /**
   * 缩略图加载失败回调
   */
  onThumbnailError?: (data: ErrorCallbackParams) => void;

  /**
   * 查看器显示时的回调
   */
  onShow?: (container: HTMLDivElement) => void;

  /**
   * 查看器关闭时的回调
   */
  onClose?: () => void;

  /**
   * 图片切换时的回调
   */
  onChange?: (data: ChangeEventData) => void;

  /**
   * 图片拖动时的回调
   */
  onDrag?: (data: DragEventData) => void;

  /**
   * 图片缩放时的回调
   */
  onZoom?: (data: ZoomEventData) => void;

  /**
   * 图片旋转时的回调
   */
  onRotate?: (data: RotateEventData) => void;

  /**
   * 自定义信息栏文本
   */
  onInfo?: (data: InfoTextParams) => string | null | undefined;

  /**
   * 自定义页数显示
   */
  onCounter?: (data: CounterParams) => string | null | undefined;

  /**
   * 自定义缩放指示器
   */
  onZoomIndicator?: (data: ZoomIndicatorParams) => string | null | undefined;

  /**
   * 国际化配置
   */
  i18n?: {
    /** 信息栏文本 */
    info?: {
      /** 名称标签 */
      name?: string;
      /** 尺寸标签 */
      dimensions?: string;
      /** 快捷键标题 */
      shortcuts?: string;
      /** 放大标签 */
      zoomIn?: string;
      /** 缩小标签 */
      zoomOut?: string;
      /** 上一张标签 */
      prev?: string;
      /** 下一张标签 */
      next?: string;
      /** 重置标签 */
      reset?: string;
      /** 全屏标签 */
      fullscreen?: string;
      /** 信息标签 */
      info?: string;
      /** 关闭标签 */
      close?: string;
    };
    /** 按钮文本 */
    buttons?: {
      /** 上一张按钮文本 */
      prev?: string;
      /** 下一张按钮文本 */
      next?: string;
      /** 关闭按钮文本 */
      close?: string;
    };
  };

  /**
   * 主题配置
   */
  theme?: {
    /** 背景相关 */
    viewerBgColor?: string;

    /** 工具栏相关 */
    toolbarBgColor?: string;
    toolbarBorderRadius?: string;
    toolbarPadding?: string;
    toolbarBottom?: string;

    /** 按钮相关 */
    buttonBgColor?: string;
    buttonHoverBg?: string;
    buttonSize?: string;
    buttonFontSize?: string;
    buttonBorderRadius?: string;

    /** 导航按钮相关 */
    navButtonBgColor?: string;
    navButtonHoverBg?: string;
    navButtonSize?: string;
    navButtonFontSize?: string;
    navButtonBorderRadius?: string;

    /** 右上角关闭按钮 */
    topCloseBtnSize?: string;
    topCloseBtnTop?: string;
    topCloseBtnRight?: string;
    topCloseBtnFontSize?: string;
    topCloseBtnBgColor?: string;
    topCloseBtnHoverBg?: string;

    /** 信息栏相关 */
    infoBgColor?: string;
    infoBorderRadius?: string;
    infoPadding?: string;
    infoFontSize?: string;
    infoTop?: string;
    infoLeft?: string;

    /** 缩放指示器 */
    zoomIndicatorBg?: string;
    zoomIndicatorBorderRadius?: string;
    zoomIndicatorPadding?: string;
    zoomIndicatorFontSize?: string;
    zoomIndicatorTop?: string;
    zoomIndicatorLeft?: string;

    /** 通用 */
    activeColor?: string;
    textColor?: string;
    shadowColor?: string;
    transitionSpeed?: string;

    /** 缩略图 */
    thumbItemWidth?: string;
    thumbItemHeight?: string;
    thumbGap?: string;
    thumbPadding?: string;
    thumbMaxWidth?: string;
  };
}

/**
 * ImagesViewer 图片查看器
 *
 * @example
 * ```javascript
 * // 单张图片
 * const viewer1 = new ImagesViewer('single-image.jpg');
 *
 * // 多张图片
 * const viewer2 = new ImagesViewer({
 *   images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
 * });
 *
 * // 数组形式
 * const viewer3 = new ImagesViewer(['img1.jpg', 'img2.jpg']);
 * ```
 */
declare class ImagesViewer {
  /**
   * 创建 ImagesViewer 实例
   * @param options 配置选项或图片 URL/数组
   */
  constructor(options?: ImagesViewerOptions | string | string[]);

  /**
   * 加载下一张图片
   */
  next(): void;

  /**
   * 加载上一张图片
   */
  prev(): void;

  /**
   * 加载指定索引的图片
   * @param index 图片索引
   */
  loadCurrentImage(index?: number): void;

  /**
   * 缩放图片
   * @param delta 缩放变化量（正数放大，负数缩小）
   */
  zoom(delta: number): void;

  /**
   * 旋转图片
   * @param degrees 旋转角度（度）
   */
  rotate(degrees: number): void;

  /**
   * 重置图片变换（缩放、旋转、平移）
   */
  reset(): void;

  /**
   * 显示原始尺寸
   */
  showOriginalSize(): void;

  /**
   * 切换全屏模式
   */
  toggleFullscreen(): void;

  /**
   * 切换图片信息显示
   */
  toggleImageInfo(): void;

  /**
   * 关闭查看器
   */
  close(): void;

  /**
   * 下载当前图片
   */
  downloadImage(): void;
}

export default ImagesViewer;
export { ImagesViewer, ImagesViewerOptions };
// 全局变量声明（用于UMD模块）
declare global {
  interface Window {
    ImagesViewer?: typeof ImagesViewer;
  }
}
