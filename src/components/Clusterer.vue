<!-- @format -->

<script lang="ts" setup>
  import { onMounted, PropType } from 'vue';
  import { watch, ref } from 'vue';
  import { useInjectMap } from './use-map';
  import { useInjectGaoDeMap } from './use-gaode-map';

  // https://lbs.amap.com/api/javascript-api/reference/overlay#marker
  const theProps = defineProps({
    value: {
      type: Array as PropType<string[] | number[]>,
      default: () => [],
    },
    points: {
      type: Object as PropType<Record<any, any>>,
      default: () => [],
    },
    gridSize: {
      type: Number,
      default: 80,
    },
    // https://lbs.amap.com/demo/jsapi-v2/example/mass-markers/markerclusterer
    // https://lbs.amap.com/api/javascript-api/reference/plugin/#AMap.MarkerClusterer
    // 自定义聚合点样式
    renderClusterMarker: {
      type: Function as PropType<
        (
          context: Record<any, any>,
          theGaodeMap: Record<any, any>,
          theMap: Record<any, any>,
        ) => void
      >,
      default: undefined,
    },
    // 自定义非聚合点样式
    renderMarker: {
      type: Function,
      default: undefined,
    },
    styles: {
      type: Function,
      default: undefined,
    },
  });

  const theEmits = defineEmits(['click']);

  const theMap = useInjectMap();
  const theGaodeMap = useInjectGaoDeMap();
  const theClusterer = ref<any>(null);

  const initClusterer = () => {
    if (theGaodeMap.value && theProps.points.length > 0) {
      const theParams: Record<any, any> = {
        gridSize: theProps.gridSize,
      };

      if (typeof theProps.renderClusterMarker === 'function') {
        theParams.renderClusterMarker = (context: Record<any, any>) => {
          (theProps.renderClusterMarker as any)(context, theGaodeMap, theMap);
        };
      }

      if (typeof theProps.renderMarker === 'function') {
        theParams.renderMarker = (context: Record<any, any>) => {
          (theProps.renderMarker as any)(context, theGaodeMap, theMap);
        };
      }

      if (typeof theProps.styles === 'function') {
        theParams.styles = theProps.styles(theGaodeMap, theMap);
      }

      theClusterer.value = new theGaodeMap.value.MarkerClusterer(
        theMap.value,
        theProps.points,
        theParams,
      );
      theClusterer.value.on('click', (clickv: Record<any, any>) => {
        let curZoom = theMap.value.getZoom();
        if (curZoom < 20) {
          curZoom += 1;
        }
        theMap.value.setZoomAndCenter(curZoom, clickv.lnglat);
        theEmits('click', clickv, theGaodeMap, theMap);
      });
    }
  };

  defineExpose({});

  watch(() => theGaodeMap.value, initClusterer);
  watch(() => theProps.points, initClusterer);

  onMounted(initClusterer);
</script>

<template></template>
