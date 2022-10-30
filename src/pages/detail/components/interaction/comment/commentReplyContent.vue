<template>
  <view class="comment-content">
      <view class="comment-word" @tap="handleCommentbtnClick">
        {{ `回复${replyToUser.name}: ${content}` }}
      </view>
      <view 
        class="comment-like" 
        :style="state.isLiked ? activeLikeStyle : ''" 
        @tap="handleLikeComment"
      >
        <nut-icon name="fabulous" size="12px" :class="state.likeIconClass"/> 
        {{`${state.likeCount > 0 ? state.likeCount : ''}`}}
      </view>
    </view>
</template>
<script setup lang="ts">
import { inject, reactive } from 'vue';
import { styleConfig } from '@/const';
import Taro from '@tarojs/taro';
import { commentLike, cancelCommentLike } from '@/api/index.js';
import { request } from '@/api/request';
const props = defineProps(['content', 'stats', 'commentId', 'replyToUser', 'userInfo'])
// 通过 Inject 引入跨层级（祖孙级别的组件方法 handleCommentClick）
const handleCommentClick: any = inject('handleCommentClick')
const state = reactive({
  likeCount: props.stats.like_count,
  isLiked: props.stats.is_liked,
  likeIconClass: '',
  placeHolder: `回复 @${props.userInfo.name}:`
})
//1. 对评论内容的点赞与取消点赞交互
const activeLikeStyle = `color: ${styleConfig.activeIconColor}`
const activeClass = "nut-icon-am-breathe"
const handleLikeComment = () => {
  // 判断当前是否已经点赞
  if (!state.isLiked) {
    state.likeCount++
    state.isLiked = !state.isLiked
    state.likeIconClass = activeClass
    request({
      method: 'POST',
      url: commentLike,
      data: {
        comment_id: props.commentId
      }
    }).catch((err) => {
      Taro.showToast({
        title: err.message,
        icon: "error"
      })
    })
  } else {
    state.likeCount--
    state.isLiked = !state.isLiked
    state.likeIconClass = ''
    request({
      method: 'POST',
      url: cancelCommentLike,
      data: {
        comment_id: props.commentId
      }
    }).catch((err) => {
      Taro.showToast({
        title: err.message,
        icon: "error"
      })
    })
  }
}
//2. 底部弹出框发布回复
const handleCommentbtnClick = () => {
  handleCommentClick(true, state.placeHolder, props.commentId)
}
</script>
<style lang="scss">
.comment-content {
    padding-left: 35px;
    position: relative;
    
    .comment-word {  
      margin-right: 35px;
      font-family: $fontFamilyText;
      font-size: 15px;
      font-weight: 400;
      line-height: 24px;
      color: #3d3d3d;
      // color: #454545;
      text-align: left
    } 

    .comment-like {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 12px;
    }
}
</style>
