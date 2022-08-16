/** @format */

import AMapLoader from '@amap/amap-jsapi-loader';

export const loadMap = () => {
  return new Promise((resolve, reject) => {
    AMapLoader.load({
      key: 'e37740bc1cc102bdc13fe10b02d82de6', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        resolve(AMap);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
