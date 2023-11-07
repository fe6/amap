<!-- @format -->

<template>
  <FormRestItem>
    <Space
      class="w-map-space"
      direction="vertical"
      :size="(space as any)"
      v-if="gaodeAjaxSearch"
    >
      <Cascader
        v-model:value="theApiCodes"
        :field-names="cascaderFieldNames"
        :options="theInnerRegins"
        :show-search="{ filter: onCascaderFilter }"
        :loading="theInnerLoadingRegins"
        placeholder="请选择"
        @change="onApiCascaderChange"
        class="w-map-cascader"
        :getPopupContainer="cascaderGetPopupContainer"
        :size="(size as any)"
        v-if="showCascader"
      />
      <div class="w-map-search">
        <Search
          v-model:value="theApiAddress"
          :size="(size as any)"
          @change="onApiSearchChange"
          @search="onApiSearchChange"
        />
      </div>
      <div class="w-map-core">
        <Map
          :pitchEnable="pitchEnable"
          :pitch="pitch"
          :mapId="mapId"
          :mapKey="mapKey"
          :securityConfig="securityConfig"
          :version="version"
          :plugins="plugins"
          :zoom="zoom"
          :zooms="zooms"
          :center="theApiCenter"
          :viewMode="viewMode"
          :dragEnable="dragEnable"
          :zoomEnable="zoomEnable"
          :doubleClickZoom="doubleClickZoom"
          :forceRender="forceRender"
          v-if="showMap"
          @inited="mapInited"
        >
          <MapMarker
            :value="theApiCenter"
            @drag-end="onApiDragedMarker"
            v-if="theApiCenter.length > 0"
            :draggable="dragPoint"
          />
        </Map>
      </div>
    </Space>
    <Space
      class="w-map-space"
      direction="vertical"
      :size="(space as any)"
      v-else
    >
      <Cascader
        v-model:value="theCode"
        :field-names="cascaderFieldNames"
        :options="cascaderOptions"
        :show-search="{ filter: onCascaderFilter }"
        placeholder="请选择"
        @change="onCascaderChange"
        class="w-map-cascader"
        :getPopupContainer="cascaderGetPopupContainer"
        :size="(size as any)"
        v-if="showCascader"
      />
      <div class="w-map-search">
        <template v-if="!customLocation">
          <Search
            v-model:value="theKeyword"
            :size="(size as any)"
            @change="searchChange"
          />
        </template>
        <template v-else>
          <InputGroup>
            <Select v-model:value="theMode" @change="onChangeMode">
              <SelectOption
                v-for="theModeItem in modeOptions"
                :key="theModeItem.value"
                :value="theModeItem.value"
              >
                {{ theModeItem.label }}
              </SelectOption>
            </Select>

            <Search
              v-model:value="theKeyword"
              :size="(size as any)"
              @change="searchChange"
              v-if="theMode === 'system'"
            />
            <InputText
              v-model:value="theAddress"
              @blur="onChangeAddress"
              v-else
            />
          </InputGroup>
        </template>

        <div class="w-map-search-core" v-if="theTips.length > 0">
          <ContainerScroll :style="theTips.length > 4 ? 'height: 200px' : ''">
            <div
              class="w-map-search-item"
              v-for="oneTip in theTips"
              :key="oneTip.id"
              @click="() => selOne(oneTip)"
            >
              <Space>
                <Text>{{ oneTip.name }}</Text>
                <Text size="small" type="secondary">{{ oneTip.district }}</Text>
              </Space>
            </div>
          </ContainerScroll>
        </div>
      </div>
      <div class="w-map-core">
        <Map
          :pitchEnable="pitchEnable"
          :pitch="pitch"
          :mapId="mapId"
          :mapKey="mapKey"
          :securityConfig="securityConfig"
          :version="version"
          :plugins="plugins"
          :zoom="zoom"
          :zooms="zooms"
          :center="theCenter"
          :viewMode="viewMode"
          :dragEnable="dragEnable"
          :zoomEnable="zoomEnable"
          :doubleClickZoom="doubleClickZoom"
          :forceRender="forceRender"
          v-if="showMap"
          @inited="mapInited"
        >
          <MapMarker
            :value="theCenter"
            @drag-end="onDragedMarker"
            v-if="theCenter.length > 0"
            :draggable="dragPoint"
          />
        </Map>
      </div>
    </Space>
  </FormRestItem>
