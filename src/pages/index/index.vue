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
    <view class="btn">
      <nut-button type="primary" @click="handleClick('text', msg2, true)">点我</nut-button>
    </view>
    <div>hello world</div>
  </view>
</template>

<script>
import { ref, toRefs, reactive } from 'vue'

export default {
  setup () {
    const msg = ref('Hello world')
    const name = ref('大胖砸u98889911')
    function tabSwitch (item, index) {
      console.log(item, index);
    }
    const state = reactive({
      msg: '欢迎使用 NutUI3.0 开发小程序',
      msg2: '你成功了～',
      type: 'text',
      show: false,
      cover: false
    });

    const handleClick = (type, msg, cover = false) => {
      state.show = true;
      state.msg2 = msg;
      state.type = type;
      state.cover = cover;
    };
    return {
      msg,
      name,
      ...toRefs(state),
      tabSwitch,
      handleClick
    }
  }
}
</script>
