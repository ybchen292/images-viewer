# 预览

<p><a style='font-size: 16px;cursor: pointer;' @click="openViewer">单图预览</a></p>
<p><a style='font-size: 16px;cursor: pointer;' @click="openViewer2">多图|自定义按钮|触发事件</a></p>
<p><a style='font-size: 16px;cursor: pointer;' @click="openViewer3">多图|缓存优化|缩略图</a></p>

<script setup>
  import ImagesViewer from '../../index.js';
  const openViewer = () => {
    const viewer = new ImagesViewer('https://picsum.photos/id/237/800/600');
  };
  const openViewer2 = () => {
  const viewer = new ImagesViewer({
      images: [
        'https://picsum.photos/id/20/200/300',
        'https://picsum.photos/id/237/800/600',
        'https://picsum.photos/id/21/200/300',
        'https://picsum.photos/id/22/200/300',
        'https://picsum.photos/id/23/200/300',
        'https://picsum.photos/id/24/200/300',
        'https://picsum.photos/id/25/200/300',
        'https://picsum.photos/id/26/200/300',
        'https://picsum.photos/id/27/200/300',
        'https://picsum.photos/id/28/200/300',
        'https://picsum.photos/id/29/200/300',
        'https://picsum.photos/id/30/200/800',
        'https://picsum.photos/id/31/200/300',
        'https://picsum.photos/id/32/200/300',
        'https://picsum.photos/id/33/200/300',
        'https://picsum.photos/id/34/200/300',
        'https://picsum.photos/id/35/200/300',
        // 'https://picsum.photos/id/1005/1600/900',
      ],
      minScale: 0.3,
      maxScale: 3,
      customButtons: [
        [
          '🔍',
          () => {
            console.log('🔍');
            viewer.loadCurrentImage(1);
          },
        ],
      ],
      onChange: (data) => {
        console.log(data);
      },
      onShow: dom => {
        // 自定义按钮
        const toolbar = dom.querySelector('.images-viewer-toolbar');
        const button = document.createElement('button');
        button.className = 'images-viewer-tool-btn';

        const iconSpan = document.createElement('span');
        iconSpan.textContent = 'test';
        button.appendChild(iconSpan);

        button.addEventListener('click', e => {
          console.log('test');
          // e.stopPropagation();
        });
        toolbar.appendChild(button);
        console.log('onShow', dom);
      },
      onClose: () => {
        console.log('close');
      },
    });
  };
   const openViewer3 = () => {
    const viewer = new ImagesViewer({
      images: [
        {
              url: 'https://picsum.photos/id/20/800/600',
              thumbnail: 'https://picsum.photos/id/20/100/100',
              title: '图片1 - 美丽的风景',
            },
            {
              url: 'https://picsum.photos/id/237/800/600',
              thumbnail: 'https://picsum.photos/id/237/100/100',
              title: '图片2 - 可爱的小狗',
            },
            {
              url: 'https://picsum.photos/id/21/800/600',
              thumbnail: 'https://picsum.photos/id/21/100/100',
              title: '图片3 - 日落美景',
            },
            {
              url: 'https://picsum.photos/id/22/800/600',
              thumbnail: 'https://picsum.photos/id/22/100/100',
              title: '图片4 - 自然风光',
            },
            {
              url: 'https://picsum.photos/id/23/800/600',
              thumbnail: 'https://picsum.photos/id/23/100/100',
              title: '图片5 - 山川河流',
            },
            {
              url: 'https://picsum.photos/id/24/800/600',
              thumbnail: 'https://picsum.photos/id/24/100/100',
              title: '图片6 - 24',
            },
            {
              url: 'https://picsum.photos/id/25/800/600',
              thumbnail: 'https://picsum.photos/id/25/100/100',
              title: '图片7 - 25',
            },
            {
              url: 'https://picsum.photos/id/26/800/600',
              thumbnail: 'https://picsum.photos/id/26/100/100',
              title: '图片8 - 26',
            },
            {
              url: 'https://picsum.photos/id/27/800/600',
              thumbnail: 'https://picsum.photos/id/27/100/100',
              title: '图片9 - 27',
            },
            {
              url: 'https://picsum.photos/id/28/800/600',
              thumbnail: 'https://picsum.photos/id/28/100/100',
              title: '图片10 - 28',
            },
      ],
    theme: {
      thumbItemWidth: '100px',
      thumbItemHeight: '60px',
      thumbMaxWidth: '50%',
    },
       // 预加载数量
     preloadCount: 3,
      maxCacheSize: 40,
    });
  };
</script>