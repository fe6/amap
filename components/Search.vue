<!-- @format -->

<template>
  <FormRestItem>
    <Space class="w-map-space" direction="vertical" :size="(space as any)">
      <Cascader
        v-model:value="theCode"
        :field-names="cascaderFieldNames"
        :options="cascaderOptions"
        :show-search="{ filter: cascaderFilter }"
        placeholder="请选择"
        @change="cascaderChange"
        class="w-map-cascader"
        :getPopupContainer="cascaderGetPopupContainer"
        :size="(size as any)"
        v-if="showCascader"
      />
      <div class="w-map-search">
        <Search
          v-model:value="theKeyword"
          :size="(size as any)"
          @change="searchChange"
        />
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
          <MapMarker :value="theCenter" v-if="theCenter.length > 0" />
        </Map>
      </div>
    </Space>
  </FormRestItem>
</template>

<script lang="ts" setup>
  import { onMounted, PropType, ref, watch } from 'vue';
  import {
    Cascader,
    ContainerScroll,
    Typography,
    Space,
    Input,
    Form,
  } from '@fe6/water-pro';
  import Map from './Map.vue';
  import MapMarker from './Marker.vue';
  import { mapProps } from './map-props';

  const Search = Input.Search;
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
  });
  const theEmits = defineEmits([
    'cascader-change',
    'update:code',
    'search-change',
    'search-error',
    'update:value',
    'update:longitude',
    'update:latitude',
  ]);

  const cascaderFilter = (inputValue: string, path: any[]) => {
    return path.some((option) =>
      option.name.toLowerCase().includes(inputValue.toLowerCase()),
    );
  };

  const cascaderChange = (newValue: any, newValueItems?: any) => {
    theEmits('update:code', newValue);
    theEmits('cascader-change', newValue, newValueItems);
  };

  const theKeyword = ref('');
  const theCode = ref([]);
  const theCenter = ref<any>([]);
  const theMap = ref<any>(null);
  const theGaodeMap = ref<any>(null);
  const theAutoComplete = ref<any>(null);
  const thePlaceSearch = ref<any>(null);
  const theTips = ref<any>([]);

  const initSearch = () => {
    theAutoComplete.value = new theGaodeMap.value.Autocomplete(
      theProps.autocompleteConfig,
    );
    thePlaceSearch.value = new theGaodeMap.value.PlaceSearch(
      theProps.placeSearchConfig,
    );
  };

  const mapInited = (map: Record<any, any>, gaodeMap: Record<any, any>) => {
    theMap.value = map.value;
    theGaodeMap.value = gaodeMap.value;
    if (typeof theGaodeMap.value.Autocomplete === 'function') {
      initSearch();
    } else {
      // FIX 如果没引入插件
      // 复现： 从其他普通地图跳转过来
      theGaodeMap.value.plugin(
        ['AMap.PlaceSearch', 'AMap.AutoComplete'],
        initSearch,
      );
    }
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
      cascaderChange(theProps.areaData[tip.adcode].addressCode);
    }
    theTips.value = [];
    if (tip.location) {
      const { lng, lat } = tip.location;
      if (lng && lat) {
        searchMap([lng, lat]);
        theEmits('update:value', theKeyword.value);
        theEmits('update:longitude', lng);
        theEmits('update:latitude', lat);
      }
    }
  };

  const updateCode = () => {
    if (Array.isArray(theProps.code)) {
      theCode.value = theProps.code as any;
    }
  };
  watch(() => theProps.code, updateCode);

  const updateKeyword = () => {
    if (typeof theProps.value === 'string') {
      theKeyword.value = theProps.value;
    }
  };
  watch(() => theProps.value, updateKeyword);

  const updateCenter = () => {
    if (Array.isArray(theProps.center)) {
      theCenter.value = theProps.center;
    }
  };
  watch(() => theProps.center, updateCenter);

  const updatePoi = () => {
    if (theProps.longitude && theProps.latitude) {
      searchMap([Number(theProps.longitude), Number(theProps.latitude)]);
    }
  };
  watch([() => theProps.longitude, () => theProps.latitude], updatePoi);

  onMounted(() => {
    updateCode();
    updateCenter();
    updatePoi();
    updateKeyword();
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
