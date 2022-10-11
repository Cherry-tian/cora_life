<template>
  <view class="feed-car">
    <CardUser :authorInfo="itemInfo.author" :createTime="itemInfo.create_time" />
    <CardContent :contentText="itemInfo.desrciprtion" :imgList="itemInfo.image_url_list" @tap="handleClickContent" />
    <CardFooter :interaction="itemInfo.interaction" :newId="itemInfo.id" />
  </view>
</template>

<script setup lang="ts">
import CardUser from "@/pages/commonComponents/cardUser.vue";
import CardFooter from "../../commonComponents/cardFooter.vue";
import { defineProps } from 'vue';
import Taro from '@tarojs/taro';
import { useStore } from "vuex";
import CardContent from "@/pages/commonComponents/cardContent.vue";
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
.feed-car {
  border-bottom: 1px solid #ebebeb;
}
</style>
