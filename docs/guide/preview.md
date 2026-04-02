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
      change: (index, direction) => {
        console.log(index, direction);
      },
      show: dom => {
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
        console.log('show', dom);
      },
      close: () => {
        console.log('close');
      },
    });
  };
   const openViewer3 = () => {
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
    theme: {
      thumbItemWidth: '100px',
      thumbItemHeight: '60px',
      thumbMaxWidth: '50%',
    },
       // 预加载数量
     preloadCount: 5,
      maxCacheSize: 40,
    });
  };
</script>