# 两个地图

一个页面有好几个地图需要设置 mapId

<script setup lang="ts">
  import { Map } from '../../components';
</script>

<style scoped>
  .the-map {
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
  }
</style>

<div>
  <div class="the-map">
    <Map
      mapId="map1"
      map-key="e37740bc1cc102bdc13fe10b02d82de6"
      :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
    />
  </div>
  <div class="the-map">
    <Map
      mapId="map2"
      map-key="e37740bc1cc102bdc13fe10b02d82de6"
      :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
    />
  </div>
</div>

::: details 源码
```html
<script setup lang="ts">
  import { Map } from '@fe6/amap';
</script>

<style scoped>
  .the-map {
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
  }
</style>

<div>
  <div class="the-map">
    <Map
      mapId="map1"
      map-key="e37740bc1cc102bdc13fe10b02d82de6"
      :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
    />
  </div>
  <div class="the-map">
    <Map
      mapId="map2"
      map-key="e37740bc1cc102bdc13fe10b02d82de6"
      :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
    />
  </div>
</div>
```
:::
