<template>
  <view class="index">
    <text>{{ name}}</text>
    <nut-tabbar @tab-switch="tabSwitch">
      <nut-tabbar-item tab-title="首页" icon="home"></nut-tabbar-item>
      <nut-tabbar-item tab-title="分类" icon="category"></nut-tabbar-item>
      <nut-tabbar-item tab-title="发现" icon="find"></nut-tabbar-item>
      <nut-tabbar-item tab-title="购物车" icon="cart"></nut-tabbar-item>
      <nut-tabbar-item tab-title="我的" icon="my"></nut-tabbar-item>
    </nut-tabbar>
    <div>hello world</div>
  </view>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const msg = ref('Hello world')
    const name = ref('大胖砸u98889911')
    function tabSwitch (item, index) {
      console.log(item, index);
    }
    return {
      msg,
      name,
      tabSwitch
    }
  }
}
</script>
