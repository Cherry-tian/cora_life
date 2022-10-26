<template>
  <view class="user-info">
    <MyInfo :userInfo="state.userInfo" :isSelf='state.isSelf'/>
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
  userInfo: {},
  isSelf: false, // 访问 用户页的人 是否为该用户本人
})

onMounted(async () => {
  // 从路由获取参数uid, 再调接口获取用户信息
  const uid = getUidFromRouterParams()
  await fetchUserInfo(uid)
  state.isSelf = false // TODO 判断
})

const getUidFromRouterParams = (): number => {
  const routerParams = Taro.getCurrentInstance().router.params
  return Number(routerParams.uid)
}

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
</script>
<style>
</style>
