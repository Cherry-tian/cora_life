<template>
  <!-- 评论 -->
  <view class="comment-detail-wrapper" 
    v-for="item in state.commentList" 
    :key="item.comment_id"
  >
    <!-- 评论头部信息 -->
    <comment-user
      :isCommentAuthor= "item.user.is_comment_author"
      :userInfo="item.user" 
      :isNewsAuthor="state.isNewsAuthor"
      :createTime="item.create_time"
      :commentId = "item.comment_id" />
    <!-- 评论内容 -->
    <comment-content 
      :content="item.content" 
      :stats="item.stats" 
      :commentId="item.comment_id"
      :userInfo="item.user"
    />
    <!-- 回复评论部分 -->
    <view 
      class="comment-reply-wrapper" 
      v-for="reply in item.reply.reply_list" 
      :key="reply.comment_id"
    >
      <!-- 回复头部 -->
      <comment-user 
        :isCommentAuthor="reply.user.is_comment_author"
        :isNewsAuthor="state.isNewsAuthor"
        :userInfo="reply.user" 
        :createTime="reply.create_time"
        :commentId = "reply.comment_id" />
        <!-- 回复内容 -->
      <comment-reply-content 
        :content="reply.content" 
        :stats="reply.stats" 
        :commentId="reply.comment_id"
        :replyToUser="reply.reply_to_user"
        :userInfo="reply.user"
      />
    </view>
  </view>
</template>
<script setup lang="ts">
import { watch, reactive } from 'vue';
import Taro from '@tarojs/taro';
import { commentList } from '@/api/index.js';
import { CommentList } from '../../types';
import { countConfig } from '@/const'
import CommentUser from './comment/commentUser.vue';
import CommentContent from './comment/commentContent.vue';
import CommentReplyContent from './comment/commentReplyContent.vue';
import { request } from '@/api/request';
import { getUID } from '@/utils/utils'
const props = defineProps({
  newsInfo: {
    type: Object,
    required: true
  },
  changeCommentLoading: {
    type: Function,
    required: true
  },
})
const state = reactive<{commentList: CommentList[], hasMore: boolean, nextCursor: number, isNewsAuthor: boolean}>({
  commentList: [],
  hasMore: false, //当前页面是否还有内容
  nextCursor: 0, // 下次请求的游标
  isNewsAuthor: false,
})

// 1. 获取并展示评论栏基础信息, 页面初次展示在评论栏
watch(
  () => props.newsInfo,
  async (newsInfo) => {
    await fetchCommentList()
    const selfUID = await getUID()
    console.log('selfUID',selfUID)
    console.log('newsInfo.author.uid',newsInfo.author.uid)
    state.isNewsAuthor = selfUID == newsInfo.author.uid
    console.log('state.isNewsAuthor',state.isNewsAuthor)
  }
)
const fetchCommentList = async () => {
  return request({
    url: getCommentListUrl({ new_id: props.newsInfo.id })
  }).then((res) => {
    // 调用改变 loading 值的方法
    props.changeCommentLoading()
    state.commentList = res.data.data.list
    state.hasMore = res.data.data.has_more
    state.nextCursor = res.data.data.next_cursor   
  }).catch(() => {
    Taro.showToast({
      title: '载入远程数据出错',
      icon: 'error'
    })
  })
}
// 1.1 定义获取评论内容的 url 函数
const getCommentListUrl = ({
  new_id,
  cursor = 0,
  count = countConfig.comment,
}): string => {
  return `${commentList}?new_id=${new_id}&cursor=${cursor}&count=${count}`
}
</script>
<style lang="scss">
.comment-detail-wrapper {
  padding: 5px 0;
  border-bottom: 1px solid rgb(237, 237, 237);
  .comment-reply-wrapper {
    padding-left: 35px;
  }
}
</style>

