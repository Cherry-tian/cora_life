<template>
  <view class="news-card">
    <CardUser :authorInfo="itemInfo.author" :createTime="itemInfo.create_time"/>
    <NewsCardContent :contentText="itemInfo.desrciprtion" :contentTitle="itemInfo.title" @tap="handleClickContent"/>
    <CardFooter
      :interaction="itemInfo.interaction"
      :newId="itemInfo.id"
      :jumpToDetailPage="jumpToDetailPage"
    />
  </view>
</template>
<script setup lang="ts">
import CardUser from './cardUser.vue';
import CardFooter from '@/pages/commonComponents/cardFooter.vue';
import { defineProps } from 'vue';
import NewsCardContent from '@/pages/commonComponents/newsCardContent.vue';
import { useStore } from 'vuex';
import utils from '@/utils/utils';

const props = defineProps(['itemInfo'])
const store = useStore()
const handleClickContent = () => {
  jumpToDetailPage()
}
const jumpToDetailPage = () => {
  utils.jumpToDetailPage(store, props.itemInfo)
}
</script>
<style lang="scss">
.news-card {
  border-bottom: 1px solid #ebebeb;
  margin: 0 22px;
}
</style>
