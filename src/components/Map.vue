<!-- @format -->

<template>
  <div class="w-map">
    <div class="w-map-container" :id="mapId"></div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import type { PropType } from 'vue';
  import { onBeforeMount, onMounted, ref } from 'vue';
  import AMapLoader from '@amap/amap-jsapi-loader';
  import { loadMap } from './utils/load';
  import { useProvideMap } from './use-map';
  import { useProvideGaoDeMap } from './use-gaode-map';

  const theProps = defineProps({
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
      default: () => [],
    },
    center: {
      type: Array as PropType<string[] | number[]>,
      default: () => [],
    },
    viewMode: {
      type: String,
      default: '', // 3D
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
  });

  const theEmits = defineEmits(['inited', 'init-error']);

  const theMap = ref<Record<any, any>>(null);
  const theGaodeMap = ref<Record<any, any>>(null);
  const theWindow = window as Record<any, any>;

  const setScurity = () => {
    if (!theWindow._AMapSecurityConfig) {
      theWindow._AMapSecurityConfig = theProps.securityConfig;
    }
  };

  const initTheMap = async () => {
    const theAMap: Record<any, any> = await loadMap();

    if (theProps.mapKey) {
      AMapLoader.load({
        key: theProps.mapKey, // 申请好的Web端开发者Key，首次调用 load 时必填
        version: theProps.version, // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: theProps.plugins, // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap: Record<any, any>) => {
          const theParams: Record<any, any> = {
            zoom: theProps.zoom,
            dragEnable: theProps.dragEnable,
            zoomEnable: theProps.zoomEnable,
            doubleClickZoom: theProps.doubleClickZoom,
            pitch: theProps.pitch,
            pitchEnable: theProps.pitchEnable,
          };
          if (theProps.center.length > 1) {
            theParams.center = theProps.center;
          }
          if (theProps.viewMode) {
            theParams.viewMode = theProps.viewMode;
          }

          theGaodeMap.value = AMap;
          theMap.value = new AMap.Map(theProps.mapId, theParams);
          theEmits('inited', theMap, theGaodeMap);
        })
        .catch((e: any) => {
          theEmits('init-error', e);
        });
    }
  };

  useProvideMap(theMap, theProps.mapId);
  useProvideGaoDeMap(theGaodeMap);

  onBeforeMount(setScurity);
  onMounted(initTheMap);
</script>
<style>
  .w-map {
    width: 100%;
    height: 100%;
  }
  .w-map-container {
    width: 100%;
    height: 100%;
  }
</style>
