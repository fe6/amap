# 矩形

需要引入 [AMap.RectangleEditor](https://lbs.amap.com/api/javascript-api/reference/plugin#AMap.RectangleEditor) 插件。

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { Space, Button } from '@fe6/water-pro';
  import '@fe6/water-pro/dist/water.dark.min.css'
  import { Map, MapRectangle } from '../../components';

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

  onMounted(() => {
    setTimeout(() => {
      initRect();
    }, 1000);
  });
</script>

<style>
  .the-map {
    width: 100%;
    height: 500px;
  }

  .amap-rect-node+.amap-marker-label {
    color: #333;
  }
</style>

<Space direction="vertical" style="width: 100%">
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
  <div class="the-map">
    <Map
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
</Space>

::: details 源码
```html
<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { Space, Button } from '@fe6/water-pro';
  import '@fe6/water-pro/dist/water.dark.min.css'
  import { Map, MapRectangle } from '@fe6/amap';

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

  onMounted(() => {
    setTimeout(() => {
      initRect();
    }, 1000);
  });
</script>

<style>
  .the-map {
    width: 100%;
    height: 500px;
  }
</style>

<Space direction="vertical" style="width: 100%">
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
  <div class="the-map">
    <Map
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
</Space>
```
:::
