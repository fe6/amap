# Map

地图组件。除了搜索组件，所有 AMap 最外层的那个盒子组件。他可以通过 **map-key** 和 **security-config** 自动加载高德地图和配置秘钥。

<script setup lang="ts">
  import { Map } from '../../components';
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
    :securityConfig="{ securityJsCode: '618328f70209e0ce7566f84258326f5d' }"
  />
</div>

## 属性

`Map` 组件选择性的支持了一些常用的属性，其他的未来会陆续添加。[参考](https://lbs.amap.com/api/javascript-api/reference/map)

|名称|说明|类型|默认值|版本|
|--|--|--|--|--|
|mapId|地图盒子的 id|string|amap| - |
|mapKey|地图 [key](https://lbs.amap.com/api/jsapi-v2/guide/abc/prepare)|string| - | - |
|securityConfig|[安全密钥](https://lbs.amap.com/api/jsapi-v2/guide/abc/load)|object<{securityJsCode: string}>|{}| - |
|version|地图版本|string|2.0| - |
|plugins|插件集合 id|string[]|[]| - |
|zoom|地图默认缩放级别|number|14| - |
|zooms|地图缩放级别范围|number[]|[[2, 20]](https://lbs.amap.com/api/javascript-api/reference/map)| - |
|center|地图中心点坐标|string[] \| number[]|[]| - |
|viewMode|地图视觉，可选值: **3D**|string| - | - |
|showLabel|是否展示地图文字|boolean|true| - |
|dragEnable|是否允许拖拽|boolean|true| - |
|zoomEnable|是否允许缩放|boolean|true| - |
|doubleClickZoom|地图是否可通过双击鼠标放大地图|boolean|true| - |
|pitchEnable|是否允许设置俯仰角度|boolean|true| - |
|animateEnable|地图平移过程中是否使用动画|boolean|false| - |
|forceRender|是否渲染地图。[例子](./demos/more-modal)|boolean|true| - |
|tileUrl|瓦片图地址配置。[例子](/demos/more-tile)|string| - | - |
|pitch|俯仰角度。角度范围: [0,83]。|number|0| - |
|maxLeave|偏离中心点(center)的距离之后迅速回到预设的中心点。单位： 米。|number|0| - |

## 事件

如使用 inited ，即 `<Map @inited="XXX" />` 。

|名称|说明|回调参数|版本|
|--|--|--|--|
|inited|地图初始化之后。theMap 为实例化的对象； theGaodeMap 原始对象|(theMap, theGaodeMap)=>{}| - |
|init-error|地图初始化失败。error 为报错信息.|(error)=>{}| - |
|mapmove|地图平移时触发事件。theMap 为实例化的对象； theGaodeMap 原始对象|(theMap, theGaodeMap)=>{}| - |
