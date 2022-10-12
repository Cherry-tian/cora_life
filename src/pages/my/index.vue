<template>
  <view class="my-page">
    <MyInfo :userInfo="state.userInfo" :isSelf='true'/>
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
// 1. 发起获取 my 页面信息的请求
onMounted(() => {
  Taro.request({
    url: getUserInfo,
    data: {
      // TODO: 输入当前使用者的 id 
      uid: 0,
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
.my-page {
  padding-bottom: 90px;
}
</style>
