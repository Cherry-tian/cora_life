<template>
  <!--  -->
  <view class="message-tab-wrapper">
    <nut-tabs v-model="state.tabIndex" background="white">
      <template v-slot:titles>
        <div
          class="nut-tabs__titles-item"
          v-for="item in state.tabList"
          @click="state.tabIndex=item.key"
          :class="{active:state.tabIndex==item.key}"
          :key="item.key"
        >
          <nut-badge dot v-if="!item.hasRead">
            <span class="nut-tabs__titles-item__text">{{item.title}}</span>
          </nut-badge>
          <span class="nut-tabs__titles-item__text" v-else>{{item.title}}</span>
          <span class="nut-tabs__titles-item__line" :style="`background: ${styleConfig.themeColor};`"></span>
        </div>
      </template>
      <nut-tabpane class="my-tab-tabpane" :pane-key="TabIndex.offcial">
        <OfficialCard v-for="item in state.officialList" :key="item.id" :itemInfo="item" />
      </nut-tabpane>
      <nut-tabpane class="my-tab-tabpane" :pane-key="TabIndex.comment">
        <Loading v-if="state.commentIsLoading"/>
        <CommentCard  v-for="item in state.commentList" :key="item.comment_id" :itemInfo="item" />
      </nut-tabpane>
      <nut-tabpane class="my-tab-tabpane" :pane-key="TabIndex.fans">
        <Loading v-if="state.fansIsLoading" />
        <FansCard v-for="item in state.fansList" :key="item.follow_uid" :itemInfo="item" />
      </nut-tabpane>
      <nut-tabpane class="my-tab-tabpane" :pane-key="TabIndex.like">
        <Loading v-if="state.likeIsLoading" />
        <LikeCard v-for="item in state.likeList" :key="item.user.uid" :itemInfo="item" />
      </nut-tabpane>
    </nut-tabs>
  </view>
 </template>
 <script setup lang="ts">
 import { onMounted, reactive, watch } from 'vue';
import Taro from '@tarojs/taro';
import { useStore } from 'vuex';
import OfficialCard from './components/officialCard.vue';
import CommentCard from './components/CommentCard.vue';
import LikeCard from './components/LikeCard.vue';
import { getOfficialMsgList, getCommentMsgList, getInteractionMsgList, getUserFansList } from '@/api/index.js';
import Loading from './components/loading.vue';
import FansCard from '../commonComponents/FansCard.vue';
import { styleConfig } from '@/const'
import { TabIndex, tabList } from './const'
 
const store = useStore()

const state = reactive({
  tabIndex: TabIndex.offcial,
  tabList,
  officialList: [],
  officialHasMore: false, //当前页面是否有更多新闻
  officialNextCursor: 0, //下次请求的游标
  commentList: [],
  commentHasMore: false, 
  commentNextCursor: 0,
  commentIsLoading: true,
  fansList: [],
  fansHasMore: false, 
  fansNextCursor: 0,
  fansIsLoading: true,
  likeList: [], //包含赞和收藏的列表
  likeHasMore: false, 
  likeNextCursor: 0,
  likeIsLoading: true
})
 
 // 1. 页面初次加载时请求 官方消息 的数据内容
onMounted(async () => {
  await fetchOfficialMsgs()
})
 // 2. 页面首次切换到 评论、粉丝和赞 的时候加载对应数据内容
watch(
  () => state.tabIndex,
  async (newTabIndex) => {
    console.log('newTabIndex',newTabIndex)
    // 首次切换到评论栏
    if (newTabIndex === TabIndex.comment && !state.commentList.length) {
      await fetchCommentMsgs()
    }
    // 首次切换到粉丝栏
    if (newTabIndex === TabIndex.fans && !state.fansList.length) {
      await fetchUserFanss()
    }
    // 首次切换到赞和收藏栏
    if (newTabIndex === TabIndex.like && !state.likeList.length) {
      await fetInteractionMsgs()
    }
  }
)
const fetchOfficialMsgs = async () => {
  Taro.request({
    url: getOfficialMsgList,
    data: {
      cursor: state.officialNextCursor, //起始游标
      count: 10, // 请求数量
    },
    header: { // TODO remove jwt
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsIm9wZW5JZCI6IjEiLCJpYXQiOjE2NjcxMTI4NzAsImV4cCI6MTY2NzU0NDg3MH0.XDjPRUCMUFxoeqCU6kLLmYnbaNLMlrJpJq0Pfo62QuM'
    }
  }).then((res) => {
    state.officialList = res.data.data.list
    store.commit('changeHomePageLoading', false)
    state.officialHasMore = res.data.data.has_more
    state.officialNextCursor = res.data.data.next_cursor
  }).catch(() => {
    Taro.showToast({
      title: '载入远程数据出错',
      icon: 'error'
    })
  })
}
const fetchCommentMsgs = async () => {
  Taro.request({
    url: getCommentMsgList,
    data: {
      cursor: state.commentNextCursor, //起始游标
      count: 10, // 请求数量
    },
    header: { // TODO remove jwt
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsIm9wZW5JZCI6IjEiLCJpYXQiOjE2NjcxMTI4NzAsImV4cCI6MTY2NzU0NDg3MH0.XDjPRUCMUFxoeqCU6kLLmYnbaNLMlrJpJq0Pfo62QuM'
    }
  }).then((res) => {
    state.commentList = res.data.data.list
    state.commentIsLoading = false
    state.commentHasMore = res.data.data.has_more
    state.commentNextCursor = res.data.data.next_cursor
  }).catch(() => {
    Taro.showToast({
      title: '载入远程数据出错',
      icon: 'error'
    })
  })
}
const fetchUserFanss = async () => {
  return Taro.request({
    url: getUserFansList,
    data: {
      cursor: state.fansNextCursor, // 起始游标
      count: 20, // 请求数量
    },
    header: { // TODO remove jwt
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsIm9wZW5JZCI6IjEiLCJpYXQiOjE2NjcxMTI4NzAsImV4cCI6MTY2NzU0NDg3MH0.XDjPRUCMUFxoeqCU6kLLmYnbaNLMlrJpJq0Pfo62QuM'
    }
  }).then((res) => {
    state.fansList = res.data.data.list
    state.fansIsLoading = false
    state.fansHasMore = res.data.data.has_more
    state.fansNextCursor = res.data.data.next_cursor
  }).catch(() => {
    Taro.showToast({
      title: '载入远程数据出错',
      icon: 'error'
    })
  })
}
const fetInteractionMsgs = async () => {
  return Taro.request({
    url: getInteractionMsgList,
    data: {
      cursor: state.likeNextCursor, //起始游标
      count: 10, // 请求数量
    },
    header: { // TODO remove jwt
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsIm9wZW5JZCI6IjEiLCJpYXQiOjE2NjcxMTI4NzAsImV4cCI6MTY2NzU0NDg3MH0.XDjPRUCMUFxoeqCU6kLLmYnbaNLMlrJpJq0Pfo62QuM'
    }
  }).then((res) => {
    state.likeList = res.data.data.list
    state.likeIsLoading = false
    state.likeHasMore = res.data.data.has_more
    state.likeNextCursor = res.data.data.next_cursor
  }).catch(() => {
    Taro.showToast({
      title: '载入远程数据出错',
      icon: 'error'
    })
  })
}

</script>
<style lang="scss">
.message-tab-wrapper {
  margin-top: 5px;
  .my-tab-tabpane {
   padding-top: 0;
   padding-bottom: 90px;
 }
}
</style>
 
