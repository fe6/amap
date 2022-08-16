<!-- @format -->

<script lang="ts" setup>
  import type { PropType } from 'vue';
  import { watchEffect, watch, ref } from 'vue';
  import { useInjectMap } from './use-map';
  import { useInjectGaoDeMap } from './use-gaode-map';

  const theProps = defineProps({
    position: {
      type: Array as PropType<string[] | number[]>,
      default: () => [],
    },
    icon: {
      type: String,
      default: '',
    },
    offsetX: {
      type: [Number, undefined],
      default: 0,
    },
    offsetY: {
      type: Number,
      default: 0,
    },
  });

  const theMap = useInjectMap();
  const theGaodeMap = useInjectGaoDeMap();
  const theMarker = ref(null);

  const initMarker = () => {
    if (theMap.value) {
      const theParams: Record<any, any> = {
        position: theProps.position,
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
    }
  };

  watchEffect(initMarker);
</script>

<template></template>
