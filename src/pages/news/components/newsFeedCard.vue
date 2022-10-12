<template>
  <view class="news-card">
    <CardUser :authorInfo="itemInfo.author" :createTime="itemInfo.create_time"/>
    <NewsCardContent :contentText="itemInfo.desrciprtion" :contentTitle="itemInfo.title" @tap="handleClickContent"/>
    <CardFooter :interaction="itemInfo.interaction" :newId="itemInfo.id"/>
  </view>
</template>
<script setup lang="ts">
import CardUser from './cardUser.vue';
import CardFooter from '@/pages/commonComponents/cardFooter.vue';
import { defineProps } from 'vue';
import NewsCardContent from '@/pages/commonComponents/newsCardContent.vue';
import { useStore } from 'vuex';
import Taro from '@tarojs/taro';
const props = defineProps(['itemInfo'])
const store = useStore()
const handleClickContent = () => {
  // 1. 用 Taro.navigateTo 实现路由跳转
  Taro.navigateTo({
    url: '/pages/detail/index'
  })
  // 2. 改变 store 中 newsInfo 的状态
  store.commit('changeNewsInfo', props.itemInfo)
}
</script>
<style lang="scss">
.news-card {
  border-bottom: 1px solid #ebebeb;
  margin: 0 22px;
}
</style>
