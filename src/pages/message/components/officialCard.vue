<template>
  <view class="official-wrapper">
    <view class="official-avatar">
      <nut-avatar
        size="normal"
        :icon="itemInfo.from_user?.avatar_url"
        @tap="() => utils.jumpToUserPage(itemInfo.from_user?.uid)"
      />
    </view>
    <view class="official-content">
      <view class="official-title">{{ itemInfo.title }}</view>
      <view class="official-desc">{{ itemInfo.desrciprtion }}</view>
      <view class="official-time">{{utils.publishTimeStr(itemInfo.create_time)}}</view>
    </view>
  </view>
</template>
<script setup lang="ts">
import * as utils from '@/utils/utils';
defineProps({
  itemInfo: {
    type: Object,
    required: true
  }
})
</script>
<style lang="scss">
.official-wrapper {
  border-bottom: 1px solid #ebebeb;
  display: flex;
  padding: 10px 0;
  .official-avatar {
    width: 30px;
    height: 30px;
  }
  .official-content {
    padding-left: 25px;
    .official-title {
      font-family: $fontFamilyText;
      line-height: 30px;
      text-align:left;
      font-size: 15px;
      font-weight: 500;
    }
    .official-desc {
      font-family: $fontFamilyText;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: #3d3d3d;
      text-align:left
    }
    .official-time {
      font-weight: 400;
      font-size: 11px;
      line-height: 14px;
      /* 灰阶/Color_grey_4 */
      color: $noteFontColor;
    }
  }
}
</style>
