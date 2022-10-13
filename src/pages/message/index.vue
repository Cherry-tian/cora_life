<template>
  <view class="message-tab-wrapper">
    <nut-tabs v-model="state.tabIndex" background="white" color="#4382e2">
   <nut-tabpane title="官方" class="my-tab-tabpane">
     <OfficialCard v-for="item in state.officialList" :key="item.id" :itemInfo="item" />
   </nut-tabpane>
   <nut-tabpane title="评论" class="my-tab-tabpane">
    <Loading v-if="state.commentIsLoading"/>
     <CommentCard  v-for="item in state.commentList" :key="item.comment_id" :itemInfo="item" />
   </nut-tabpane>
   <nut-tabpane title="粉丝" class="my-tab-tabpane">
    <Loading v-if="state.fansIsLoading" />
     <FansCard v-for="item in state.fansList" :key="item.follow_uid" :itemInfo="item" />
   </nut-tabpane>
   <nut-tabpane title="赞和收藏" class="my-tab-tabpane">
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
import { getOfficialMsgList, getCommentMsgList, getInteractionMsgList, getUserFansList} from '@/api/index.js';
import Loading from './components/loading.vue';
import FansCard from '../commonComponents/FansCard.vue';
 
const store = useStore()

const offcialTabIndex = '0'
const commentTabIndex = '1'
const fansTabIndex = '2'
const likeTabIndex = '3'
const state = reactive({
  tabIndex: offcialTabIndex,
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
onMounted(() => {
  Taro.request({
    url: getOfficialMsgList,
    data: {
      cursor: state.officialNextCursor, //起始游标
      count: 5, // 请求数量
      uid: 123 //TODO：用户 ID
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
 })
 // 2. 页面首次切换到 评论、粉丝和赞 的时候加载对应数据内容
 watch(
   () => state.tabIndex,
   (newTabIndex) => {
    // 首次切换到评论栏
     if (newTabIndex === commentTabIndex && !state.commentList.length) {
      Taro.request({
        url: getCommentMsgList,
        data: {
          cursor: state.commentNextCursor, //起始游标
          count: 10, // 请求数量
          uid: 123 //TODO：用户 ID
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
     // 首次切换到粉丝栏
     if (newTabIndex === fansTabIndex && !state.fansList.length) {
      Taro.request({
        url: getUserFansList,
        data: {
          cursor: state.fansNextCursor, //起始游标
          count: 10, // 请求数量
          uid: 123 //TODO：用户 ID
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
     // 首次切换到赞和收藏栏
     if (newTabIndex === likeTabIndex && !state.likeList.length) {
      Taro.request({
        url: getInteractionMsgList,
        data: {
          cursor: state.likeNextCursor, //起始游标
          count: 10, // 请求数量
          uid: 123 //TODO：用户 ID
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
   }
 )
 
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
 
