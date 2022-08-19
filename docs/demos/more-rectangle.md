# 矩形

借助 MapRectangle 组件即可实现。

<script setup lang="ts">
  import { Map, MapRectangle } from '../../components';
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
    :center="[116.387175, 39.876405]"
    :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
  >
    <MapRectangle
      southWestLongitude="116.356449"
      southWestLatitude="39.859008"
      northEastLongitude="116.417901"
      northEastLatitude="39.893797"
      strokeColor="red"
      :strokeWeight="6"
      :strokeOpacity="0.5"
      :strokeDasharray="[30, 10]"
      strokeStyle="dashed"
      fillColor="blue"
      :fillOpacity="0.5"
      cursor="pointer"
      :zIndex="50"
    />
  </Map>
</div>

::: details 源码
```html
<script setup lang="ts">
  import { Map, MapRectangle } from '@fe6/amap';
</script>

<style scoped>
  .the-map {
    width: 100%;
    height: 500px;
  }
</style>

<div class="the-map">
  <Map
    map-key="您申请的key值"
    :securityConfig="{ securityJsCode: '您申请的安全密钥' }"
    :center="[108.966509, 34.203987]"
  >
    <MapRectangle
      southWestLongitude="116.356449"
      southWestLatitude="39.859008"
      northEastLongitude="116.417901"
      northEastLatitude="39.893797"
      strokeColor="red"
      :strokeWeight="6"
      :strokeOpacity="0.5"
      :strokeDasharray="[30, 10]"
      strokeStyle="dashed"
      fillColor="blue"
      :fillOpacity="0.5"
      cursor="pointer"
      :zIndex="50"
    />
  </Map>
</div>
```
:::
