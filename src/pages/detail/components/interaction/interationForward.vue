<template>
  <view class="forward-detail-wrapper">
    <!-- 转发头部信息 -->
    <view class="forward-detail">
      <view class="forward-avatar-wrapper">
        <nut-avatar
          size="normal" 
          class="avatar" 
          :icon="forwardInfo.user.avatar_url"
          @tap="() => utils.jumpToUserPage(forwardInfo.user.uid)"
        >
        </nut-avatar>
      </view>
      <view>
        <text class="forward-user-name">{{forwardInfo.user.name}}</text>
        <text class="forward-author" v-if="forwardInfo.user.is_author">作者</text>
        <text class="forward-publish-time"> {{publishTimeStr(forwardInfo.create_time)}}</text>
      </view>
    </view>
    <!-- 转发内容 -->
    <view class="forward-content">
      {{ `${forwardInfo.content.length > 0 ?  forwardInfo.content : '转发动态'}`}}
    </view>
  </view>
  
</template>
<script setup lang="ts">
import { computed } from 'vue';
import utils from '@/utils/utils';

defineProps({
  forwardInfo: {
    type: Object,
    required: true
  }
})
// 引入用特定形式显示时间的公共方法
const publishTimeStr = computed(() => {
  return utils.publishTimeStr
})
</script>
<style lang="scss">
.forward-detail-wrapper {
  padding: 5px 0;
  border-bottom: 1px solid rgb(237, 237, 237);
  .forward-detail {
    height: 45px;
    display: flex;
    align-items: center;

    .forward-avatar-wrapper {
      width: 35px;
      display: flex;
      justify-content: center;
      margin-right: 5px;

      .avatar {
        width: 30px;
        height: 30px;
      }

    }

    .forward-user-name {
      margin-right: 5px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
    }

    .forward-author {
      margin-right: 5px;
      padding: 0 2px;
      font-weight: 400;
      font-size: 10px;
      line-height: 12px;
      color: white;
      background-color: rgb(225, 72, 72);
      border-radius: 2px;
    }

    .forward-publish-time {
      font-weight: 400;
      font-size: 11px;
      line-height: 12px;
      /* 灰阶/Color_grey_4 */
      color: $noteFontColor;
    }
  }

  .forward-content {
    padding-left: 35px;
    font-family: $fontFamilyText;
    font-weight: 400;
    font-size: 15px;
    line-height: 24px;
    color: #3d3d3d;
    // color: #454545;
    text-align: left
  }
}
</style>
