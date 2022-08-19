# 点聚合

**MapClusterer** 设置 `:styles="markerStyles"` 即可。[官方例子](https://lbs.amap.com/demo/jsapi-v2/example/mass-markers/markerclusterer)

<script setup lang="ts">
  import { Map, MapClusterer } from '../../components';
  import { points } from '../datas/china';

  const markerStyles = (theMap: Record<any, any>) => {
    return [
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/blue.png',
        size: new theMap.value.Size(32, 32),
        offset: new theMap.value.Pixel(-16, -16),
      },
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/green.png',
        size: new theMap.value.Size(32, 32),
        offset: new theMap.value.Pixel(-16, -16),
      },
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/orange.png',
        size: new theMap.value.Size(36, 36),
        offset: new theMap.value.Pixel(-18, -18),
      },
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/red.png',
        size: new theMap.value.Size(48, 48),
        offset: new theMap.value.Pixel(-24, -24),
      },
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/darkRed.png',
        size: new theMap.value.Size(48, 48),
        offset: new theMap.value.Pixel(-24, -24),
      },
    ];
  };
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
    <MapClusterer :points="points" :styles="markerStyles" />
  </Map>
</div>

::: details 源码
```html{6-34,52}
<script setup lang="ts">
  import { Map, MapClusterer } from '@fe6/amap';
  // https://a.amap.com/jsapi_demos/static/china.js
  import { points } from '../datas/china';

  const markerStyles = (theMap: Record<any, any>) => {
    return [
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/blue.png',
        size: new theMap.value.Size(32, 32),
        offset: new theMap.value.Pixel(-16, -16),
      },
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/green.png',
        size: new theMap.value.Size(32, 32),
        offset: new theMap.value.Pixel(-16, -16),
      },
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/orange.png',
        size: new theMap.value.Size(36, 36),
        offset: new theMap.value.Pixel(-18, -18),
      },
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/red.png',
        size: new theMap.value.Size(48, 48),
        offset: new theMap.value.Pixel(-24, -24),
      },
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/darkRed.png',
        size: new theMap.value.Size(48, 48),
        offset: new theMap.value.Pixel(-24, -24),
      },
    ];
  };
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
      <MapClusterer :points="points" :styles="markerStyles" />
    </Map>
  </div>
</template>
```
:::
