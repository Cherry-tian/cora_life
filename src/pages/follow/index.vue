<template>
  <view class="follow-page">
    <view class="follow-wrapper" v-for="item in state.followList" :key="item.uid">
    <view class="follow-avatar">
      <nut-avatar
      size="normal"
      :icon="item.avatar_url"
      ></nut-avatar>
    </view>
    <view class="follow-content">
      <view class="follow-author-name">{{ item.name }}</view>
      <view class="follow-desc">{{ item.description }}
      </view>
    </view>
    <view class="follow-button">
      <button class="button"></button>
      <nut-button 
        v-show="item.relation_type === followRelation"
        class="follow-btn"
        size="small"
        plain
        >
        已关注
      </nut-button>
      <nut-button 
        v-show="item.relation_type === coFollowRelation"
        class="follow-btn"
        size="small"
        plain
        >
        互相关注
      </nut-button>
    </view>
  </view>
</view>
 
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
// 引入登录用户与被关注用户的关系
import { followRelation, coFollowRelation } from '@/const';
import Taro from '@tarojs/taro';
import { getFollowList } from '@/api/index.js';
import { request } from '@/api/request';
interface Follower {
  uid: number,
  name: string,
  avatar_url: string,
  relation_type: number,
  description: string
}
const state = reactive<{ followList: Follower[], isLoading: boolean, nextCursor: number,  hasMore: boolean}>({
  followList: [],
  isLoading: false,
  nextCursor: 0,
  hasMore: false
})
// 1. 获取 followList 信息
onMounted(() => {
  request({
    url: getFollowList,
    data: {
      uid: 123,
      cursor: state.nextCursor, //起始游标
      count: 10, // 请求数量
    }
  }).then((res) => {
    state.followList = res.data.data.list
    console.log(state.followList);
    
    state.isLoading = false
    state.hasMore = res.data.data.has_more
    state.nextCursor = res.data.data.next_cursor
  }).catch(() => {
    Taro.showToast({
      title: '载入远程数据出错',
      icon: 'error'
    })
  })
})

</script>
<style lang="scss">
.follow-page {
  padding-bottom: 90px;
  .follow-wrapper {
    border-bottom: 1px solid #ebebeb;
    display: flex;
    justify-content: center;
    padding: 10px 15px;
    .follow-avatar {
      width: 28px;
      height: 28px;
    }
    .follow-content {
      padding-left: 25px;
      .follow-author-name {
        font-family: 'PingFang SC';
        font-weight: 500;
        font-size: 13px;
        text-align:left;
      }
      .follow-desc {
        padding-top: 3px;
        font-weight: 400;
        font-size: 11px;
        line-height: 20px;
        /* 灰阶/Color_grey_4 */
        color: $noteFontColor;
        text-align:left;
      } 
    }
    .follow-button {
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
}

</style>
