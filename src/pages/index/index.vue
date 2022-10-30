<template>
  <!-- loading 区域 页面加载中显示该内容-->
  <Loading v-show="store.state.homePageLoading" />
  <!-- 内容区域 页面加载结束显示该部分内容（在各页面中根据返回结果改变 loading 状态）-->
  <view class="content" v-show="!store.state.homePageLoading">
    <home v-if="pageIndex == 0" />
    <news v-if="pageIndex == 1" />
    <publish
      v-if="pageIndex == 2"
      :jumpToHomePage="jumpToHomePage"
    />
    <message v-if="pageIndex == 3" />
    <!-- <My v-if="pageIndex == 4" /> -->
    <Login v-if="pageIndex == 4" />
  </view>
  <!-- 底部 tab 栏切换区域 -->
  <nut-tabbar
    :changePage="changePage"
    :currPageIndex="pageIndex"
  />
</template>

<script setup lang="ts">
// 引入各内容区域对应板块
import Home from '@/pages/home/index.vue'
import News from '@/pages/news/index.vue'
import Publish from '@/pages/publish/index.vue'
import NutTabbar from './components/nut-tabbar.vue'
import Message from '../message/index.vue';
import Login from '@/pages/login/index.vue';
import My from '../my/index.vue';
import { ref, onMounted } from 'vue';
import Loading from './components/loading.vue';
import { useStore } from 'vuex';
import * as utils from '@/utils/utils';

const store = useStore()
// 定义根据 index 改变页面的方法 同时触发页面加载
const pageIndex = ref(3)
const changePage = (index: number) => {
  if (pageIndex.value !== index) {
    store.commit('changeHomePageLoading', false) // todo
    pageIndex.value = index
  }
}
const jumpToHomePage = () => {
  changePage(0)
}
onMounted(() => {
  utils.showShareMenu()
})
</script>
