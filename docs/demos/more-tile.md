# 瓦片图

只需要设置 `tileUrl` 属性即可，是一个路径里面是各个层级的文件夹，再里面是坐标对应的图片。`maxLeave` 是地图偏离预定中心点多少米即可回到原始中心点的设定。

<script setup lang="ts">
  import { Map } from '../../components';
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
    :showLabel="false"
    :center="[108.966509, 34.203987]"
    :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
    :zoom="15"
    :zooms="[15, 18]"
    tileUrl="https://cdn.dev.mosh.cn/assets/image/tiles-datang/${z}/${x}_${y}.png"
    :maxLeave="8000"
  />
</div>

::: details 源码
```html
<script setup lang="ts">
  import { Map } from '@fe6/amap';
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
    :showLabel="false"
    :center="[108.966509, 34.203987]"
    :zoom="15"
    :zooms="[15, 18]"
    tileUrl="https://cdn.dev.mosh.cn/assets/image/tiles-datang/${z}/${x}_${y}.png"
    :maxLeave="8000"
  />
</div>
```
:::
