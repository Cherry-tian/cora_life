<template>
 <nut-tabs v-model="state.tabIndex" background="white" color="#4382e2">
  <nut-tabpane title="发布" class="my-tab-tabpane">
    <MyTabCard v-for="item in state.userPublishList" :key="item.user_new.id" :itemInfo="item.user_new" />
  </nut-tabpane>
  <nut-tabpane title="收藏" class="my-tab-tabpane">
    <MyTabCard v-for="item in state.userFavoriteList" :key="item.user_new.id" :itemInfo="item.user_new" />
  </nut-tabpane>
  <nut-tabpane title="喜欢" class="my-tab-tabpane">
    <MyTabCard v-for="item in state.userLikeList" :key="item.user_new.id" :itemInfo="item.user_new" />
  </nut-tabpane>
</nut-tabs>
</template>
<script setup lang="ts">
import { reactive, watch } from 'vue';
import MyTabCard from '@/pages/commonComponents/myTabCard.vue';
import { getMegNews } from '@/api/index.js';
import Taro from '@tarojs/taro';
import { User_new } from '@/types/common';
import { useStore } from 'vuex';
import { request } from '@/api/request';

const store = useStore()

const props = defineProps({
  userInfo: {
    type: Object,
    required: true
  }
})
const publishTabIndex = '0'
const favoriteTabIndex = '1'
const likeTabIndex = '2'
const state = reactive<{tabIndex: string, userPublishList: {user_new: User_new}[], userFavoriteList: {user_new: User_new}[], userLikeList: {user_new: User_new}[]}>({
  tabIndex: publishTabIndex,
  userPublishList: [],
  userFavoriteList: [],
  userLikeList: []
})

// 1. 页面初次加载时请求 发布栏 的数据内容
// 用 onmounted 无法加载：发起请求需要使用父组件传来的 userInfo, 但该数据在页面初加载过程中并未获取（需等待父组件请求数据返回，故函数changeTabRequest（）会出错而停止执行 ）
watch(
  () => props.userInfo,
  (newUserInfo) => {
    if (newUserInfo.stats.publish_amount) {
      changeTabRequest(newUserInfo, publishTabIndex)
      // 数据返回后切换 loading 组件
      store.commit('changeHomePageLoading', false)
    }
  }
)
// 2. 页面首次切换到 收藏 和 喜欢栏 的时候加载对应数据内容
watch(
  () => state.tabIndex,
  (newTabIndex) => {
    if ((newTabIndex === favoriteTabIndex && props.userInfo.stats.favorite_amount && !state.userFavoriteList.length) || (newTabIndex === likeTabIndex && props.userInfo.stats.like_amount && !state.userLikeList.length)) {
      changeTabRequest(props.userInfo, newTabIndex)
    }
  }
)

// 注：发起获取列表请求仅因 tab 不同而数据 list 不同，可以包装成一个函数处理
const changeTabRequest = (userInfo, tabIndex: string) => {
  let new_id_list = []
  switch (tabIndex) {
    case publishTabIndex:
      new_id_list = userInfo.stats.publish_list
      break;
    case favoriteTabIndex:
      new_id_list = userInfo.stats.favorite_list
      break;
    case likeTabIndex:
      new_id_list = userInfo.stats.like_list
      break;
    default:
      Taro.showToast({
        title: '未知的分类',
        icon: 'error'
      })
      return;
  }
  request({
    url: getMegNews,
    data: {
      new_id_list: new_id_list.join(','), //数组参数拼接为字符串
    }
  }).then((res) => {
    switch (tabIndex) {
    case publishTabIndex:
      state.userPublishList = res.data.data.list
      break;
    case favoriteTabIndex:
      state.userFavoriteList = res.data.data.list
      break;
    case likeTabIndex:
      state.userLikeList = res.data.data.list
      break;
    }
  }).catch(() => {
    Taro.showToast({
      title: '获取分类内容失败！',
      icon: 'error'
    })
  })
}
</script>
<style>
.my-tab-tabpane {
  padding-top: 0;
}
</style>
