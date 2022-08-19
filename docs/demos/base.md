# 基础

简单的地图，只要有高德的 key 和 秘钥，简单调一下即可实现.

::: warning
Map 组件最外层需要自己定义 **宽** 和 **高**。
:::

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
    height: 200px;
  }
</style>

<template>
  <div class="the-map">
    <Map
      map-key="您申请的key值"
      :securityConfig="{ securityJsCode: '您申请的安全密钥' }"
    />
  </div>
</template>
```
:::
