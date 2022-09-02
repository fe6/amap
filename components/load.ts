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

export const loadMap = (params: ILoadMap) => {
  if (!theWindow._AMapSecurityConfig) {
    theWindow._AMapSecurityConfig = params.securityConfig;
  }
  return new Promise((resolve, reject) => {
    AMapLoader.load({
      key: params.mapKey, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: params.version || '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: params.plugins, // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: Record<any, any>) => {
        theLoadAMap.value = AMap;
        resolve(AMap);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
