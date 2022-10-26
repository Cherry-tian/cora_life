<template>
  <view class="detail-footer-wrapper">
    <view class="detail-footer">
      <view class="detail-footer-comment" @tap="state.showCommentInput = true">
        <nut-icon name="edit" size="16" /> 写评论...
      </view>
      <view class="detail-footer-icon-wrapper">
        <view class="detail-footer-icon" @tap="state.showCommentInput = true">
          <nut-icon name="comment" size="18"></nut-icon>
        </view>
        <view class="detail-footer-icon" @tap="handleShareClick">
          <nut-icon name="share-n" size="18"></nut-icon>
        </view>
        <view class="detail-footer-icon" @tap="handleFavoriteClick" :style="state.isFavorited ? activeIconStyle: ''">
          <nut-icon name="star-n" size="18" :class="state.favoriteIconClass"></nut-icon>
        </view>
        <view class="detail-footer-icon" @tap="handleLikeClick" :style="state.isLiked ? activeIconStyle: ''">
          <nut-icon name="fabulous" size="18" :class="state.likeIconClass"></nut-icon>
        </view>
      </view>
    </view>
  </view>
  <!-- 底部输入评论弹出层 -->
  <nut-popup pop-class="popclass" 
    :style="{ height: '30%' }" 
    position="bottom"
    v-model:visible="state.showCommentInput" 
    :z-index="100"
    >
    <view class="footer-input-area">
      <nut-textarea 
        class="input-area"
        v-model="state.commentText" 
        placeholder="请输入评论：" 
        limit-show max-length="100"
        text-align="left"
        rows="2"
      />
      <nut-button 
        class="input-btn"
        size="small"
        plain 
        color="#ff5900"
        :loading="state.isLoading"
        @tap="handleCommentbtnClick"
        >
        <view v-if="!state.isLoading">
          发送
        </view>
      </nut-button>
      <button class="button"></button>
    </view>
   </nut-popup>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import Taro from '@tarojs/taro';
import { publishComment } from '@/api/index.js';
import { styleConfig } from '@/const';
import api from '@/api/index.js';
const props = defineProps(['newsId', 'interaction'])
const state = reactive({
  showCommentInput: false,
  commentText: '',
  isLoading: false,
  isFavorited: props.interaction.is_favorited,
  isLiked: props.interaction.is_liked,
  likeIconClass: '', //收藏和点赞的动态样式类别
  favoriteIconClass: ''
})
//1. 弹出框的评论发送功能
const handleCommentbtnClick = () => {
  state.isLoading = true
  Taro.request({
    method: 'POST',
    url: publishComment,
    data: {
      new_id: props.newsId,
      content: state.commentText
      // 一级评论不用传入 comment_id
    }
  }).then(() => {
    state.isLoading = false
    state.showCommentInput = false
    state.commentText = ''
    Taro.showToast({
      title: '评论发布成功',
      icon: 'success'
    })
  }).catch(() => {
    Taro.showToast({
      title: '评论发布失败，请稍后再试',
      icon: 'error'
    })
  })
}
// 2. 底部点赞和收藏按钮功能
const activeIconStyle = `color: ${styleConfig.activeIconColor}`
const activeIconClass = "nut-icon-am-breathe"
const handleFavoriteClick = () => {
  if (!state.isFavorited) {
    // 点击后变为收藏状态、增加动态样式、发起收藏的 post 请求
    state.isFavorited = true
    state.favoriteIconClass = activeIconClass
    Taro.request({
      method: 'POST',
      url: api.favorite,
      data: {
        new_id: props.newsId
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
    state.favoriteIconClass = ''
    Taro.request({
      method: 'POST',
      url: api.cancelFavorite,
      data: {
        new_id: props.newsId
      }
    }).catch((err) => {
      Taro.showToast({
        title: err.message,
        icon: "error"
      })
    })
  }
}
const handleLikeClick = () => {
  // 判断当前是否为点赞状态
  if (!state.isLiked) {
    // 点击后变为点赞状态、增加动态样式、发起点赞的 post 请求
    state.isLiked = true
    state.likeIconClass = activeIconClass
    Taro.request({
      method: 'POST',
      url: api.like,
      data: {
        new_id: props.newsId
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
    state.likeIconClass = ''
    Taro.request({
      method: 'POST',
      url: api.cancelLike,
      data: {
        new_id: props.newsId
      }
    }).catch((err) => {
      Taro.showToast({
        title: err.message,
        icon: "error"
      })
    })
  }
}
// TODO: 分享按钮跳转到发布页面
const handleShareClick = () => {
  console.log('share')
  
}
</script>
<style lang="scss">
.detail-footer-wrapper{
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 40px;
  z-index: 9;
  border-top: 1px solid rgb(237, 237, 237);
  background-color: white;

  .detail-footer {
    display: flex;
    flex-direction: row;

    .detail-footer-comment {
      margin-left: 17px;
      padding: 0 16px;
      width: 140px;
      line-height: 32px;
      background-color: rgb(244, 244, 244);
      border-radius: 16px;
    }
    .detail-footer-icon-wrapper {
      display: flex;
      flex-direction: row;
      width: 180px;

      .detail-footer-icon {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
.footer-input-area {
  padding-top: 15px;
  display: flex;
  .textarea {
    height: 0;
  }
  .button {
    height: 0;
    text-align: left;
  }
  // .input-area {
  //   padding-top: 15px;
  // }
  .input-btn {
    width: 50px;
    margin-left: auto;
    margin-right: 10px;
    margin-top: 10px;
    justify-content: flex-end;
  }
}
</style>
