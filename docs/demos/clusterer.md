# 点聚合

点聚合需要借助 **MapClusterer** 组件以及 [AMap.MarkerClusterer](https://lbs.amap.com/api/javascript-api/reference/plugin#AMap.MarkerClusterer)插件完成。 [points](https://a.amap.com/jsapi_demos/static/china.js)是外部引入的点的数据。[官方例子](https://lbs.amap.com/demo/jsapi-v2/example/mass-markers/markerclusterer)

<script setup lang="ts">
  import { Map, MapClusterer } from '../../components';
  import { points } from '../datas/china';
</script>

<style scoped>
  .the-map {
    width: 100%;
    height: 500px;
  }
</style>

<div class="the-map">
  <Map
    map-key="e37740bc1cc102bdc13fe10b02d82de6"
    :center="[105, 34]"
    :zoom="4"
    :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
    :plugins="['AMap.MarkerClusterer']"
  >
    <MapClusterer :points="points" />
  </Map>
</div>

::: details 源码
```html{2,4,20,22}
<script setup lang="ts">
  import { Map, MapClusterer } from '@fe6/amap';
  // https://a.amap.com/jsapi_demos/static/china.js
  import { points } from '../datas/china';
</script>

<style scoped>
  .the-map {
    width: 100%;
    height: 500px;
  }
</style>

<template>
  <div class="the-map">
    <Map
      map-key="您申请的key值"
      :securityConfig="{ securityJsCode: '您申请的安全密钥' }"
      :center="[105, 34]"
      :plugins="['AMap.MarkerClusterer']"
    >
      <MapClusterer :points="points" />
    </Map>
  </div>
</template>
```
:::
