<template>
  <view class="interaction-wrapper">
    <nut-tabs 
      v-model="state.tabIndex"  
      :background = styleConfig.backgroundColor 
      :color = styleConfig.themeColor>
        <!-- 暂不显示转发列表 -->
        <!-- <nut-tabpane :title="'转发 ' + (newsInfo.interaction.forward_count > 0 ? newsInfo.interaction.forward_count: '')" >
          <view class="interaction-tabpane">
            <InteractionLoading v-if="state.forlikeIsLoading"/>
            <InterationForward v-for="item in state.forwardList" :forwardInfo="item" :key="item.id" />
          </view>
        </nut-tabpane> -->
        <nut-tabpane :title="'评论 ' + (newsInfo.interaction?.commnet_count > 0 ? newsInfo.interaction?.commnet_count: '')" >
          <view class="interaction-tabpane">
            <InteractionLoading v-if="state.commentisLoading"/>
            <InteractionComment
              :newsInfo="newsInfo" 
              :handleCommentClick="handleCommentClick"
              :changeCommentLoading="changeCommentLoading"
            />
          </view>
        </nut-tabpane>
        <nut-tabpane
          :title="'赞 ' + (newsInfo.interaction?.like_count > 0 ? newsInfo.interaction?.like_count: '')"
        >
          <view class="interaction-tabpane">
            <InteractionLoading v-if="state.forlikeIsLoading"/>
            <InteractionLike v-for="item in state.likeList" :likeInfo="item" :key="item.user?.avatar_url"/>
          </view>
        </nut-tabpane>
    </nut-tabs>
  </view>
  <!-- 点击评论后底部出现弹出层 -->
  <nut-popup pop-class="popclass" 
    :style="{ height: '30%' }" 
    position="bottom"
    v-model:visible="state.showReplyCommentInput"
  >
    <view class="footer-input-area">
      <nut-textarea 
        class="input-area"
        text-align="left"
        :placeholder="state.placeHolder"
        v-model="state.commentText"
      />
      <nut-button 
        class="input-btn"
        size="small"
        plain 
        color="#ff5900"
        z-index="300"
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
import { provide, reactive, watch } from 'vue';
import { styleConfig } from '@/const'
// import InterationForward from './interationForward.vue';
import InteractionComment from './interactionComment.vue';
import InteractionLike from './interactionLike.vue';
import Taro from '@tarojs/taro';
import { interactionDetail, publishComment } from '@/api/index.js';
import { ForwardList, LikeList } from '../../types';
import InteractionLoading from './interactionLoading.vue';
import { request } from '@/api/request';
import { User_new } from '@/types/common'
import { reFreshDetailPage } from '@/pages/detail/utils'

const props = defineProps(['newsInfo'])
// const forwardTabIndex = '0'
const commentTabIndex = '0'
const likeTabIndex = '1'
const state = reactive<{tabIndex: string, forwardList: ForwardList[], likeList: LikeList[], showReplyCommentInput: boolean, placeHolder: string, commentId: number, commentText: string, commentisLoading: boolean, forlikeIsLoading: boolean, isLoading: boolean, newsInfo: User_new }>({
  // 默认出现 评论区 tab栏内容，索引为 1
  tabIndex: commentTabIndex,
  forwardList: [],
  likeList: [],
  showReplyCommentInput: false,
  placeHolder: '',
  commentId: 0,
  commentText: '',
  commentisLoading: true, //loading 组件的控制变量
  forlikeIsLoading: true,
  isLoading: false,
  newsInfo: {},
})
//1. 用户点击 tab 切换到转发和点赞栏的时候发送获取数据请求
watch(
  () => state.tabIndex,
  // 在初次切换的时候发起数据请求
  (newTabIndex) => {
    // if ((newTabIndex === forwardTabIndex || newTabIndex === likeTabIndex) && (!state.forwardList.length && !state.likeList.length)) {
    if (newTabIndex === likeTabIndex && !state.likeList?.length) {
      request({
        url: interactionDetail,
        data: {
          new_id: props.newsInfo.id
        }
      }).then((res) => {
        state.forlikeIsLoading = false
        state.forwardList = res.data.data.forward.list
        state.likeList = res.data.data.like.list
      }).catch(() => {
        Taro.showToast({
        title: '载入远程数据出错',
        icon: 'error'
      })
      })
    }
  })
  //2. 定义是否出现该底部弹窗的方法，跨层级传递给评论区的内容组件（用 provide 和 inject 实现）
  // 注意获取子组件的 placeholder 和 id 
const handleCommentClick = (showReolyInput: boolean, placeHolder: string, id: number) => {
  state.showReplyCommentInput = showReolyInput
  state.placeHolder = placeHolder
  state.commentId = id
}
provide('handleCommentClick', handleCommentClick)
// 3. 定义点击按钮发送输入回复的 post 请求
const handleCommentbtnClick = () => {
  state.isLoading = true
  request({
    method: 'POST',
    url: publishComment,
    data: {
      new_id: props.newsInfo.id,
      content: state.commentText,
      comment_id: state.commentId   
    }
  }).then(() => {
    state.isLoading = false
    state.showReplyCommentInput = false
    state.commentText = ''

    // 刷新页面
    setTimeout(() => {
      reFreshDetailPage()
    }, 300)
  }).catch(() => {
    Taro.showToast({
      title: '评论发布失败，请稍后再试',
      icon: 'error'
    })
  })
}
// 4. 定义改变 isCommentloading 值的方法并传递给子组件
const changeCommentLoading = () => {
  state.commentisLoading = !state.commentisLoading
}
</script>
<style lang="scss">
.interaction-wrapper {
  margin-top: 10px;
  border-top: solid 6px rgb(237, 237, 237);
  font-family: 'PingFang SC';
  .interaction-tabpane {
    margin-top: -25px;
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
