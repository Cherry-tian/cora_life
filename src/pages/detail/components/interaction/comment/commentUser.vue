<template>
  <!-- 评论头部信息 -->
  <view class="comment-detail">
      <view class="comment-avatar-wrapper">
        <nut-avatar
          size="normal" 
          class="avatar" 
          :icon="userInfo?.avatar_url"
          @tap="() => utils.jumpToUserPage(userInfo?.uid)"
        >
        </nut-avatar>
      </view>
      <view>
        <text class="comment-user-name">{{userInfo?.name}}</text>
        <text class="comment-author" v-if="userInfo?.is_author">作者</text>
        <text class="comment-publish-time"> {{publishTimeStr(createTime)}}</text>
      </view>
      <!-- 登录用户为当前评论发布者则可以删除当前评论
      todo: 登录用户为新闻/动态发布者时可以删除所有评论 -->
      <view class="delete-comment" @tap="handleDeleteComment" v-if="isCommentAuthor">
        <nut-icon name="del2" size="10" color="#999"></nut-icon>
      </view>
    </view>
</template>
<script setup lang="ts">
import * as utils from '@/utils/utils';
import { computed } from 'vue';
import Taro from '@tarojs/taro';
import { deleteComment } from '@/api/index.js';
import { request } from '@/api/request';
const props = defineProps(['userInfo', 'createTime', 'commentId', 'isCommentAuthor'])
// 引入用特定形式显示时间的公共方法
const publishTimeStr = computed(() => {
  return utils.publishTimeStr
})
// 1. 删除
const handleDeleteComment = () => {
  request({
    method: 'POST',
    url: deleteComment,
    data: {
      comment_id: props.commentId
    }
  }).then(() => {
    Taro.showToast({
      title: '删除成功',
      icon: 'success'
    })
  })
}
</script>
<style lang="scss">
.comment-detail {
    height: 45px;
    display: flex;
    align-items: center;

    .comment-avatar-wrapper {
      width: 35px;
      display: flex;
      justify-content: center;
      margin-right: 5px;

      .avatar {
        width: 30px;
        height: 30px;
      }

    }

    .comment-user-name {
      margin-right: 5px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
    }

    .comment-author {
      margin-right: 5px;
      padding: 0 2px;
      font-weight: 400;
      font-size: 10px;
      line-height: 12px;
      color: white;
      background-color: rgb(225, 72, 72);
      border-radius: 2px;
    }
    .comment-publish-time {
      font-weight: 400;
      font-size: 11px;
      line-height: 12px;
      /* 灰阶/Color_grey_4 */
      color: $noteFontColor;
    }
    .delete-comment {
      margin-left: auto;
      justify-content: flex-end;
    }

}
</style>
