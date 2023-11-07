/** @format */

import { message } from '@fe6/water-pro';
import { createTheHttp, httpTransformHandler } from '@fe6/http';

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: any = {
  transformRequestInner: (() => {
    // loadingStore.$patch((state) => {
    //   state.pageLoading = false;
    // });
  }) as any,
  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config: any) => {
    return config;
  },
};

export function onGetApi(): any {
  // @ts-ignore
  return import.meta.env ? import.meta.env.VITE_API : VITE_API;
}

export const onDefHttp: any = (theApiUrl?: string) => {
  const axiosConf = {
    apiUrl: theApiUrl, //'https://restapi.amap.com',
    isDevMode: () => false,
    // TODO 状态判断处理
    // TODO code 13000 系统错误
    // TODO code=11002  用户禁用
    successCode: 10000,
    errorLog: () => '',
    errorModal: message.error,
    errorMsg: message.error,
    statusHooks: (_: string, status: number) => {},
  };
  return createTheHttp({
    ...axiosConf,
    transform: Object.assign(httpTransformHandler(axiosConf), transform),
  });
};