</template>

<script lang="ts" setup>
  import { onMounted, PropType, ref, shallowRef, watch } from 'vue';
  import {
    Cascader,
    ContainerScroll,
    Typography,
    Space,
    Input,
    Select,
    SelectOption,
    Form,
    message,
  } from '@fe6/water-pro';
  import Map from './Map.vue';
  import MapMarker from './Marker.vue';
  import { mapProps } from './map-props';
  import { getGaodeGetPoi, getGaodeSearch, getReginTree } from './ajax/global';

  const Search = Input.Search;
  const InputGroup = Input.Group;
  const InputText = Input;
  const Text = Typography.Text;
  const FormRestItem = Form.ItemRest;

  const theProps = defineProps({
    code: {
      type: Array as PropType<any>,
      default: () => [],
    },
    longitude: {
      type: [String, Number],
      default: '',
    },
    latitude: {
      type: [String, Number],
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    showCascader: {
      type: Boolean,
      default: true,
    },
    cascaderGetPopupContainer: {
      type: Function as PropType<(triggerNode?: HTMLElement) => HTMLElement>,
      default: () => document.body,
    },
    cascaderOptions: {
      type: Array as PropType<any>,
      default: () => [],
    },
    cascaderFieldNames: {
      type: Object,
      default: () => ({
        value: 'code',
        label: 'name',
        children: 'items',
      }),
    },
    space: {
      type: [String, Number, Array],
      default: 'small',
    },
    size: {
      type: String,
      default: 'default',
    },
    showMap: {
      type: Boolean,
      default: true,
    },
    dragPoint: {
      type: Boolean,
      default: false,
    },
    ...mapProps,
    // https://lbs.amap.com/api/javascript-api/reference/search
    autocompleteConfig: {
      type: Object,
      default: () => ({}),
    },
    placeSearchConfig: {
      type: Object,
      default: () => ({}),
    },
    areaData: {
      type: Object,
      default: () => ({}),
    },
    modeOptions: {
      type: Array as PropType<{ label: string; value: string }[]>,
      default: () => [
        { label: '系统地图位置', value: 'system' },
        { label: '自定义位置', value: 'custom' },
      ],
    },
    customLocation: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: 'system',
    },
    gaodeAjaxSearch: {
      type: Boolean,
      default: false,
    },
    gaodeAjaxSearchMapKey: {
      type: String,
      default: '',
    },
    reginInner: {
      type: Boolean,
      default: false,
    },
    reginInnerUrl: {
      type: String,
      default: '',
    },
  });
  const theEmits = defineEmits([
    'cascader-change',
    'update:code',
    'select-search-change',
    'search-change',
    'search-error',
    'update:value',
    'update:longitude',
    'update:latitude',
    'drag-marker-end',
    'update:mode',
    'update:address',
  ]);

  const onCascaderFilter = (inputValue: string, path: any[]) => {
    return path.some((option) =>
      option.name.toLowerCase().includes(inputValue.toLowerCase()),
    );
  };

  const onCascaderChange = (newValue: any, newValueItems?: any) => {
    theEmits('update:code', newValue);
    theEmits('cascader-change', newValue, newValueItems);
  };

  // 高德搜索 start
  const theApiCodes = ref<any>([]);
  const theApiAddress = shallowRef('');
  const theApiCenter = ref<any>([]);
  const theApiMap = ref<any>(null);
  const theApiGaodeMap = ref<any>(null);

  const onGetGaodeBaseParams = () => {
    return {
      key: theProps.gaodeAjaxSearchMapKey,
      platform: 'JS',
      logversionL: '2.0',
      sdkversion: '1.4.23',
    };
  };

  const onApiEmitAddressAndPoi = () => {
    theEmits('update:value', theApiAddress.value);
    theEmits('update:longitude', theApiCenter.value?.[0]);
    theEmits('update:latitude', theApiCenter.value?.[1]);
  };

  const onSetApiCenter = (theNewPoi: number[]) => {
    if (theNewPoi && theNewPoi.length > 0) {
      theApiCenter.value = theNewPoi.map((theOnePoi) => Number(theOnePoi));
    }
  };

  const onApiMoveMapToCenter = (theNewPoi: number[]) => {
    if (theNewPoi && theNewPoi.length > 0) {
      onSetApiCenter(theNewPoi);
      if (theApiMap.value) {
        theApiMap.value.setCenter(theNewPoi);
      }
    }
  };
  const onApiGetCodes = (theAdcode: string) => {
    if (theAdcode && theAdcode?.length > 5) {
      const theProvinceId = Number(`${theAdcode.substring(0, 2)}0000`);
      const theCityId = Number(`${theAdcode.substring(0, 4)}00`);
      theApiCodes.value = [theProvinceId, theCityId, Number(theAdcode)];
      onCascaderChange(theApiCodes.value, []);
    }
  };
  const onCoreAjaxGaode = async () => {
    if (theApiAddress.value?.length > 0) {
      const theBaseGaodeParams = onGetGaodeBaseParams();
      const theApiResult = await getGaodeSearch({
        address: theApiAddress.value,
        city: theApiCodes.value?.length > 2 ? theApiCodes.value[1] : '',
        ...theBaseGaodeParams,
      });
      if (theApiResult.status === 200) {
        const theApiCoreResult = theApiResult.data;
        if (theApiCoreResult.infocode === '10000') {
          const theApiGeoOneCode = theApiCoreResult?.geocodes?.[0];
          if (theApiGeoOneCode && theApiGeoOneCode?.location) {
            const thePois = theApiGeoOneCode?.location?.split?.(',');
            if (thePois?.length > 1) {
              onApiMoveMapToCenter(thePois);
              onApiEmitAddressAndPoi();
              onApiGetCodes(theApiGeoOneCode?.adcode || '');
              theEmits('search-change', theApiCoreResult);
            }
          } else {
            theEmits('search-error', theApiResult);
          }
        } else {
          theEmits('search-error', theApiResult);
        }
      } else {
        theEmits('search-error', theApiResult);
      }
    }
  };

  const onApiCascaderChange = async (newValue: any, newValueItems?: any) => {
    await onCoreAjaxGaode();
    onCascaderChange(newValue, newValueItems);
  };

  const theApiSearchTime = ref<any>(null);
  const onApiSearchChange = () => {
    clearTimeout(theApiSearchTime.value);
    theApiSearchTime.value = setTimeout(onCoreAjaxGaode, 300);
  };

  const onWatchApiValue = () => {
    theApiAddress.value = theProps.value;
  };

  const onWatchApiCodes = () => {
    if (theInnerRegins.value.length > 0) {
      theApiCodes.value = theProps.code;
    }
  };

  // 拖拽点位之后
  const onApiDragedMarker = async (theNewPoi: number[]) => {
    if (theNewPoi.length > 1) {
      const theBaseGaodeParams = onGetGaodeBaseParams();
      const thePoiResult = await getGaodeGetPoi({
        location: theNewPoi.join(','),
        ...theBaseGaodeParams,
      });

      if (thePoiResult.status === 200) {
        const theApiDragCoreResult = thePoiResult.data;
        if (theApiDragCoreResult.infocode === '10000') {
          const theApiDragGeoComponent =
            theApiDragCoreResult?.regeocode?.addressComponent;
          if (theApiDragGeoComponent) {
            theApiAddress.value =
              theApiDragCoreResult?.regeocode?.formatted_address;
            onSetApiCenter(theNewPoi);
            onApiEmitAddressAndPoi();
            onApiGetCodes(theApiDragGeoComponent?.adcode || '');
            theEmits('search-change', theApiDragCoreResult);
          }
        }
      }
    }
  };
  // 高德搜索 end

  const theMode = ref(theProps.mode);
  const theAddress = shallowRef('');
  const theChangAddress = shallowRef('');
  const theKeyword = ref('');
  const theCode = ref([]);
  const theCenter = ref<any>([]);
  const theMap = ref<any>(null);
  const theGaodeMap = ref<any>(null);
  const theAutoComplete = ref<any>(null);
  const thePlaceSearch = ref<any>(null);
  const theGeocoder = ref<any>(null);
  const theTips = ref<any>([]);

  const initSearch = () => {
    if (!theAutoComplete.value) {
      theAutoComplete.value = new theGaodeMap.value.Autocomplete(
        theProps.autocompleteConfig,
      );
    }
    if (!thePlaceSearch.value) {
      thePlaceSearch.value = new theGaodeMap.value.PlaceSearch(
        theProps.placeSearchConfig,
      );
    }
    if (theProps.dragPoint) {
      theGeocoder.value = new theGaodeMap.value.Geocoder({
        // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
        city: '全国',
      });
    }
  };

  const mapInited = (map: Record<any, any>, gaodeMap: Record<any, any>) => {
    theMap.value = map.value;
    theGaodeMap.value = gaodeMap.value;
    theApiMap.value = map.value;
    theApiGaodeMap.value = gaodeMap.value;
    if (!theProps.gaodeAjaxSearch) {
      if (typeof theGaodeMap.value.Autocomplete === 'function') {
        if (theGaodeMap.value.Geocoder) {
          initSearch();
        } else {
          if (theProps.dragPoint) {
            theGaodeMap.value.plugin(['AMap.Geocoder'], initSearch);
          } else {
            initSearch();
          }
        }
      } else {
        // FIX 如果没引入插件
        // 复现： 从其他普通地图跳转过来
        const thePlugins = ['AMap.PlaceSearch', 'AMap.AutoComplete'];

        if (theProps.dragPoint) {
          thePlugins.push('AMap.Geocoder');
        }

        theGaodeMap.value.plugin(thePlugins, initSearch);
      }
    }
    // 修复二次进入的时候点位没有到中心，因为第二次进入有可能地图没有加载
    onUpdatePoi();
  };

  const searchTime = ref<any>(null);
  const searchChange = () => {
    if (theAutoComplete.value) {
      clearTimeout(searchTime.value);
      searchTime.value = setTimeout(() => {
        theAutoComplete.value.search(
          theKeyword.value,
          (status: string, result: Record<any, any>) => {
            if (status === 'complete') {
              theTips.value = result.tips;
              theEmits('search-change', result);
            } else {
              theEmits('search-error', result);
            }
          },
        );
      }, 300);
    }
  };

  const onChangeMode = () => {
    theEmits('update:mode', theMode.value);
    if (theMode.value === 'custom' && !theKeyword.value) {
      theKeyword.value = theChangAddress.value || theProps.value;
      theEmits('update:value', theKeyword.value);
    }
    if (theMode.value === 'system' && !theAddress.value) {
      theAddress.value = theKeyword.value || theProps.address;
      theEmits('update:address', theAddress.value);
    }
  };

  const onChangeAddress = () => {
    theEmits('update:address', theAddress.value);
  };

  const searchMap = (poi: number[]) => {
    if (poi && poi.length > 0) {
      theCenter.value = poi;
      if (theMap.value) {
        theMap.value.setCenter(poi);
      }
    }
  };

  const selOne = (tip: Record<any, any>) => {
    theKeyword.value = tip.name;
    if (
      JSON.stringify(theProps.areaData) !== '{}' &&
      theProps.areaData[tip.adcode] &&
      theProps.areaData[tip.adcode].addressCode
    ) {
      onCascaderChange(theProps.areaData[tip.adcode].addressCode);
    }
    theTips.value = [];
    if (tip.location) {
      const { lng, lat } = tip.location;
      if (lng && lat) {
        searchMap([lng, lat]);
        theEmits('update:value', theKeyword.value);
        theEmits('update:longitude', lng);
        theEmits('update:latitude', lat);
        theEmits('select-search-change', theKeyword.value, lng, lat);
      }
    }
  };

  const updateMode = () => {
    if (typeof theProps.mode === 'string') {
      theMode.value = theProps.mode;
    }
  };
  watch(() => theProps.mode, updateMode);

  const updateCode = () => {
    if (Array.isArray(theProps.code) && theProps.gaodeAjaxSearch) {
      onWatchApiCodes();
    }
    if (Array.isArray(theProps.code) && !theProps.gaodeAjaxSearch) {
      theCode.value = theProps.code as any;
    }
  };
  watch(() => theProps.code, updateCode);

  const updateCustomeAddress = () => {
    if (typeof theProps.address === 'string' && !theProps.gaodeAjaxSearch) {
      theAddress.value = theProps.address;
    }
  };
  watch(() => theProps.value, updateCustomeAddress);

  const updateKeyword = () => {
    if (theProps.gaodeAjaxSearch) {
      onWatchApiValue();
    } else {
      if (typeof theProps.value === 'string') {
        theKeyword.value = theProps.value;
      }
    }
  };
  watch(() => theProps.value, updateKeyword);

  watch(
    () => theKeyword.value,
    () => {
      if (theKeyword.value && !theProps.gaodeAjaxSearch) {
        theChangAddress.value = theKeyword.value;
      }
    },
  );

  const updateCenter = () => {
    if (Array.isArray(theProps.center)) {
      theCenter.value = theProps.center;
    }
  };
  watch(() => theProps.center, updateCenter);

  const onUpdatePoi = () => {
    if (theProps.longitude && theProps.latitude) {
      if (theProps.gaodeAjaxSearch) {
        onApiMoveMapToCenter([
          Number(theProps.longitude),
          Number(theProps.latitude),
        ]);
      } else {
        searchMap([Number(theProps.longitude), Number(theProps.latitude)]);
      }
    }
  };
  watch([() => theProps.longitude, () => theProps.latitude], onUpdatePoi);

  // 拖拽点位之后
  const onDragedMarker = (theNewPoi: number[]) => {
    theEmits('drag-marker-end', theNewPoi, theGeocoder);
  };

  // 默认获取三级地域
  const theInnerRegins = ref<any>([]);
  const theInnerLoadingRegins = shallowRef(false);
  // 按三级 code 为 key 查找 省市 的 code ，因为高德地图接口 adcode 一定返回
  // const theInnerMapRegins = ref<any>({});
  const onGetRegions = async () => {
    if (!theInnerLoadingRegins.value) {
      try {
        theInnerLoadingRegins.value = true;
        theInnerRegins.value = await getReginTree(theProps.reginInnerUrl);
        onWatchApiCodes();
        theInnerLoadingRegins.value = false;
      } catch (error) {
        theInnerLoadingRegins.value = false;
      }
    }
  };

  onMounted(async () => {
    if (theProps.gaodeAjaxSearch) {
      if (theProps.reginInner) {
        await onGetRegions();
        onWatchApiValue();
        onUpdatePoi();
      }
    } else {
      updateCode();
      updateCenter();
      onUpdatePoi();
      updateKeyword();
      updateCustomeAddress();
      updateMode();
    }
  });
</script>
<style>
  .w-map-space,
  .w-map-cascader {
    width: 100% !important;
  }

  .w-map-core {
    width: 100%;
    height: 300px;
  }

  .w-map-search {
    position: relative;
  }

  .w-map-search .ant-input-group {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .w-map-search .ant-input-group .ant-input-group-addon {
    width: auto;
  }

  .w-map-search-core {
    background: #fff;
    position: absolute;
    left: 0;
    top: 40px;
    max-height: 200px;
    width: 100%;
    z-index: 2;
    border-radius: 2px;
    outline: none;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
      0 9px 28px 8px #0000000d;
  }

  .w-map-search-item {
    line-height: 40px;
    padding: 0 10px;
    cursor: pointer;
  }

  .w-map-search-item:hover {
    background: #f5f5f5;
  }

  html.dark .w-map-search-core {
    background: #1f1f1f;
  }

  html.dark .w-map-search-item:hover {
    background-color: #ffffff14;
  }
</style>
