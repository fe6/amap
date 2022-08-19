<!-- @format -->

<script setup lang="ts">
  import { onBeforeMount, onMounted, ref } from 'vue';
  import { Button, Space, Modal } from '@fe6/water-pro';
  import {
    Map,
    MapMarker,
    MapClusterer,
    MapSearch,
    MapRectangle,
  } from '../components';
  import { areaData } from '../components/area-data';
  // import { loadMap } from './components';

  // loadMap({
  //   mapKey: 'e37740bc1cc102bdc13fe10b02d82de6',
  //   securityConfig: { securityJsCode: '618328f70209e0ce7566f84258326f5d' },
  //   plugins: ['AMap.RectangleEditor', 'AMap.PlaceSearch', 'AMap.AutoComplete', 'AMap.MarkerClusterer'],
  // });

  const theWindow = window as any;

  const theMarkerPoi = ref([116.3933, 39.9]);
  const thePoints = ref<any>([]);

  // 点聚合自定义图标 start
  const markerStyles = (theMap: Record<any, any>) => {
    return [
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/blue.png',
        size: new theMap.value.Size(32, 32),
        offset: new theMap.value.Pixel(-16, -16),
      },
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/green.png',
        size: new theMap.value.Size(32, 32),
        offset: new theMap.value.Pixel(-16, -16),
      },
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/orange.png',
        size: new theMap.value.Size(36, 36),
        offset: new theMap.value.Pixel(-18, -18),
      },
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/red.png',
        size: new theMap.value.Size(48, 48),
        offset: new theMap.value.Pixel(-24, -24),
      },
      {
        url: 'https://a.amap.com/jsapi_demos/static/images/darkRed.png',
        size: new theMap.value.Size(48, 48),
        offset: new theMap.value.Pixel(-24, -24),
      },
    ];
  };
  // 点聚合自定义图标 end

  // 点聚合完全自定义 start
  const renderClusterMarker = (
    context: Record<any, any>,
    theMap: Record<any, any>,
  ) => {
    const count = thePoints.value.length;
    const factor = Math.pow(context.count / count, 1 / 18);
    const div = document.createElement('div');
    const Hue = 180 - factor * 180;
    const bgColor = 'hsla(' + Hue + ',100%,40%,0.7)';
    const fontColor = 'hsla(' + Hue + ',100%,90%,1)';
    const borderColor = 'hsla(' + Hue + ',100%,40%,1)';
    const shadowColor = 'hsla(' + Hue + ',100%,90%,1)';
    div.style.backgroundColor = bgColor;
    const size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
    div.style.width = div.style.height = size + 'px';
    div.style.border = 'solid 1px ' + borderColor;
    div.style.borderRadius = size / 2 + 'px';
    div.style.boxShadow = '0 0 5px ' + shadowColor;
    div.innerHTML = context.count;
    div.style.lineHeight = size + 'px';
    div.style.color = fontColor;
    div.style.fontSize = '14px';
    div.style.textAlign = 'center';
    context.marker.setOffset(new theMap.value.Pixel(-size / 2, -size / 2));
    context.marker.setContent(div);
  };
  const renderMarker = (
    context: Record<any, any>,
    theMap: Record<any, any>,
  ) => {
    const content =
      '<div style="background-color: hsla(120, 100%, 50%, 0.3); height: 18px; width: 18px; border: 1px solid hsl(120, 100%, 40%); border-radius: 12px; box-shadow: hsl(120, 100%, 50%) 0px 0px 3px;"></div>';
    const offset = new theMap.value.Pixel(-9, -9);
    context.marker.setContent(content);
    context.marker.setOffset(offset);
  };
  // 点聚合完全自定义 end

  // 搜索 start
  const theCode = ref<number[]>([]);
  const theRegion = ref([]);
  const getRegions = () => {
    fetch('https://api.dev.mosh.cn/public/region/tree?level=3')
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 10000) {
          theRegion.value = data.data;
        }
      });
  };
  const theValue = ref('');
  const theLatitude = ref('');
  const theLongitude = ref('');

  const the1Value = ref('三里屯西街');
  const the1Longitude = ref('116.454157');
  const the1Latitude = ref('39.936468');
  const the1Code = ref([110000, 110100, 110105]);
  // 搜索 end

  // 矩形 start
  const rectangleEdit = ref<any>(null);
  const isOpen = ref(true);
  const southWestLongitude = ref();
  const southWestLatitude = ref();
  const northEastLongitude = ref();
  const northEastLatitude = ref();

  const initRect = () => {
    southWestLongitude.value = 116.356449;
    southWestLatitude.value = 39.859008;
    northEastLongitude.value = 116.417901;
    northEastLatitude.value = 39.893797;
  };
  const closeEdit = () => {
    if (rectangleEdit.value) {
      rectangleEdit.value.rectangleEditor.close();
      isOpen.value = false;
    }
  };
  const openEdit = () => {
    if (rectangleEdit.value) {
      rectangleEdit.value.rectangleEditor.open();
      isOpen.value = true;
    }
  };
  // 矩形 end

  // 弹框地图 start
  const visible = ref(false);
  const renderMap = ref(false);
  const openModal = () => {
    visible.value = true;
    setTimeout(() => {
      renderMap.value = true;
    }, 500);
  };
  const closeModal = () => {
    visible.value = false;
  };
  // 弹框地图 end

  onBeforeMount(() => {
    getRegions();
  });
  onMounted(() => {
    setTimeout(() => {
      thePoints.value = theWindow.points;
      initRect();
    }, 1000);
    setTimeout(() => {
      theValue.value = '三里屯西街';
      theLongitude.value = '116.454157';
      theLatitude.value = '39.936468';
      theCode.value = [110000, 110100, 110105];
    }, 1000);
  });
