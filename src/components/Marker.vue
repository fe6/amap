<!-- @format -->

<script lang="ts" setup>
  import { onMounted, PropType } from 'vue';
  import { watchEffect, watch, ref } from 'vue';
  import { useInjectMap } from './use-map';
  import { useInjectGaoDeMap } from './use-gaode-map';

  // https://lbs.amap.com/api/javascript-api/reference/overlay#marker
  const theProps = defineProps({
    value: {
      type: Array as PropType<string[] | number[]>,
      default: () => [],
    },
    icon: {
      type: String,
      default: '',
    },
    offsetX: {
      type: Number,
      default: 0,
    },
    offsetY: {
      type: Number,
      default: 0,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    cursor: {
      type: String,
      default: 'default',
    },
    visible: {
      type: Boolean,
      default: true,
    },
    clickable: {
      type: Boolean,
      default: true,
    },
  });

  const theEmits = defineEmits(['update:value', 'drag-end', 'click']);

  const theMap = useInjectMap();
  const theGaodeMap = useInjectGaoDeMap();
  const theMarker = ref<any>(null);

  const markerDragEnd = (dragEv: Record<any, any>) => {
    const { lnglat } = dragEv;
    const thePoi = [lnglat.lng, lnglat.lat];
    theEmits('update:value', thePoi);
    theEmits('drag-end', thePoi, dragEv);
  };

  const initMarker = () => {
    if (theMap.value) {
      const theParams: Record<any, any> = {
        position: theProps.value,
        draggable: theProps.draggable,
        cursor: theProps.cursor,
        visible: theProps.visible,
      };

      if (theProps.icon) {
        theParams.icon = theProps.icon;
      }

      if (theProps.offsetX !== undefined && theProps.offsetY !== undefined) {
        theParams.offset = new theGaodeMap.value.Pixel(
          theProps.offsetX,
          theProps.offsetY,
        );
      }

      theMarker.value = new theGaodeMap.value.Marker(theParams);
      theMarker.value.setMap(theMap.value);

      theMarker.value.on('dragend', markerDragEnd);
      theMarker.value.on('click', (clickv: Record<any, any>) => {
        theEmits('click', clickv);
      });
    }
  };

  defineExpose({
    marker: theMarker.value,
  });

  watch(() => theMap.value, initMarker);

  onMounted(initMarker);
</script>

<template></template>
