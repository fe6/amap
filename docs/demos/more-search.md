# 搜索选址

本例子需要 [AMap.PlaceSearch](https://lbs.amap.com/api/javascript-api/reference/search#m_AMap.PlaceSearch), [AMap.AutoComplete](https://lbs.amap.com/api/javascript-api/reference/search#m_AMap.Autocomplete) 插件进行配合使用，设置方法： `:plugins="['AMap.PlaceSearch', 'AMap.AutoComplete']"`。

::: warning
`areaData` 是 *@fe6/amap* 提供的一套数据，用于输入地址反选省市区的使用。
:::

::: danger
MapSearch 深度集成 [*@fe6/water-pro@next*](https://github.com/fe6/water-pro) 版本的 UI 库需提前引入。
:::

<script setup lang="ts">
  import { onBeforeMount, onMounted, ref } from 'vue';
  import { MapSearch } from '../../components';
  import { areaData } from '../../public/area-data'
  import '@fe6/water-pro/dist/water.dark.min.css'

  const theCode = ref<number[]>([]);
  const theValue = ref('');
  const theLatitude = ref('');
  const theLongitude = ref('');

  const theRegion = ref([]);
  const getRegions = () => {
    // 只是获取一下三级联动的数据
    fetch('https://api.dev.mosh.cn/public/region/tree?level=3')
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 10000) {
          theRegion.value = data.data;
        }
      });
  };
  onBeforeMount(getRegions);

  onMounted(() => {
    setTimeout(() => {
      theValue.value = '三里屯西街';
      theLongitude.value = '116.454157';
      theLatitude.value = '39.936468';
      theCode.value = [110000, 110100, 110105];
    }, 1000);
  });
</script>

<div>
  <p>当前选择的省市区： {{ theCode }}</p>
  <p>当前地址： {{ theValue }}</p>
  <p>当前经度： {{ theLongitude }}</p>
  <p>当前纬度： {{ theLatitude }}</p>
  <MapSearch
    v-model:code="theCode"
    v-model:longitude="theLongitude"
    v-model:latitude="theLatitude"
    v-model:value="theValue"
    :cascaderOptions="theRegion"
    map-key="e37740bc1cc102bdc13fe10b02d82de6"
    :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
    :plugins="['AMap.PlaceSearch', 'AMap.AutoComplete']"
    :areaData="areaData"
  >
  </MapSearch>
</div>

::: details 源码
```html
<script setup lang="ts">
  import { onBeforeMount, onMounted, ref } from 'vue';
  import { Map, MapSearch } from '@fe6/amap';
  import { areaData } from '@fe6/amap/area-data';
  import '@fe6/water-pro/dist/water.dark.min.css';

  const theCode = ref<number[]>([]);
  const theValue = ref('');
  const theLatitude = ref('');
  const theLongitude = ref('');

  const theRegion = ref([]);
  const getRegions = () => {
    // 只是获取一下三级联动的数据
    fetch('https://api.dev.mosh.cn/public/region/tree?level=3')
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 10000) {
          theRegion.value = data.data;
        }
      });
  };
  onBeforeMount(getRegions);

  onMounted(() => {
    setTimeout(() => {
      theValue.value = '三里屯西街';
      theLongitude.value = '116.454157';
      theLatitude.value = '39.936468';
      theCode.value = [110000, 110100, 110105];
    }, 1000);
  });
</script>

<div>
  <p>当前选择的省市区： {{ theCode }}</p>
  <p>当前地址： {{ theValue }}</p>
  <p>当前经度： {{ theLongitude }}</p>
  <p>当前纬度： {{ theLatitude }}</p>
  <MapSearch
    v-model:code="theCode"
    v-model:longitude="theLongitude"
    v-model:latitude="theLatitude"
    v-model:value="theValue"
    :cascaderOptions="theRegion"
    map-key="您申请的key值"
    :securityConfig="{ securityJsCode: '您申请的安全密钥' }"
    :plugins="['AMap.PlaceSearch', 'AMap.AutoComplete']"
    :areaData="areaData"
  >
  </MapSearch>
</div>
```
:::
