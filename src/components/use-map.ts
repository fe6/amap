/** @format */

import type { ComputedRef, UnwrapRef } from 'vue';
import { computed, inject, provide } from 'vue';

const mapProvider = Symbol('MapProvider');
const theMaps: Record<any, any> = {};

const useProvideMap = (
  theMap: Record<any, any>,
  mapId: string | number,
): ComputedRef => {
  const map = computed(() => {
    if (!theMaps?.[mapId]) {
      theMaps[mapId] = theMap.value;
    }
    return theMaps[mapId];
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
