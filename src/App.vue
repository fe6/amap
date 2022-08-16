<!-- @format -->

<script setup lang="ts">
  import { Map, Marker } from './components';
  // import { loadMap } from './components';

  // loadMap();
</script>

<template>
  <div>
    <h1>AMAP</h1>
    <h3>图标标记点</h3>
    <div class="demo-map">
      <Map
        mapId="map3"
        map-key="e37740bc1cc102bdc13fe10b02d82de6"
        :center="[116.397428, 39.90923]"
        :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
      >
        <Marker
          :position="[116.3933, 39.9]"
          icon="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png"
          :offsetX="-13"
          :offsetY="-30"
        ></Marker>
        <Marker
          :position="[116.39, 39.91]"
          icon="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png"
          :offsetX="-13"
          :offsetY="-30"
        ></Marker>
      </Map>
    </div>
    <h3>基本标记点</h3>
    <div class="demo-map">
      <Map
        mapId="map2"
        map-key="e37740bc1cc102bdc13fe10b02d82de6"
        :center="[116.397428, 39.90923]"
        :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
      >
        <Marker :position="[116.3933, 39.9]"></Marker>
        <Marker :position="[116.39, 39.911]"></Marker>
      </Map>
    </div>
    <br />
    <h3>基本使用，不能拖拽，不能放大缩小，默认缩放20</h3>
    <div class="demo-map">
      <Map
        mapId="map1"
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