</script>

<template>
  <div>
    <h1>AMAP</h1>
    <h3>弹框使用</h3>
    <Button @click="openModal">开启弹框地图</Button>
    <Modal v-model:visible="visible" title="AMAP 的弹框" @ok="closeModal">
      <div style="width: 100%; height: 400px">
        <!-- <Map
          mapId="map13"
          map-key="e37740bc1cc102bdc13fe10b02d82de6"
          :center="[116.397428, 39.90923]"
          :zoom="20"
          :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
          :dragEnable="false"
          :zoomEnable="false"
          :forceRender="renderMap"
        /> -->
        <MapSearch
          v-model:code="theCode"
          v-model:longitude="theLongitude"
          v-model:latitude="theLatitude"
          v-model:value="theValue"
          :cascaderOptions="theRegion"
          mapId="map14"
          map-key="e37740bc1cc102bdc13fe10b02d82de6"
          :securityConfig="{
            securityJsCode: '618328f70209e0ce7566f84258326f5d',
          }"
          :plugins="['AMap.PlaceSearch', 'AMap.AutoComplete']"
          :areaData="areaData"
          :forceRender="renderMap"
        >
        </MapSearch>
        <!-- <Map
          mapId="map15"
          map-key="e37740bc1cc102bdc13fe10b02d82de6"
          :center="[116.397428, 39.90923]"
          :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
            :forceRender="renderMap"
        >
          <MapMarker
            v-model:value="theMarkerPoi"
            draggable
            cursor="move"
          ></MapMarker>
        </Map> -->
      </div>
    </Modal>
    <!-- <h3>矩形-可编辑</h3>
    <Space>
      <Button @click="closeEdit" :disabled="!isOpen">关闭编辑</Button>
      <Button @click="openEdit" :disabled="isOpen">开启编辑</Button>
    </Space>
    <div>
      左下角纬度: {{ southWestLongitude }} , 左下角经度:
      {{ southWestLongitude }}
    </div>
    <div>
      右上角纬度: {{ northEastLongitude }} , 右上角经度: {{ northEastLatitude }}
    </div>
    <div class="demo-map">
      <Map
        mapId="map12"
        map-key="e37740bc1cc102bdc13fe10b02d82de6"
        :center="[116.387175, 39.876405]"
        :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
        :plugins="['AMap.RectangleEditor']"
      >
        <MapRectangle
          v-model:southWestLongitude="southWestLongitude"
          v-model:southWestLatitude="southWestLatitude"
          v-model:northEastLongitude="northEastLongitude"
          v-model:northEastLatitude="northEastLatitude"
          fillColor="blue"
          cursor="move"
          editable
          ref="rectangleEdit"
        />
      </Map>
    </div>
    <h3>矩形</h3>
    <div class="demo-map">
      <Map
        mapId="map11"
        map-key="e37740bc1cc102bdc13fe10b02d82de6"
        :center="[116.387175, 39.876405]"
        :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
        :plugins="['AMap.RectangleEditor']"
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
    <h3>瓦片图</h3>
    <div class="demo-map">
      <Map
        mapId="map10"
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
    <h3>搜索带入点</h3>
    <p>当前选择的省市区： {{ the1Code }}</p>
    <p>当前地址： {{ the1Value }}</p>
    <p>当前经度： {{ the1Longitude }}</p>
    <p>当前纬度： {{ the1Latitude }}</p>
    <div class="demo-map">
      <MapSearch
        v-model:code="the1Code"
        v-model:longitude="the1Longitude"
        v-model:latitude="the1Latitude"
        v-model:value="the1Value"
        :cascaderOptions="theRegion"
        mapId="map9"
        map-key="e37740bc1cc102bdc13fe10b02d82de6"
        :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
        :plugins="['AMap.PlaceSearch', 'AMap.AutoComplete']"
      >
      </MapSearch>
    </div> -->
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
        :cascaderOptions="theRegion"
        mapId="map8"
        map-key="e37740bc1cc102bdc13fe10b02d82de6"
        :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
        :plugins="['AMap.PlaceSearch', 'AMap.AutoComplete']"
        :areaData="areaData"
      >
      </MapSearch>
    </div>
    <!-- <h3>点聚合完全自定义</h3>
    <div>
      <a
        href="https://lbs.amap.com/demo/jsapi-v2/example/mass-markers/markerclusterer"
        target="_blank"
        >官方demo</a
      >
    </div>
    <div class="demo-map">
      <Map
        ref="map5Node"
        mapId="map7"
        map-key="e37740bc1cc102bdc13fe10b02d82de6"
        :center="[105, 34]"
        :zoom="4"
        :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
        :plugins="['AMap.MarkerClusterer']"
      >
        <MapClusterer
          :points="thePoints"
          :renderClusterMarker="renderClusterMarker"
          :renderMarker="renderMarker"
        />
      </Map>
    </div>
    <h3>点聚合自定义图标</h3>
    <div class="demo-map">
      <Map
        ref="map5Node"
        mapId="map6"
        map-key="e37740bc1cc102bdc13fe10b02d82de6"
        :center="[105, 34]"
        :zoom="4"
        :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
        :plugins="['AMap.MarkerClusterer']"
      >
        <MapClusterer :points="thePoints" :styles="markerStyles" />
      </Map>
    </div>
    <h3>点聚合</h3>
    <div class="demo-map">
      <Map
        ref="map5Node"
        mapId="map5"
        map-key="e37740bc1cc102bdc13fe10b02d82de6"
        :center="[105, 34]"
        :zoom="4"
        :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
        :plugins="['AMap.MarkerClusterer']"
      >
        <MapClusterer :points="thePoints" />
      </Map>
    </div>
    <h3>拖拽标记点</h3>
    <p>当前标记点坐标： {{ theMarkerPoi }}</p>
    <div class="demo-map">
      <Map
        mapId="map4"
        map-key="e37740bc1cc102bdc13fe10b02d82de6"
        :center="[116.397428, 39.90923]"
        :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
      >
        <MapMarker
          v-model:value="theMarkerPoi"
          draggable
          cursor="move"
        ></MapMarker>
      </Map>
    </div>
    <h3>图标标记点</h3>
    <div class="demo-map">
      <Map
        mapId="map3"
        map-key="e37740bc1cc102bdc13fe10b02d82de6"
        :center="[116.397428, 39.90923]"
        :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
      >
        <MapMarker
          :value="[116.3933, 39.9]"
          icon="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png"
          :offsetX="-13"
          :offsetY="-30"
        ></MapMarker>
        <MapMarker
          :value="[116.39, 39.91]"
          icon="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png"
          :offsetX="-13"
          :offsetY="-30"
        ></MapMarker>
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
        <MapMarker :value="[116.3933, 39.9]"></MapMarker>
        <MapMarker :value="[116.39, 39.911]"></MapMarker>
      </Map>
    </div>
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
    </div> -->
  </div>
</template>

<style scoped>
  .demo-map {
    width: 90vw;
    height: 500px;
  }
</style>
