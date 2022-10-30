<template>
  <view class="feed-car">
    <CardUser :authorInfo="itemInfo.author" :createTime="itemInfo.create_time" />
    <CardContent :contentText="itemInfo.desrciprtion" :imgList="itemInfo.image_url_list" @tap="handleClickContent" />
    <CardFooter
      :interaction="itemInfo.interaction"
      :newId="itemInfo.id"
      :jumpToDetailPage="jumpToDetailPage"
    />
  </view>
</template>

<script setup lang="ts">
import CardUser from "@/pages/commonComponents/cardUser.vue";
import CardFooter from "../../commonComponents/cardFooter.vue";
import { defineProps } from 'vue';
import CardContent from "@/pages/commonComponents/cardContent.vue";
import * as utils from '@/utils/utils';

const props = defineProps(['itemInfo'])
const handleClickContent = () => {
  jumpToDetailPage()
}
const jumpToDetailPage = () => {
  utils.jumpToDetailPage(props.itemInfo.id)
}
</script>
<style lang="scss">
.feed-car {
  border-bottom: 1px solid #ebebeb;
}
</style>
