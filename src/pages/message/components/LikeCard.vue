<template>
  <view class="msg-like-wrapper">
    <view class="msg-like-avatar">
      <nut-avatar
        size="normal"
        :icon="itemInfo.user?.avatar_url"
        @tap="() => utils.jumpToUserPage(itemInfo.user?.uid)"
      />
    </view>
    <view class="msg-like-content">
      <view class="msg-like-author-name">{{ itemInfo.user?.name }}</view>
      <view class="msg-like-icon">
        <!-- 点赞关系和收藏关系的 icon 不同 -->
        <nut-icon v-if="itemInfo.type === messageLike" name="heart1" size="16" color="#999"></nut-icon>
        <nut-icon v-if="itemInfo.type === messageFavorite" name="star-n" size="16" color="#999"></nut-icon>
      </view>
      <view class="msglike-time">{{ utils.publishTimeStr(itemInfo.create_time) }}</view>
    </view>
    <view class="msg-news-img">
      <img class="news-img" :src="itemInfo.newsInfo?.img" @tap="handleClickImg" />
    </view>
  </view>
</template>
<script setup lang="ts">
import * as utils from '@/utils/utils';
import { messageLike, messageFavorite } from '@/const';
const props = defineProps({
  itemInfo: {
    type: Object,
    required: true
  }
})
const handleClickImg = () => {
  utils.jumpToDetailPage(props.itemInfo.newsInfo.id) 
}
</script>
<style lang="scss">
.msg-like-wrapper {
  border-bottom: 1px solid #ebebeb;
  display: flex;
  justify-content: center;
  padding-top: 6px;
  .msg-like-avatar {
    width: 30px;
    height: 30px;
  }
  .msg-like-content {
    padding-left: 25px;
    .msg-like-author-name {
      padding-bottom: 2px;
      font-family: 'PingFang SC';
      font-weight: 500;
      font-size: 13px;
      text-align:left;
    }
    .msg-like-icon {
      height: 18px;
    }
    .msglike-time {
      font-weight: 400;
      font-size: 11px;
      line-height: 14px;
      /* 灰阶/Color_grey_4 */
      color: $noteFontColor;
    }
  }
  .msg-news-img {
    margin-left: auto;
    justify-content: flex-end;
    .news-img {
      width: 52px;
      height: 52px;
    }
  }
}
</style>
