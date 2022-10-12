<template>
  <view class="my-tab-card">
    <CardUser :authorInfo="itemInfo.author" :createTime="itemInfo.create_time"/>
    <CardContent v-if="!itemInfo.is_official" :contentText="itemInfo.desrciprtion" :imgList="itemInfo.image_url_list" @tap="handleClickContent"/>
    <NewsCardContent v-else :contentText="itemInfo.desrciprtion" :contentTitle="itemInfo.title" @tap="handleClickContent"/>
  </view>
</template>
<script setup lang="ts">
import CardUser from '@/pages/commonComponents/cardUser.vue';
import NewsCardContent from '@/pages/commonComponents/newsCardContent.vue';
import CardContent from '@/pages/commonComponents/cardContent.vue';
import Taro from '@tarojs/taro';
import { useStore } from "vuex";
const props = defineProps({
  itemInfo: {
    type: Object,
    required: true
  }
})
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
.my-tab-card {
  padding-bottom: 8px;
  border-bottom: 1px solid #ebebeb;
}
</style>
