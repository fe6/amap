# 点聚合完全自定义

**MapClusterer** 设置 `:renderClusterMarker="renderClusterMarker" :renderMarker="renderMarker"` 即可。[官方例子](https://lbs.amap.com/demo/jsapi-v2/example/mass-markers/markerclusterer)

<script setup lang="ts">
  import { Map, MapClusterer } from '../../components';
  import { points } from '../datas/china';

  const renderClusterMarker = (
    context: Record<any, any>,
    theMap: Record<any, any>,
  ) => {
    const count = points.length;
    const factor = Math.pow(context.count / count, 1 / 18);
    const div = document.createElement('div');
    const Hue = 180 - factor * 180;
    const bgColor = 'hsla(' + Hue + ',100%,40%,0.7)';
    const fontColor = 'hsla(' + Hue + ',100%,90%,1)';
    const borderColor = 'hsla(' + Hue + ',100%,40%,1)';
    const shadowColor = 'hsla(' + Hue + ',100%,90%,1)';
    div.style.backgroundColor = bgColor;
    const size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
    div.style.width = div.style.height = size + 'px';
    div.style.border = 'solid 1px ' + borderColor;
    div.style.borderRadius = size / 2 + 'px';
    div.style.boxShadow = '0 0 5px ' + shadowColor;
    div.innerHTML = context.count;
    div.style.lineHeight = size + 'px';
    div.style.color = fontColor;
    div.style.fontSize = '14px';
    div.style.textAlign = 'center';
    context.marker.setOffset(new theMap.value.Pixel(-size / 2, -size / 2));
    context.marker.setContent(div);
  };
  const renderMarker = (
    context: Record<any, any>,
    theMap: Record<any, any>,
  ) => {
    const content =
      '<div style="background-color: hsla(120, 100%, 50%, 0.3); height: 18px; width: 18px; border: 1px solid hsl(120, 100%, 40%); border-radius: 12px; box-shadow: hsl(120, 100%, 50%) 0px 0px 3px;"></div>';
    const offset = new theMap.value.Pixel(-9, -9);
    context.marker.setContent(content);
    context.marker.setOffset(offset);
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
    <MapClusterer :points="points" :renderClusterMarker="renderClusterMarker" :renderMarker="renderMarker" />
  </Map>
</div>

::: details 源码
```html{7-42,59}
<script setup lang="ts">
  import { Map, MapClusterer } from '@fe6/amap';
  // https://a.amap.com/jsapi_demos/static/china.js
  import { points } from '../datas/china';

  const renderClusterMarker = (
    context: Record<any, any>,
    theMap: Record<any, any>,
  ) => {
    const count = points.length;
    const factor = Math.pow(context.count / count, 1 / 18);
    const div = document.createElement('div');
    const Hue = 180 - factor * 180;
    const bgColor = 'hsla(' + Hue + ',100%,40%,0.7)';
    const fontColor = 'hsla(' + Hue + ',100%,90%,1)';
    const borderColor = 'hsla(' + Hue + ',100%,40%,1)';
    const shadowColor = 'hsla(' + Hue + ',100%,90%,1)';
    div.style.backgroundColor = bgColor;
    const size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
    div.style.width = div.style.height = size + 'px';
    div.style.border = 'solid 1px ' + borderColor;
    div.style.borderRadius = size / 2 + 'px';
    div.style.boxShadow = '0 0 5px ' + shadowColor;
    div.innerHTML = context.count;
    div.style.lineHeight = size + 'px';
    div.style.color = fontColor;
    div.style.fontSize = '14px';
    div.style.textAlign = 'center';
    context.marker.setOffset(new theMap.value.Pixel(-size / 2, -size / 2));
    context.marker.setContent(div);
  };
  const renderMarker = (
    context: Record<any, any>,
    theMap: Record<any, any>,
  ) => {
    const content =
      '<div style="background-color: hsla(120, 100%, 50%, 0.3); height: 18px; width: 18px; border: 1px solid hsl(120, 100%, 40%); border-radius: 12px; box-shadow: hsl(120, 100%, 50%) 0px 0px 3px;"></div>';
    const offset = new theMap.value.Pixel(-9, -9);
    context.marker.setContent(content);
    context.marker.setOffset(offset);
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
      <MapClusterer :points="points" :renderClusterMarker="renderClusterMarker" :renderMarker="renderMarker" />
    </Map>
  </div>
</template>
```
:::
