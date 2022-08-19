# 缩放范围

高德默认范围是: [[2, 20]](https://lbs.amap.com/demo/jsapi-v2/example/map/get-mapzoom)。只需 `:zooms="[14,15]"` 即可

<script setup lang="ts">
  import { Map } from '../../components';
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
    :zooms="[14,15]"
  />
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
      :zooms="[14,15]"
    />
  </div>
</template>
```
:::
