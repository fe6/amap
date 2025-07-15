/** @format */

import AMapLoader from '@amap/amap-jsapi-loader';
import { ref } from 'vue';

export const theLoadAMap = ref<any>(null);
const theWindow = window as Record<any, any>;

export interface ILoadMap {
  mapKey: string;
  securityConfig: { securityJsCode: string };
  plugins?: string[];
  version?: string;
}

export const loadMap = (params: ILoadMap, timeout = 8000): Promise<any> => {
  if (!theWindow._AMapSecurityConfig) {
    theWindow._AMapSecurityConfig = params.securityConfig;
  }

  let timeoutId: ReturnType<typeof setTimeout>;

  const loadPromise = AMapLoader.load({
    key: params.mapKey,
    version: params.version || '2.0',
    plugins: params.plugins || [],
  }).then((AMap: Record<any, any>) => {
    clearTimeout(timeoutId); // ✅ 清除超时定时器
    theLoadAMap.value = AMap;
    return AMap;
  });

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error('高德地图：AMap 加载超时（可能是 key 无效或网络异常）'));
    }, timeout);
  });

  return Promise.race([loadPromise, timeoutPromise]);
};
