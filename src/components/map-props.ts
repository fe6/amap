/** @format */

import { PropType } from 'vue';
export const mapProps = {
  mapId: {
    type: String,
    default: 'amap',
  },
  mapKey: {
    type: String,
    default: '',
  },
  // https://lbs.amap.com/api/jsapi-v2/guide/abc/load
  securityConfig: {
    type: Object,
    default: () => ({}),
  },
  version: {
    type: String,
    default: '2.0',
  },
  plugins: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  zoom: {
    type: Number,
    default: 14,
  },
  // https://lbs.amap.com/api/javascript-api/reference/map
  zooms: {
    type: Array as PropType<number[]>,
    default: () => [2, 20],
  },
  center: {
    type: Array as PropType<string[] | number[]>,
    default: () => [],
  },
  viewMode: {
    type: String,
    default: '', // 3D
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  dragEnable: {
    type: Boolean,
    default: true,
  },
  zoomEnable: {
    type: Boolean,
    default: true,
  },
  doubleClickZoom: {
    type: Boolean,
    default: true,
  },
  pitch: {
    type: Number,
    default: 0,
  },
  pitchEnable: {
    type: Boolean,
    default: true,
  },
  animateEnable: {
    type: Boolean,
    default: false,
  },
  tileUrl: {
    type: String,
    default: '',
  },
  maxLeave: {
    type: Number,
    default: 0,
  },
  forceRender: {
    type: Boolean,
    default: true,
  },
};
