/** @format */

import { version } from '../../package.json';

export default {
  title: 'AMap',
  description: '高德的小组件们',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '文档', link: '/demos/getting-started', activeMatch: '/demos/' },
      { text: '配置', link: '/configs/map', activeMatch: '/configs/' },
      {
        text: version,
        items: [{ text: '更改日志', link: '/demos/getting-started' }],
      },
    ],
    sidebar: {
      '/demos/': [
        {
          text: '开始',
          items: [{ text: '快速上手', link: '/demos/getting-started' }],
        },
        {
          text: '基础',
          items: [
            { text: '快速开始', link: '/demos/base' },
            { text: '设置中心点', link: '/demos/base-center' },
            { text: '不能拖拽', link: '/demos/base-no-drag' },
            { text: '不能缩放', link: '/demos/base-no-zoom' },
            { text: '默认缩放级别', link: '/demos/base-zoom' },
            { text: '缩放范围', link: '/demos/base-zooms' },
          ],
        },
        {
          text: '点标记',
          items: [
            { text: '点标记', link: '/demos/marker' },
            { text: '图片点标记', link: '/demos/marker-img' },
            { text: '拖拽点标记', link: '/demos/marker-drag' },
          ],
        },
        {
          text: '点聚合',
          items: [
            { text: '点聚合', link: '/demos/clusterer' },
            { text: '图片点聚合', link: '/demos/clusterer-img' },
            { text: '完全自定义', link: '/demos/clusterer-customer' },
          ],
        },
        {
          text: '进阶',
          items: [
            { text: '搜索', link: '/demos/more-search' },
            { text: '矩形', link: '/demos/more-rectangle' },
            { text: '可编辑矩形', link: '/demos/more-rectangle-edit' },
            { text: '瓦片图', link: '/demos/more-tile' },
            { text: '弹框', link: '/demos/more-modal' },
            { text: '两个地图', link: '/demos/more-two' },
          ],
        },
      ],
      '/configs/': [
        {
          text: '配置',
          items: [
            { text: 'Map', link: '/configs/map' },
            { text: 'MapMarker', link: '/configs/marker' },
            { text: 'MapClusterer', link: '/configs/clusterer' },
            { text: 'MapRectangle', link: '/configs/rectangle' },
            { text: 'MapSearch', link: '/configs/search' },
          ],
        },
      ],
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present 李梦龙',
    },
  },
  markdown: {
    lineNumbers: true,
  },
};
