# MapSearch

搜索组件需要 <a href="https://lbs.amap.com/api/javascript-api/reference/search#m_AMap.PlaceSearch" target="_blank" rel="noreferrer">AMap.PlaceSearch</a> 和 <a href="https://lbs.amap.com/api/javascript-api/reference/search#m_AMap.Autocomplete" target="_blank" rel="noreferrer">AMap.AutoComplete</a> 插件。并且需要配合 <a href="http://water-v4.chjgo.com" target="_blank" rel="noreferrer">@fe6/water-pro@next</a> 使用。其中若想实现输入地址自动选择省市区，还需引入 `@fe6/amap/area-data` 。<a href="../demos/more-search" target="_blank" rel="noreferrer">例子</a> 。

::: warning
暗黑主题需要再 `html` 标签中添加 `class="dark"`
:::

<script setup lang="ts">
  import { onBeforeMount, ref } from 'vue';
  import { MapSearch } from '../../components';
  import { areaData } from '../../components/area-data';
  import '@fe6/water-pro/dist/water.dark.min.css'

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

  onBeforeMount(() => {
    getRegions();
  });
</script>

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
/>

## 属性

若写的不详细 <a href="https://lbs.amap.com/api/javascript-api/reference/overlay#rectangle" target="_blank" rel="noreferrer">可参考</a> 。

::: warning
全部支持 [Map](./map) 属性
:::

|名称|说明|类型|默认值|版本|
|--|--|--|--|--|
|code(v-model:code)|省市区的值|number[]|[]| - |
|longitude(v-model:longitude)|具体地址的经度|number \| string| - | - |
|latitude(v-model:latitude)|具体地址的纬度|number \| string| - | - |
|value(v-model:value)|具体地址|string| - | - |
|showCascader|是否显示级联省市区选择器|boolean|true| - |
|showMap|是否地图|boolean|true| - |
|cascaderOptions|级联省市区选择器下拉数据|Array| - | - |
|cascaderGetPopupContainer|菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。|Function(triggerNode)| () => document.body | 0.3.0 |
|areaData|输入框输入之后自动选择省市区的数据配置|object| - | - |
|cascaderFieldNames|级联省市区选择器数据字段配置|object|{value: 'code'label: 'name'children: 'items'}| - |
|space|间距|small \| middle \| large \| number|small| - |
|size|输入框及省市区练级选择器的大小，可选 `large` `default` `small`|string|default| - |
|autocompleteConfig|<a href="https://lbs.amap.com/api/javascript-api/reference/search#m_AMap.Autocomplete" target="_blank" rel="noreferrer">AMap.AutoComplete</a> 其他配置|object| - | - |
|placeSearchConfig|<a href="https://lbs.amap.com/api/javascript-api/reference/search#m_AMap.PlaceSearch" target="_blank" rel="noreferrer">AMap.PlaceSearch</a> 其他配置|object| - | - |

## 事件

如使用 csearch-error ，即 `<MapSearch @csearch-error="XXX" />` 。

|名称|说明|回调参数|版本|
|--|--|--|--|
|cascader-change|省市区级联选择器选择之后触发。newValue 新的区码的数据； newValueItems 新的全数据 |(newValue, newValueItems)=>{}| - |
|csearch-change|搜索成功触发。result 搜索结果 |(result)=>{}| - |
|csearch-error|搜索失败触发。result 搜索结果 |(result)=>{}| - |
