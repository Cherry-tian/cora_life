<template>
   <view class="fans-wrapper">
    <view class="fans-avatar">
      <nut-avatar
      size="normal"
      :icon="itemInfo.avatar_url"
     ></nut-avatar>
    </view>
    <view class="fans-content">
      <view class="fans-author-name">{{ itemInfo.name }}</view>
      <view class="fans-desc">开始关注你了
        <text class="fans-time"> {{utils.publishTimeStr(itemInfo.create_time)}}</text>
      </view>
    </view>
    <view class="fans-button">
      <button class="button"></button>
      <nut-button 
        v-show="itemInfo.relation_type === fansRelation"
        class="follow-btn"
        size="small"
        plain 
        :color="state.isFollowed? '' : '#ff5900'"
        :loading="state.isLoading"
        @tap="handleClickFollow"
      >
        {{ `${ state.isFollowed? '互相关注' : '关注'}` }}
      </nut-button>
      <nut-button 
        v-show="itemInfo.relation_type === coFollowRelation"
        class="follow-btn"
        size="small"
        plain
        >
        互相关注
      </nut-button>
    </view>
    <!-- <view class="fans-button" v-else-if="itemInfo.relation_type === 3">
      <button class="button"></button>
      <nut-button 
        class="follow-btn"
        size="small"
        plain
        >
        互相关注
      </nut-button>
    </view> -->
  </view>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import * as utils from '@/utils/utils';
import Taro from '@tarojs/taro';
import { followUser } from '@/api/index.js';
import { request } from '@/api/request';
// 引入粉丝和互相关注关系的标识
import { fansRelation, coFollowRelation } from '@/const';
const props = defineProps({
  itemInfo: {
    type: Object,
    required: true
  }
})
const state = reactive({
  isLoading: false,
  color: '#ff5900',
  isFollowed: false,
})
// 1. 点击关注按钮
const handleClickFollow = () => {
  if (!state.isFollowed) {
    state.isLoading = true
    request({
      method: 'POST',
      url: followUser,
      data: {
        uid: 122, //登录用户 ID
        follow_uid: props.itemInfo.follow_uid //关注用户的 uid 
      }
    }).then(() => {
      state.isLoading = false
      state.isFollowed = true
      Taro.showToast({
        title: '关注成功！',
        icon: 'success'
      })
    }).catch(() => {
      Taro.showToast({
        title: '关注失败！',
        icon: 'error'
      })
    })
  }
}
</script>
<style lang="scss">
.fans-wrapper {
  border-bottom: 1px solid #ebebeb;
  display: flex;
  justify-content: center;
  padding: 10px 0;
  .fans-avatar {
    width: 28px;
    height: 28px;
  }
  .fans-content {
    padding-left: 25px;
    .fans-author-name {
      font-family: 'PingFang SC';
      font-weight: 500;
      font-size: 13px;
      text-align:left;
    }
    .fans-desc {
      padding-top: 3px;
      font-weight: 400;
      font-size: 11px;
      line-height: 20px;
      /* 灰阶/Color_grey_4 */
      color: $noteFontColor;
      text-align:left;
    } 
  }
  .fans-button {
    margin-left: auto;
    justify-content: flex-end;
    padding-top: 7px;
    .follow-btn {
      width: 60px;
      height: 25px;
      font-size: 11px;
      padding: 0;
    }
  }
}
</style>
