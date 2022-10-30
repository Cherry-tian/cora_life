<template>
  <view class="my-page">
    <MyInfo :userInfo="state.userInfo" :isSelf='true'/>
    <MyTabs :userInfo="state.userInfo" />
  </view>
  <button @click="clearJWT">清除 jwt</button>
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import MyInfo from '@/pages/commonComponents/myInfo.vue';
import MyTabs from '@/pages/commonComponents/myTabs.vue';
import { getUserInfo } from '@/api/index.js';
import { request } from '@/api/request';
import Taro from '@tarojs/taro';
import { localStorageKey } from '@/const';

const state = reactive({
  userInfo: {}
})

// 获取用户信息的方法
const fetchUserInfo = async() => {
  return request({
    url: getUserInfo,
    data: {
      // TODO: 输入当前使用者的 id 
      uid: 1,
    }
  }).then((res) => {
    state.userInfo = res.data.data
  }).catch(error => {
    console.log("error", error)
    // Taro.showToast({
    //   title: '载入远程数据错误'
    // })
  })
}
// 1. 发起获取 my 页面信息的请求
onMounted(async() => {
  await fetchUserInfo()
})
// 2. 我的页面需要进行登录态验证，若验证失败则跳转至登录页。登录成功后会返回我的页面，但是原先的 onmounted（）方法并未返回数据，需要执行 Taro.useDidShow（）重新执行一次并完成数据渲染。
Taro.useDidShow(async() => {
  await fetchUserInfo();
})
// 清除 jwt
const clearJWT = () => {
  Taro.removeStorage({
    key: localStorageKey.jwt
  })
}
</script>
<style>
.my-page {
  padding-bottom: 90px;
}
</style>
