# 标记点

标记点需要借助 **MapMarker** 组件完成。

<script setup lang="ts">
  import { Map, MapMarker } from '../../components';
</script>

<style scoped>
  .the-map {
    width: 100%;
    height: 200px;
  }
</style>

<div class="the-map">
  <Map
    map-key="e37740bc1cc102bdc13fe10b02d82de6"
    :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
    :center="[116.397428, 39.90923]"
  >
    <MapMarker :value="[116.3933, 39.9]"></MapMarker>
    <MapMarker :value="[116.39, 39.911]"></MapMarker>
  </Map>
</div>

::: details 源码
```html{17}
<script setup lang="ts">
  import { Map } from '@fe6/amap';
</script>

<style scoped>
  .the-map {
    width: 100%;
    height: 200px;
  }
</style>

<template>
  <div class="the-map">
    <Map
      map-key="您申请的key值"
      :securityConfig="{ securityJsCode: '您申请的安全密钥' }"
      :center="[116.397428, 39.90923]"
    >
      <MapMarker :value="[116.3933, 39.9]"></MapMarker>
      <MapMarker :value="[116.39, 39.911]"></MapMarker>
    </Map>
  </div>
</template>
```
:::
