<!-- @format -->

<template>
  <div class="w-map">
    <div class="w-map-container" :id="mapId"></div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { computed, nextTick, watch } from 'vue';
  import { onMounted, ref } from 'vue';
  import { loadMap, theLoadAMap } from './utils/load';
  import { useProvideMap } from './use-map';
  import { useProvideGaoDeMap } from './use-gaode-map';
  import { mapProps } from './map-props';

  const theProps = defineProps(mapProps);

  const theEmits = defineEmits(['inited', 'init-error', 'mapmove']);

  const theMap = ref<Record<any, any> | any>(null);
  const theGaodeMap = ref<Record<any, any> | any>(null);

  // 初始化瓦片图
  const initTileLayer = () => {
    if (theProps.tileUrl.length > 0) {
      const layer = new theGaodeMap.value.TileLayer.Flexible({
        cacheSize: 30,
        opacity: 1,
        createTile: (
          x: number,
          y: number,
          z: number,
          success: any,
          fail: any,
        ) => {
          if (z < 15 || z > 19) {
            fail();
            return;
          }

          const img = document.createElement('img');
          img.onload = () => {
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

  const renderMap = (AMap: Record<any, any>) => {
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
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (theProps.maxLeave > 0) {
          const theDistance = theMap.value
            .getCenter()
            .distance(theProps.center);
          if (theDistance > 10000) {
            theMap.value.setCenter(theProps.center);
          }
        }
        theEmits('mapmove', theMap, theGaodeMap);
      }, 300);
    });
  };

  const initTheMap = async () => {
    if (theProps.mapKey && theProps.forceRender) {
      try {
        loadMap({
          mapKey: theProps.mapKey,
          version: theProps.version,
          securityConfig: {
            securityJsCode: '618328f70209e0ce7566f84258326f5d',
          },
          plugins: theProps.plugins,
        });
      } catch (error) {
        theEmits('init-error', error);
      }
    }
  };

  // 使用统一加载函数的处理
  watch(
    () => theLoadAMap.value,
    () => {
      if (theLoadAMap.value) {
        renderMap(theLoadAMap.value);
      }
    },
  );
  watch(
    () => theProps.forceRender,
    () => {
      if (theLoadAMap.value) {
        renderMap(theLoadAMap.value);
      } else {
        initTheMap();
      }
    },
  );

  defineExpose({
    gaodeMap: computed(() => theGaodeMap.value),
    map: computed(() => theMap.value),
  });

  useProvideMap(theMap);
  useProvideGaoDeMap(theGaodeMap);

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
