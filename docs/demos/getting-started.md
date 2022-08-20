# 快速上手

本节将帮助您从头使用 *@fe6/amap* 完成最基础的使用。

## Step. 1: 安装 @fe6/amap

找个小项目练练手，在项目根目录运行。

- pnpm 

``` bash
$ pnpm add @fe6/amap
```

- yarn 

``` bash
$ yarn add @fe6/amap
```

## Step. 2: 引入 @fe6/amap

```js
<script setup lang="ts">
  import { Map } from '@fe6/amap';
</script>
```

```js
<template>
<Map
  map-key="您申请的key值"
  :securityConfig="{ securityJsCode: '您申请的安全密钥' }"
/>
</template>
```

## Step. 3: 刷新页面

浏览器刷新下页面，看是否和下面一样呢？

<div style="width:100%;height: 200px">
  <Map
    map-key="e37740bc1cc102bdc13fe10b02d82de6"
    :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
  />
</div>

<script setup lang="ts">
  import { Map } from '../../components';
</script>
