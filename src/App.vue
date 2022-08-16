<!-- @format -->

<script setup lang="ts">
  import { Map } from './components';
  // import { loadMap } from './components';

  // loadMap();
</script>

<template>
  <div>
    <h1>AMAP</h1>
    <div class="demo-map">
      <Map
        map-key="e37740bc1cc102bdc13fe10b02d82de6"
        :center="[116.397428, 39.90923]"
        :zoom="20"
        :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
        :dragEnable="false"
        :zoomEnable="false"
      />
    </div>
  </div>
</template>

<style scoped>
  .demo-map {
    height: 500px;
  }
</style>
