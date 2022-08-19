# 弹框

在弹框中的小例子。给 Map 设置 `forceRender` 即可控制什么时候渲染地图。

<script setup lang="ts">
  import { onBeforeMount, onMounted, ref } from 'vue';
  import { Modal, Button } from '@fe6/water-pro';
  import '@fe6/water-pro/dist/water.dark.min.css'
  import { Map, MapSearch } from '../../components';
  import { areaData } from '../../public/area-data'

  const theCode = ref<number[]>([]);
  const theValue = ref('');
  const theLatitude = ref('');
  const theLongitude = ref('');
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

  onBeforeMount(() => {
    getRegions();
  });
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
<Button @click="openModal">开启弹框地图</Button>
  <Modal v-model:visible="visible" title="AMAP 的弹框" @ok="closeModal">
    <div style="width: 100%; height: 400px">
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
        :plugins="['AMap.PlaceSearch', 'AMap.AutoComplete']"
        :areaData="areaData"
        :forceRender="renderMap"
      >
      </MapSearch>
    </div>
  </Modal>
</div>

::: details 源码
```html
<script setup lang="ts">
  import { onBeforeMount, onMounted, ref } from 'vue';
  import { Modal, Button } from '@fe6/water-pro';
  import '@fe6/water-pro/dist/water.dark.min.css'
  import { Map, MapSearch } from '@fe6/amap';
  import { areaData } from '../../public/area-data'

  const theCode = ref<number[]>([]);
  const theValue = ref('');
  const theLatitude = ref('');
  const theLongitude = ref('');
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

  onBeforeMount(() => {
    getRegions();
  });
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
<Button @click="openModal">开启弹框地图</Button>
  <Modal v-model:visible="visible" title="AMAP 的弹框" @ok="closeModal">
    <div style="width: 100%; height: 400px">
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
        :plugins="['AMap.PlaceSearch', 'AMap.AutoComplete']"
        :areaData="areaData"
        :forceRender="renderMap"
      >
      </MapSearch>
    </div>
  </Modal>
</div>
```
:::
