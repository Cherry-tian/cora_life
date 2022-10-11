<template>
  <view class="my-info-wrapper">
    <view class="my-info">
      <view class="my-avatar-wrapper">
        <nut-avatar size="75" 
        class="avatar" 
        :icon="userInfo.avatar_url">
        </nut-avatar>
      </view>
      <view class="my-user-name">{{userInfo.name}}</view>
      <nut-button  
        class="my-edit-button"
        color="black"
        plain
        @tap="handleClick"
        shape="square"
      >
        编辑资料
      </nut-button>
    </view>
    <view class="my-intro">
      {{userInfo.description}}
    </view>
    <view class="my-interaction-list">
      <view class="my-like">
        <text class="my-interaction-num">{{userInfo.relation_info.statistics.liked_count}}</text>
        获赞
      </view>
      <view class="my-subscribe">
        <text class="my-interaction-num">{{userInfo.relation_info.statistics.following_count}}</text>
        关注
      </view>
      <view class="my-fans">
        <text class="my-interaction-num">{{userInfo.relation_info.statistics.follower_count}}</text>
        粉丝
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';
import Taro from '@tarojs/taro'

const store = useStore()
const props = defineProps({
  userInfo: {
    type: Object,
    required: true
  }
})
// 点击跳转到编辑资料页面按钮 改变 store 中 userInfo 的值
const handleClick = () => {
  store.commit('changeUserInfo', props.userInfo)
  Taro.navigateTo({
    url: '../../pages/myInfo/index'
  })
}
</script>
<style lang="scss">
.my-info-wrapper {
  margin: 25px 20px;
  .my-info {
    display: flex;
    align-items: center;
    .my-user-name {
      margin-left: 15px;
      font-size: 22px;
    }
    .my-edit-button {
      margin-left: auto;
      justify-content: flex-end;
      height: 26px;
    }
  }
  .my-intro {
    font-size: 14px;
    color: rgb(115, 119, 128);
    line-height: 20px;
    padding: 20px 0;
  }
  .my-interaction-list {
    display: flex;
    font-size: 14px;
    color: rgb(115, 119, 128);
    line-height: 20px;
    .my-like, .my-subscribe, .my-fans {
      padding-right: 15px;
      .my-interaction-num {
      color: black;
      font-weight: 600;
      font-size: 16px;
    }
    }
   
  }
}
</style>
