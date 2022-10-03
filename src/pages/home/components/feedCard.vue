<template>
  <view class="feed-car">
    <CardUser :authorInfo="itemInfo.author" :createTime="itemInfo.create_time" />
    <CardContent :contentText="itemInfo.desrciprtion" :imgList="itemInfo.image_url_list" />
    <CardFooter :interaction="itemInfo.interaction" :newId="itemInfo.id" />
  </view>
</template>

<script setup lang="ts">
import CardContent from "./cardContent.vue";
import CardUser from "./cardUser.vue";
import CardFooter from "./cardFooter.vue";
import { defineProps } from 'vue';
defineProps(['itemInfo'])
</script>
<style lang="scss">
.feed-car {
  border-bottom: 1px solid #ebebeb;
}
</style>
