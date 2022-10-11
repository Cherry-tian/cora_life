<template>
  <view class="my-info">
    <MyInfo :userInfo="state.userInfo" />
    <MyTabs :userInfo="state.userInfo" />
  </view>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import MyInfo from './components/myInfo.vue';
import MyTabs from './components/myTabs.vue';
import Taro from '@tarojs/taro';
import { getUserInfo } from '@/api/index.js';

const state = reactive({
  userInfo: {}
})
// 1. 发起获取 my 页面信息的请求
onMounted(() => {
  Taro.request({
    url: getUserInfo,
    data: {
      // TODO: 输入当前使用者的 id 
      uid: 0,
      curr_uid: 0
    }
  }).then((res) => {
    state.userInfo = res.data.data
    
  }).catch(error => {
    console.log("error", error)
    Taro.showToast({
      title: '载入远程数据错误'
    })
  })
})
// 2. TODO： 判断用户sessionID 是否过期，跳转到登录页面
</script>
<style>
</style>
