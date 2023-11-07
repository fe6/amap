<!-- @format -->

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { MapSearch } from '../components';

  // 搜索 start
  const theCode = ref<number[]>([]);
  const theValue = ref('');
  const theLatitude = ref('');
  const theLongitude = ref('');

  const onChangeSelectSearch = (
    theKeyword: string,
    theLng: number,
    theLat: number,
  ) => {
    console.log(
      theKeyword,
      theLng,
      theLat,
      'theKeyword: string, theLng: number, theLat: number',
    );
  };
  // 搜索 end

  onMounted(() => {
    setTimeout(() => {
      theValue.value = '西关南街2号万达金融中心A座508室';
      theLongitude.value = '121.389861';
      theLatitude.value = '37.538201';
      theCode.value = [370000, 370600, 370602];
    }, 1000);
  });
</script>

<template>
  <div>
    <h1>AMAP</h1>

    <h3>搜索</h3>
    <p>当前选择的省市区： {{ theCode }}</p>
    <p>当前地址： {{ theValue }}</p>
    <p>当前经度： {{ theLongitude }}</p>
    <p>当前纬度： {{ theLatitude }}</p>
    <div class="demo-map">
      <MapSearch
        v-model:code="theCode"
        v-model:longitude="theLongitude"
        v-model:latitude="theLatitude"
        v-model:value="theValue"
        mapId="map16"
        map-key="e37740bc1cc102bdc13fe10b02d82de6"
        :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
        @select-search-change="onChangeSelectSearch"
        gaodeAjaxSearch
        reginInner
        reginInnerUrl="https://api.test.fanzhi.cn/"
        gaodeAjaxSearchMapKey="2f4539dceb63186724b6d9a21787ad99"
        dragPoint
      >
      </MapSearch>
    </div>
  </div>
</template>

<style>
  @import '@fe6/water-pro/dist/water.css';
  body {
    padding: 50px;
  }
  .demo-map {
    width: 90vw;
    height: 500px;
  }
</style>
