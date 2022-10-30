<template>
  <view class="footer-wrapper">
    <nut-tabbar
      @tab-switch="tabSwitch"
      :unactive-color=styleConfig.fontColor
      :active-color=styleConfig.themeColor
      class="footer"
      v-model:visible="active"
    >
      <nut-tabbar-item tab-title="首页" icon="home"></nut-tabbar-item>
      <nut-tabbar-item tab-title="新闻" icon="find"></nut-tabbar-item>
      <nut-tabbar-item tab-title="发布" icon="uploader"></nut-tabbar-item>
      <nut-tabbar-item tab-title="消息" icon="message" :dot="state.hasNewMsgs"></nut-tabbar-item>
      <nut-tabbar-item tab-title="我的" icon="my"></nut-tabbar-item>
    </nut-tabbar>
  </view>
</template>

<script setup lang="ts">
import { styleConfig } from '@/const'
import { ref, watch, onMounted, reactive } from 'vue'
import { useStore } from 'vuex';
import { checkHasNewMsgs, msgInterval } from '@/pages/message/utils'
const store = useStore()

// 接收父级组件的 页面变更 事件
const props = defineProps({
  changePage: {
    type: Function,
    required: true
  },
  currPageIndex: Number,
})
const state = reactive({
  hasNewMsgs: false,
})
const tabSwitch = (_, index: number) => {
  props.changePage(index)
}
// active变量用来标识哪个tab是高亮的。见 nut-tabbar 文档 https://nutui.jd.com/#/zh-CN/component/tabbar
const active = ref(props.currPageIndex);
watch(
  () => props.currPageIndex,
  (page) => {
    active.value = page
  }
)

onMounted(async () => {
  // 定时获取是否有新消息，有的话就显示消息红点；报错不阻塞整体流程
  state.hasNewMsgs = await checkHasNewMsgs(store)
  // setInterval(async () => { TODO 恢复
  //   state.hasNewMsgs = await checkHasNewMsgs(store)
  // }, msgInterval)
})
</script>
<style lang="scss">
.footer-wrapper {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999;

  .footer {
    padding-top: 10px;
    padding-bottom: 31px;
  }

  .nut-badge {
    width: 75px;
  }
}
</style>
