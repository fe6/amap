# MapClusterer

点聚合组件，需要在 [Map](./configs/map) 里面使用，并且需要 **AMap.MarkerClusterer** 插件。

<script setup lang="ts">
  import { Map, MapClusterer } from '../../components';
  import { points } from '../datas/china';
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
    :center="[105, 34]"
    :zoom="4"
    :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
    :plugins="['AMap.MarkerClusterer']"
  >
    <MapClusterer :points="points" />
  </Map>
</div>

## 属性

若写的不详细[可参考](https://lbs.amap.com/api/javascript-api/reference/plugin/#AMap.MarkerClusterer)。

|名称|说明|类型|默认值|版本|
|--|--|--|--|--|
|points|点的坐标。[{lnglat:[经度, 纬度]}]|Array|[]| - |
|gridSize|聚合计算时网格的像素大小|number|80| - |
|renderClusterMarker|该方法用来实现聚合点的自定义绘制。[例子](./demos/clusterer-customer)|Function|-| - |
|renderClusterMarker|自定义非聚合点样式。[例子](../demos/clusterer-customer)|Function|-| - |
|styles|指定聚合后的点标记的图标样式。[例子](../demos/clusterer-img)|Function|-| - |

## 事件

如使用 click ，即 `<MapClusterer @click="XXX" />` 。

|名称|说明|回调参数|版本|
|--|--|--|--|
|click|点击触发。ev 是原始点击对象； theMap 为实例化的对象； theGaodeMap 原始对象|(ev, theMap, theGaodeMap)=>{}| - |
