<template>
  <view class="card-footer">
    <view class="footer-icon" @tap="handleShare">
      <nut-icon name="share" size="12"></nut-icon>
      <text>{{interaction.forward_count||'分享'}}</text>
    </view>
    <view class="footer-icon" @tap="handleComment">
      <nut-icon name="comment" size="12"></nut-icon>
      <text>{{interaction.commnet_count || '评论'}}</text>
    </view>
    <view class="footer-icon" @tap="handleFavorite" :style="state.isFavorited ? activeIconStyle: ''">
      <nut-icon name="star" size="12" :class="state.favoriteIconClass"></nut-icon>
      <text>{{state.favoriteCount||'收藏'}}</text>
    </view>
    <view class="footer-icon" @tap="handleLike" :style="state.isLiked ? activeIconStyle: ''">
      <nut-icon name="fabulous" size="12" :class="state.likeIconClass"></nut-icon>
      <text>{{state.likeCount||'点赞'}}</text>
    </view>
  </view>
</template>
<script setup lang="ts">
import { defineProps, reactive } from 'vue';
import { styleConfig } from '@/const'
import Taro from '@tarojs/taro';
import api from '@/api/index.js'
const props = defineProps(['interaction', 'newId'])
// 定义响应式数据 state，包含之后需要响应式渲染的各类数据
const state = reactive({
  favoriteCount: props.interaction.favorite_count,
  isFavorited: props.interaction.is_favorited,
  likeCount: props.interaction.like_count,
  isLiked: props.interaction.is_liked,
  likeIconClass: '', //收藏和点赞的动态样式类别
  favoriteIconClass: ''
})
// 已收藏、点赞的样式（显示颜色为红色）
const activeIconStyle = `color: ${styleConfig.activeIconColor}`
// const activeIconStyle:  = 
// 点击收藏、点赞的动态样式（过渡效果：呼吸 https://nutui.jd.com/#/zh-CN/component/icon）
const activeIconClass = "nut-icon-am-breathe"

// 1. 判断当前是否为点赞或收藏状态并绑定样式（颜色） 可以直接在标签中用 js 表达式也可以用计算属性
// const iconStyle = computed(() => {
//   return state.isFavorited ? activeIconStyle : ''
// })
// 2. 添加各按钮的点击事件
// 2.1 点击收藏按钮
const handleFavorite = () => {
  // 判断当前是否为收藏状态
  if (!state.isFavorited) {
    // 点击后变为收藏状态、增加动态样式、发起收藏的 post 请求
    state.isFavorited = true
    state.favoriteCount++
    state.favoriteIconClass = activeIconClass
    Taro.request({
      method: 'POST',
      url: api.favorite,
      data: {
        new_id: props.newId
      }
    }).catch((err) => {
      Taro.showToast({
        title: err.message,
        icon: "error"
      })
    })
  } else {
    // 点击后变为未收藏状态、还原样式、发起取消收藏的 post 请求
    state.isFavorited = false
    state.favoriteCount--
    state.favoriteIconClass = ''
    Taro.request({
      method: 'POST',
      url: api.cancelFavorite,
      data: {
        new_id: props.newId
      }
    }).catch((err) => {
      Taro.showToast({
        title: err.message,
        icon: "error"
      })
    })
  }
}
// 2.2 点击点赞按钮
const handleLike = () => {
  // 判断当前是否为点赞状态
  if (!state.isLiked) {
    // 点击后变为点赞状态、增加动态样式、发起点赞的 post 请求
    state.isLiked = true
    state.likeCount++
    state.likeIconClass = activeIconClass
    Taro.request({
      method: 'POST',
      url: api.like,
      data: {
        new_id: props.newId
      }
    }).catch((err) => {
      Taro.showToast({
        title: err.message,
        icon: "error"
      })
    })
  } else {
    // 点击后变为未点赞状态、还原样式、发起取消点赞的 post 请求
    state.isLiked = false
    state.likeCount--
    state.likeIconClass = ''
    Taro.request({
      method: 'POST',
      url: api.cancelLike,
      data: {
        new_id: props.newId
      }
    }).catch((err) => {
      Taro.showToast({
        title: err.message,
        icon: "error"
      })
    })
  }
}
// 2.3 点击分享按钮
const handleShare = () => {
  console.log('share')
}
// 2.4 点击评论按钮
const handleComment = () => {
  console.log('comment')

}
</script>
<style lang="scss">
.card-footer {
  display: flex;
  text-align: center;
  font-weight: 500;
  height: 30px;
  font-size: 13px;
  // color: #222222;
  color: #616161;

  .footer-icon {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 18px;
    height: 18;
  }

  text {
    margin-left: 5px;
  }
}
</style>
