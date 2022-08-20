<!-- @format -->

<script lang="ts" setup>
  import { onMounted, watch, PropType, ref, computed } from 'vue';
  import { useInjectMap } from './use-map';
  import { useInjectGaoDeMap } from './use-gaode-map';

  const theProps = defineProps({
    southWestLongitude: {
      type: [String, Number],
      default: '',
    },
    southWestLatitude: {
      type: [String, Number],
      default: '',
    },
    northEastLongitude: {
      type: [String, Number],
      default: '',
    },
    northEastLatitude: {
      type: [String, Number],
      default: '',
    },
    editable: {
      type: Boolean,
      default: false,
    },
    defaultEdit: {
      type: Boolean,
      default: true,
    },
    // https://lbs.amap.com/api/javascript-api/reference/overlay#rectangle
    strokeColor: {
      type: String,
      default: '',
    },
    strokeStyle: {
      type: String,
      default: '', // solid | dashed
    },
    strokeWeight: {
      type: Number,
      default: 0,
    },
    strokeOpacity: {
      type: Number,
      default: 1,
    },
    strokeDasharray: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    fillColor: {
      type: String,
      default: '',
    },
    fillOpacity: {
      type: Number,
      default: 1,
    },
    zIndex: {
      type: Number,
      default: 10,
    },
    cursor: {
      type: String,
      default: 'default',
    },
  });
  const theEmits = defineEmits([
    'update:southWestLongitude',
    'update:southWestLatitude',
    'update:northEastLongitude',
    'update:northEastLatitude',
    'change',
  ]);

  const theMap = useInjectMap();
  const theGaodeMap = useInjectGaoDeMap();
  const theRectangle = ref<any>(null);
  const theRectangleEditor = ref<any>(null);

  const emitTheEvent = (event: Record<any, any>) => {
    theEmits('update:northEastLongitude', event.bounds.northEast.lng);
    theEmits('update:northEastLatitude', event.bounds.northEast.lat);
    theEmits('update:southWestLongitude', event.bounds.southWest.lng);
    theEmits('update:southWestLatitude', event.bounds.southWest.lat);
    theEmits('change', event);
  };

  const setEdit = () => {
    if (theGaodeMap.value.RectangleEditor && theProps.editable) {
      theRectangleEditor.value = new theGaodeMap.value.RectangleEditor(
        theMap.value,
        theRectangle.value,
      );
      if (theProps.defaultEdit) {
        theRectangleEditor.value.open();
      }
      theRectangleEditor.value.on('adjust', emitTheEvent);
      theRectangleEditor.value.on('move', emitTheEvent);
    }
  };

  const initRectangle = () => {
    if (
      theMap.value &&
      theProps.southWestLongitude &&
      theProps.southWestLatitude &&
      theProps.northEastLongitude &&
      theProps.northEastLatitude &&
      !theRectangle.value
    ) {
      const southWest = new theGaodeMap.value.LngLat(
        theProps.southWestLongitude,
        theProps.southWestLatitude,
      );
      const northEast = new theGaodeMap.value.LngLat(
        theProps.northEastLongitude,
        theProps.northEastLatitude,
      );
      const bounds = new theGaodeMap.value.Bounds(southWest, northEast);

      theRectangle.value = new theGaodeMap.value.Rectangle({
        bounds,
        strokeColor: theProps.strokeColor,
        strokeWeight: theProps.strokeWeight,
        strokeOpacity: theProps.strokeOpacity,
        strokeDasharray: theProps.strokeDasharray,
        strokeStyle: theProps.strokeStyle,
        fillColor: theProps.fillColor,
        fillOpacity: theProps.fillOpacity,
        cursor: theProps.cursor,
        zIndex: theProps.zIndex,
      });

      theMap.value.add(theRectangle.value);
      // 缩放地图到合适的视野级别
      theMap.value.setFitView([theRectangle.value]);

      setEdit();
    }
  };

  defineExpose({
    rectangle: computed(() => theRectangle.value),
    rectangleEditor: computed(() => theRectangleEditor.value),
  });

  watch(
    [
      () => theProps.southWestLongitude,
      () => theProps.southWestLatitude,
      () => theProps.northEastLongitude,
      () => theProps.northEastLatitude,
    ],
    initRectangle,
  );
  watch([() => theMap.value], initRectangle);

  onMounted(initRectangle);
</script>

<template></template>
