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
import utils from '@/utils/utils';
import { useStore } from "vuex";
const props = defineProps({
  itemInfo: {
    type: Object,
    required: true
  }
})
const store = useStore()
const handleClickContent = () => {
  
  utils.jumpToDetailPage(store, props.itemInfo)
}
</script>
<style lang="scss">
.my-tab-card {
  padding-bottom: 8px;
  border-bottom: 1px solid #ebebeb;
}
</style>
