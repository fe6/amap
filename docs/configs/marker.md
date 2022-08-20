# MapMarker

点标记组件，需要在 [Map](./configs/map) 里面使用。

<script setup lang="ts">
  import { Map, MapMarker } from '../../components';
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
    :center="[116.397428, 39.90923]"
    :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
  >
    <MapMarker :value="[116.3933, 39.9]"></MapMarker>
    <MapMarker :value="[116.39, 39.911]"></MapMarker>
  </Map>
</div>

## 属性

|名称|说明|类型|默认值|版本|
|--|--|--|--|--|
|value(v-model:value)|点标记的坐标，[经度，维度]|string[]\|number[]|[]| - |
|icon|点标记的图片|string| - | - |
|cursor|手势，可选值： move 。|string|default| - |
|offsetX|点标记显示位置 X 的偏移量|number|0| - |
|offsetY|点标记显示位置 Y 的偏移量|number|0| - |
|draggable|是否拖拽|boolean|false| - |
|visible|是否可见|boolean|true| - |
|clickable|是否可点击|boolean|true| - |

## 事件

如使用 click ，即 `<MapMarker @click="XXX" />` 。

|名称|说明|回调参数|版本|
|--|--|--|--|
|click|点击触发|(ev)=>{}| - |
|drag-end|拖拽之后触发。 thePoi 是新的经纬度坐标 [经度 , 维度], dragEv 是原始点击对象|(thePoi, dragEv)=>{}| - |
