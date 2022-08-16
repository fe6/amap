<!-- @format -->

<template>
  <div class="w-map">
    <div class="w-map-container" :id="vid"></div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import type { PropType } from 'vue';
  import { onBeforeMount, onMounted, ref } from 'vue';
  import { loadMap } from './utils/load';
  import AMapLoader from '@amap/amap-jsapi-loader';

  const theProps = defineProps({
    vid: {
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

  const theMap = ref<any>(null);
  const theWindow = window as any;

  const setScurity = () => {
    if (!theWindow._AMapSecurityConfig) {
      theWindow._AMapSecurityConfig = theProps.securityConfig;
    }
  };

  const initTheMap = async () => {
    const theAMap: any = await loadMap();
    console.log(theAMap.Map, 'theMap');
    console.log(theProps.mapKey, 'theProps.mapKey');
    if (theProps.mapKey) {
      AMapLoader.load({
        key: theProps.mapKey, // 申请好的Web端开发者Key，首次调用 load 时必填
        version: theProps.version, // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: theProps.plugins, // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap: any) => {
          const theParams: any = {
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

          console.log(theParams, 'theParams');
          theMap.value = new AMap.Map(theProps.vid, theParams);
          theEmits('inited', theMap.value);
        })
        .catch((e: any) => {
          theEmits('init-error', e);
        });
    }
    // theMap.value = theAMap.Map('w-map-core', {});
    // console.log(theMap.value, 'theMap.value');
    //  if (this.amapManager) this.amapManager.setMap(this.$amap);
    //  this.$emit(CONST.AMAP_READY_EVENT, this.$amap);
    //  this.$children.forEach(component => {
    //    component.$emit(CONST.AMAP_READY_EVENT, this.$amap);
    //  });
    //  if (this.plugins && this.plugins.length) {
    //    this.addPlugins();
    //  }
  };

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
