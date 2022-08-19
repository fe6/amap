/** @format */

import type { ComputedRef } from 'vue';
import { computed, inject, provide } from 'vue';

const gaodeMapProvider = Symbol('GaoDeMapProvider');

const useProvideGaoDeMap = (theGaoDeMap: Record<any, any>): ComputedRef => {
  const gaodeMap = computed(() => {
    return theGaoDeMap.value;
  });
  provide(gaodeMapProvider, gaodeMap);
  return gaodeMap;
};

const useInjectGaoDeMap = (): ComputedRef => {
  const gaodeMap: ComputedRef = inject(
    gaodeMapProvider,
    computed(() => null),
  );
  return gaodeMap;
};

export { useInjectGaoDeMap, gaodeMapProvider, useProvideGaoDeMap };

export default useProvideGaoDeMap;
