/** @format */

import type { ComputedRef } from 'vue';
import { computed, inject, provide } from 'vue';

const mapProvider = Symbol('MapProvider');

const useProvideMap = (theMap: Record<any, any>): ComputedRef => {
  const map = computed(() => {
    return theMap.value;
  });
  provide(mapProvider, map);
  return map;
};

const useInjectMap = (): ComputedRef => {
  const map: ComputedRef = inject(
    mapProvider,
    computed(() => null),
  );
  return map;
};

export { useInjectMap, mapProvider, useProvideMap };

export default useProvideMap;
