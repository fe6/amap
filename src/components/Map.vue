<!-- @format -->

<template>
  <div class="w-map">
    <div class="w-map-container" :id="mapId"></div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { onBeforeMount, onMounted, ref } from 'vue';
  import AMapLoader from '@amap/amap-jsapi-loader';
  import { loadMap } from './utils/load';
  import { useProvideMap } from './use-map';
  import { useProvideGaoDeMap } from './use-gaode-map';
  import { mapProps } from './map-props';

  const theProps = defineProps(mapProps);

  const theEmits = defineEmits(['inited', 'init-error']);

  const theMap = ref<Record<any, any> | any>(null);
  const theGaodeMap = ref<Record<any, any> | any>(null);
  const theWindow = window as Record<any, any>;

  const setScurity = () => {
    if (!theWindow._AMapSecurityConfig) {
      theWindow._AMapSecurityConfig = theProps.securityConfig;
    }
  };

  const initTileLayer = () => {
    if (theProps.tileUrl.length > 0) {
      const layer = new theGaodeMap.value.TileLayer.Flexible({
        cacheSize: 30,
        opacity: 1,
        createTile: function (
          x: number,
          y: number,
          z: number,
          success: any,
          fail: any,
        ) {
          if (z < 15 || z > 19) {
            fail();
            return;
          }

          const img = document.createElement('img');
          img.onload = function () {
            success(img);
          };
          img.crossOrigin = 'anonymous'; // 必须添加，同时图片要有跨域头
          img.onerror = fail;
          img.src = theProps.tileUrl
            .replace(/\$\{x\}/, String(x))
            .replace(/\$\{y\}/, String(y))
            .replace(/\$\{z\}/, String(z));
        },
      });
      theMap.value.addLayer(layer);
    }
  };

  const initTheMap = async () => {
    await loadMap();

    if (theProps.mapKey) {
      AMapLoader.load({
        key: theProps.mapKey, // 申请好的Web端开发者Key，首次调用 load 时必填
        version: theProps.version, // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: theProps.plugins, // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap: Record<any, any>) => {
          const theParams: Record<any, any> = {
            zoom: theProps.zoom,
            zooms: theProps.zooms,
            dragEnable: theProps.dragEnable,
            zoomEnable: theProps.zoomEnable,
            doubleClickZoom: theProps.doubleClickZoom,
            pitch: theProps.pitch,
            pitchEnable: theProps.pitchEnable,
            showLabel: theProps.showLabel,
            animateEnable: theProps.animateEnable,
          };
          if (theProps.center.length > 1) {
            theParams.center = theProps.center;
          }
          if (theProps.viewMode) {
            theParams.viewMode = theProps.viewMode;
          }
          theGaodeMap.value = AMap;
          theMap.value = new AMap.Map(theProps.mapId, theParams);
          theMap.value.on('complete', () => {
            theEmits('inited', theMap, theGaodeMap);
            initTileLayer();
          });

          let timer: any = null;
          theMap.value.on('mapmove', (ev: Record<any, any>) => {
            if (theProps.maxLeave > 0) {
              clearTimeout(timer);
              timer = setTimeout(() => {
                const theDistance = theMap.value
                  .getCenter()
                  .distance(theProps.center);
                if (theDistance > 10000) {
                  theMap.value.setCenter(theProps.center);
                }
              }, 300);
            }
          });
        })
        .catch((e: any) => {
          theEmits('init-error', e);
        });
    }
  };

  defineExpose({
    gaodeMap: computed(() => theGaodeMap.value),
    map: computed(() => theMap.value),
  });

  useProvideMap(theMap);
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
