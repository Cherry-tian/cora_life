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
import { getUserInfo } from '@/api/index.js';
import { request } from '@/api/request';
import Taro from '@tarojs/taro';
import { useStore } from 'vuex';
import  { getUID }  from '@/utils/utils';

const state = reactive({
  userInfo: {}
})
const store = useStore()

// 获取用户信息的方法
const fetchUserInfo = async() => {
  const uid = await getUID()
  return request({
    url: getUserInfo,
    data: {
      uid
    }
  }).then((res) => {
    state.userInfo = res.data.data
    store.commit('changeHomePageLoading', false)
  }).catch(error => {
    console.log("error", error)
    Taro.showToast({
      title: '载入远程数据错误'
    })
    store.commit('changeHomePageLoading', false)
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

</script>
<style>
.my-page {
  padding-bottom: 90px;
}
</style>
