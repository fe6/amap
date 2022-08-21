# MapRectangle

矩形组件，需要在 <a href="./map" target="_blank" rel="noreferrer">Map</a> 里面使用。若使用编辑功能，需要 <a href="https://lbs.amap.com/api/javascript-api/reference/plugin#AMap.RectangleEditor" target="_blank" rel="noreferrer">AMap.RectangleEditor</a> 插件。

<script setup lang="ts">
  import { Map, MapRectangle } from '../../components';
</script>
<style>
.config-map {
  height: 500px;
  width: 100%
}
</style>
<div class="config-map">
  <Map
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
      :zIndex="50"
    />
  </Map>
</div>

## 属性

若写的不详细 <a href="https://lbs.amap.com/api/javascript-api/reference/overlay#rectangle" target="_blank" rel="noreferrer">可参考</a> 。

|名称|说明|类型|默认值|版本|
|--|--|--|--|--|
|southWestLongitude(v-model:southWestLongitude)|左下角经度|string \| number| - | - |
|southWestLatitude(v-model:southWestLatitude)|左下角纬度|string \| number| - | - |
|northEastLongitude(v-model:northEastLongitude)|右上角经度|string \| number| - | - |
|northEastLatitude(v-model:northEastLatitude)|右上角纬度|string \| number| - | - |
|editable|是否可拖拽|boolean|false| - |
|defaultEdit|初始化是否可编辑|boolean|true| - |
|strokeColor|线条颜色，使用16进制颜色代码赋值|string|#006600| - |
|strokeColor|线样式，实线:solid，虚线:dashed|string| - | - |
|strokeWeight|轮廓线宽度|number|0| - |
|strokeOpacity|轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明|number|1| - |
|strokeDasharray|勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效|number[]| - | - |
|fillColor|矩形填充颜色,使用16进制颜色代码赋值|string| - | - |
|fillOpacity|矩形填充颜色,矩形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明|number|1| - |
|zIndex|层叠顺序|number|10| - |
|cursor|手势，可选值： move 。|string|default| - |

## 事件

如使用 change ，即 `<MapRectangle @change="XXX" />` 。

|名称|说明|回调参数|版本|
|--|--|--|--|
|change|矩形平移或者改变大小触发。ev 是原始点击对象； |(ev)=>{}| - |
