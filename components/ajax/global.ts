/** @format */

import axios from 'axios';
import { onDefHttp } from './http';

// 获取全量三级地域数据
export function getReginTree(theApiUrl: string, theReginInnerPath: string) {
  return onDefHttp(theApiUrl).request({
    url: theReginInnerPath,
    method: 'GET',
  });
}

// 高德搜索接口
// https://lbs.amap.com/api/webservice/guide/api/georegeo/
export function getGaodeSearch(params: any) {
  return axios.get('https://restapi.amap.com/v3/geocode/geo', { params });
}

// 高德搜索接口
// https://lbs.amap.com/api/webservice/guide/api/georegeo/
export function getGaodeGetPoi(params: any) {
  return axios.get('https://restapi.amap.com/v3/geocode/regeo', { params });
}
