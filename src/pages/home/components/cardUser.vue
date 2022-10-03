<template>
  <view class="card-user">
    <view class="avatar-wrapper">
      <nut-avatar size="normal" 
      class="avatar" 
      :icon="authorInfo.avatar_url">
      </nut-avatar>
    </view>
    <view>
      <text class="user-name">{{authorInfo.name}}</text>
      <text class="publish-time"> {{timeStr}}</text>
    </view>
  </view>
</template>
<script setup lang="ts">
import { defineProps, ref } from 'vue';
import utils from '@/utils/utils';
const props = defineProps(['authorInfo', 'createTime'])

const timeStr = ref('')
// 调用特定形式显示时间的公共方法
timeStr.value = utils.publishTimeStr(props.createTime)
</script>
<style lang="scss">
.card-user {
  height: 45px;
  display: flex;
  align-items: center;

  .avatar-wrapper {
    width: 35px;
    display: flex;
    justify-content: center;
    margin-right: 5px;

    .avatar {
      width: 30px;
      height: 30px;
    }

  }

  .user-name {
    margin-right: 5px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
  }

  .publish-time {
    font-weight: 400;
    font-size: 11px;
    line-height: 12px;
    /* 灰阶/Color_grey_4 */
    color: $noteFontColor;
  }


}
</style>
