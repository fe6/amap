<!-- @format -->

<script setup lang="ts">
  import { onBeforeMount, onMounted, ref } from 'vue';
  import { Button, Space, Modal } from '@fe6/water-pro';
  // useForm useModal start
  import { ModalPro, FormPro, useForm, useModal } from '@fe6/water-pro';
  // useForm useModal end
  import {
    Map,
    MapMarker,
    MapClusterer,
    MapSearch,
    MapRectangle,
  } from '../components';
  import { areaData } from '../components/area-data';

  // useForm useModal start
  const { register: registerModal, methods: modalMethods } = useModal();

  const [createFormPro, { resetFields, clearValidate, validateFields }] =
    useForm({
      schemas: [
        {
          field: 'phone',
          component: 'Slot',
          label: '取票地址',
          slot: 'placeNode',
        },
      ],
      okText: '提交',
      showActionButtonGroup: false,
    });

  const openFormModal = () => {
    modalMethods.openModal();
  };
  // useForm useModal end

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
    fetch('https://api.test.fanzhi.cn/common/lbs/regin/tree?level=3')
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
  const resetSearch = () => {
    the1Value.value = '';
    the1Longitude.value = '';
    the1Latitude.value = '';
    the1Code.value = [];
  };

  const the2Value = ref('三里屯西街');
  const the2Longitude = ref('116.454157');
  const the2Latitude = ref('39.936468');
  const theMode = ref('system');
  const the2Code = ref([110000, 110100, 110105]);
  const theCustomAddress = ref('团结湖公园');

  const onChangeMode = () => {
    theMode.value = theMode.value === 'custom' ? 'system' : 'custom';
  };

  const onSetAreaIds = async (
    theNewProvinceId: string,
    theNewCityId: string,
    theNewCountyId: string,
  ) => {
    let provinceId = '';
    let cityId = '';
    let countyId = '';
    if (theRegion.value.length > 0) {
      const theDefProvinceItem = JSON.parse(
        JSON.stringify(theRegion.value?.[0]),
      );
      const theDefCityItem = JSON.parse(
        JSON.stringify(theDefProvinceItem?.items?.[0]),
      );
      const theDefCountyItem = JSON.parse(
        JSON.stringify(theDefCityItem?.items?.[0]),
      );
      const theDataProvinceItem: any = theRegion.value.find(
        (theProinceOne: any) =>
          String(theProinceOne?.code) === theNewProvinceId,
      );
      if (theNewProvinceId.length > 0 && theDataProvinceItem) {
        provinceId = theDataProvinceItem?.code;

        // 城市 start
        let theDataCityItem = (theDataProvinceItem?.items || []).find(
          (theCityOne: any) => String(theCityOne?.code) === theNewCityId,
        );
        if (theNewCityId.length === 0 || !theDataCityItem) {
          theDataCityItem = JSON.parse(JSON.stringify(theDefCityItem));
        }
        cityId = theDataCityItem?.code;
        // 城市 end

        // 区县 start
        let theDataCountyItem = (theDataCityItem?.items || []).find(
          (theCountyOne: any) => String(theCountyOne?.code) === theNewCountyId,
        );
        if (theNewCountyId.length === 0 || !theDataCountyItem) {
          theDataCountyItem = JSON.parse(JSON.stringify(theDefCountyItem));
        }
        countyId = theDataCountyItem?.code;
        // 区县 end
      } else {
        provinceId = theDefProvinceItem?.code;
        cityId = theDefCityItem?.code;
        countyId = theDefCountyItem?.code;
      }
    }
    return {
      provinceId: Number(provinceId),
      cityId: Number(cityId),
      countyId: Number(countyId),
    };
  };
  const onDragMarkerEnd = (theNewPoi: number[], theInfos: any) => {
    console.log(theInfos.value, 'theInfos');
    fetch(
      `https://dz-api.test.fanzhi.cn/common/lbs/geocode?type=geocode&longitude=${theNewPoi[0]}&latitude=${theNewPoi[1]}`,
    )
      .then((response) => response.json())
      .then(async (data) => {
        if (data.code === 10000) {
          const theAddress = data.data.address;
          const theComp = data.data.component;
          the1Value.value = theAddress
            .replace(theComp?.province, '')
            .replace(theComp?.district, '')
            .replace(theComp?.township, '')
            .replace(theComp?.province, '');
          const theNew1Area = await onSetAreaIds(
            data.data?.localProvinceCode || '',
            data.data?.localCityCode || '',
            data.data?.localDistrictCode || '',
          );
          the1Longitude.value = String(data.data?.longitude || theNewPoi[0]);
          the1Latitude.value = String(data.data?.latitude || theNewPoi[1]);
          the1Code.value = [
            theNew1Area.provinceId,
            theNew1Area.cityId,
            theNew1Area.countyId,
          ];
        }
      });
  };
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
  const theContanter = ref();
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
    <Button @click="openFormModal">打开表单地图</Button>
    <ModalPro
      title="新建取票地址"
      :width="620"
      :min-height="700"
      :body-style="{ height: '700px' }"
      :scroll-style="{ padding: '16px 0 0' }"
      @register="registerModal"
    >
      <div style="padding: 16px 24px 0">
        <FormPro @register="createFormPro">
          <template #placeNode>
            <div ref="theContanter">
              <MapSearch
                v-model:code="theCode"
                v-model:longitude="theLongitude"
                v-model:latitude="theLatitude"
                v-model:value="theValue"
                :cascaderOptions="theRegion"
                map-key="e37740bc1cc102bdc13fe10b02d82de6"
                :securityConfig="{
                  securityJsCode: '618328f70209e0ce7566f84258326f5d',
                }"
                :cascaderGetPopupContainer="() => theContanter"
                :plugins="['AMap.PlaceSearch', 'AMap.AutoComplete']"
                :areaData="areaData"
                :forceRender="renderMap"
                @select-search-change="onChangeSelectSearch"
              >
              </MapSearch>
            </div>
          </template>
        </FormPro>
      </div>
    </ModalPro>
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
          dragPoint
          @drag-marker-end="onDragMarkerEnd"
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
    <h3>矩形-可编辑</h3>
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
        mapId="map13"
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
        mapId="map12"
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
        mapId="map11"
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
    <div @click="resetSearch">清空</div>
    <div class="demo-map">
      <MapSearch
        v-model:code="the1Code"
        v-model:longitude="the1Longitude"
        v-model:latitude="the1Latitude"
        v-model:value="the1Value"
        :cascaderOptions="theRegion"
        mapId="map10"
        dragPoint
        @drag-marker-end="onDragMarkerEnd"
        map-key="e37740bc1cc102bdc13fe10b02d82de6"
        :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
        :plugins="['AMap.PlaceSearch', 'AMap.AutoComplete']"
      >
      </MapSearch>
    </div>

    <h3>搜索带入点-可拖拽-可切换mode</h3>
    <p>当前选择的省市区： {{ the2Code }}</p>
    <p>当前地址： {{ the2Value }}</p>
    <p>当前自定义地址： {{ theCustomAddress }}</p>
    <p>当前经度： {{ the2Longitude }}</p>
    <p>当前纬度： {{ the2Latitude }}</p>
    <p>当前mode： {{ theMode }}</p>
    <p>
      <Button type="primary" @click="onChangeMode">切换模式</Button>
    </p>

    <div class="demo-map">
      <MapSearch
        v-model:code="the2Code"
        v-model:longitude="the2Longitude"
        v-model:latitude="the2Latitude"
        v-model:value="the2Value"
        v-model:mode="theMode"
        v-model:address="theCustomAddress"
        :cascaderOptions="theRegion"
        customLocation
        mapId="map9"
        dragPoint
        @drag-marker-end="onDragMarkerEnd"
        @select-search-change="onChangeSelectSearch"
        map-key="e37740bc1cc102bdc13fe10b02d82de6"
        :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
        :plugins="['AMap.PlaceSearch', 'AMap.AutoComplete']"
      >
      </MapSearch>
    </div>

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
        @select-search-change="onChangeSelectSearch"
      >
      </MapSearch>
    </div>
    <h3>点聚合完全自定义</h3>
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
    </div>
  </div>
</template>

<style>
  body {
    padding: 50px;
  }
  .demo-map {
    width: 90vw;
    height: 500px;
  }
</style>
