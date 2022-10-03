<template>
  <view class="news-card-user">
    <!-- <view class="news-user-info"> -->
      {{`${authorInfo.name + ' ' + timeStr}`}}
    <!-- </view> -->
  </view>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import utils from '@/utils/utils';
const props = defineProps(['authorInfo', 'createTime'])
const timeStr = ref('')
// 调用用特定形式显示时间的方法
timeStr.value = utils.publishTimeStr(props.createTime)
</script>

<style lang="scss">
.news-card-user {
  height: 25px;
  width: 100%;
  margin-bottom: -5px;
  font-weight: 400;
  font-size: 11px;
  line-height: 25px;
   /* 灰阶/Color_grey_4 */
  color: $themeColor;
  
}
</style>

