# 拖拽标记点

**MapMarker** 组件上设置 `draggable` 即可。**MapMarker** 组件上设置 `cursor` 即可改变鼠标手势。 为 **MapMarker** 组件上加上 `v-model:value` 即可实时数据监听。

<script setup lang="ts">
  import { ref } from 'vue';
  import { Map, MapMarker } from '../../components';
  const theMarkerPoi = ref([116.3933, 39.9]);
</script>

<style scoped>
  .the-map {
    width: 100%;
    height: 200px;
  }
</style>

<div>
  <p>当前标记点坐标： {{ theMarkerPoi }}</p>
  <div class="the-map">
    <Map
      map-key="e37740bc1cc102bdc13fe10b02d82de6"
      :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
      :center="[116.3933, 39.9]"
    >
      <MapMarker
        v-model:value="theMarkerPoi"
        draggable
        cursor="move"
      ></MapMarker>
    </Map>
  </div>
</div>

::: details 源码
```html{2,4,22,23,24}
<script setup lang="ts">
  import { ref } from 'vue';
  import { Map } from '@fe6/amap';
  const theMarkerPoi = ref([116.3933, 39.9]);
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
      <MapMarker
        v-model:value="theMarkerPoi"
        draggable
        cursor="move"
      ></MapMarker>
    </Map>
  </div>
</template>
```
:::
