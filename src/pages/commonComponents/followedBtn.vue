<template>
  <nut-button 
    size="small" 
    plain
    :color="isFollowed? '' : '#ff5900'"
    :loading="isLoading"
    @tap="handleFllowbtnClick"
  >
    <!-- isloading 状态改变，（发送后端请求成功），则显示按钮文字（关注/未关注） -->
    <view v-if="!isLoading">
      <!-- 按钮内部文字 根据 isFollowed 状态发生改变 -->
      <view v-if="!isFollowed">
        <text class="follow-btton-add">+</text>
        关注
      </view>
      <view v-else>已关注</view>
    </view>     
  </nut-button>
  <!-- <button>test</button> -->
</template>
<script setup lang="ts">
import Taro from '@tarojs/taro';
import { unFollowUser, followUser } from '@/api/index.js';
const props = defineProps({
  isFollowed: Boolean, // 是否已关注
  isLoading: Boolean,  // 按钮的loading状态
  changeIsFollowed: Function,
  changeIsLoading: Function,
  uid: Number, // 要关注的人的uid
})
const handleFllowbtnClick = () => {
  // 判断当前 关注 isFollowed 状态
  if (!props.isFollowed) {
    // 当前为未关注，则点击后 （1）发送添加关注的后端请求 （2）loading = true (3) 成功返回结果改变关注状态和 loading 并提醒用户
    props.changeIsLoading?.(true)
    Taro.request({
      method: 'POST',
      url: followUser,
      data: {
        uid: '', //TODO：用户本人的 uid
        follow_uid: props.uid
      }
    }).then(() => {
      props.changeIsLoading?.(false)
      props.changeIsFollowed?.(true)
      Taro.showToast({
        title: '关注成功',
        icon: 'success'
      })
    }).catch((err) => {
      Taro.showToast({
        title: err.message,
        icon: 'error'
      })
    })
  } else {
    // 当前为关注，则点击后 （1）发送添加取消关注的后端请求 （2）loading = true (3) 成功返回结果改变关注状态和 loading 并提醒用户
    props.changeIsLoading?.(true)
    Taro.request({
      method: 'POST',
      url: unFollowUser,
      data: {
        uid: '', //TODO：用户本人的 uid
        follow_uid: props.uid
      }
    }).then(() => {
      props.changeIsLoading?.(false)
      props.changeIsFollowed?.(false)
      Taro.showToast({
        title: '取消关注成功',
        icon: 'success'
      })
    }).catch((err) => {
      Taro.showToast({
        title: err.message,
        icon: 'error'
      })
    })
  }
}
</script>
<style>

</style>
