<template>
  <view class="user-info">
    <MyInfo :userInfo="state.userInfo" />
    <MyTabs :userInfo="state.userInfo" />
  </view>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import MyInfo from '@/pages/commonComponents/myInfo.vue';
import MyTabs from '@/pages/commonComponents/myTabs.vue';
import Taro from '@tarojs/taro';
import { getUserInfo } from '@/api/index.js';

const state = reactive({
  userInfo: {}
})

onMounted(async () => {
  // 从路由获取参数uid
  await fetchUserInfo(1) // TODO
})

const fetchUserInfo = async (uid: number) => {
  Taro.request({
    url: getUserInfo,
    data: {
      uid,
    }
  }).then((res) => {
    state.userInfo = res.data.data
    
  }).catch(error => {
    console.log("error", error)
    Taro.showToast({
      title: '载入远程数据错误'
    })
  })
}
// 2. TODO： 判断用户sessionID 是否过期，跳转到登录页面
</script>
<style>
</style>
