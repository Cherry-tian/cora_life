<template>
  <view>
    <view class="news-content">
      <NewsFeedCard 
      v-for="item in state.categoryNewList" 
        :key="item.user_new.id" 
        :itemInfo="item.user_new" />
      <view class="feed-bottom-text">没有更多了</view>
    </view>
  </view>

</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import NewsFeedCard from './components/newsFeedCard.vue';
import { CategoryNewList } from '@/types/common';
import Taro from '@tarojs/taro';
import utils from '@/utils/utils';
import { newsCategoryId } from '@/const';
import { useStore } from 'vuex';
import { request } from '@/api/request';

const store = useStore()
const state = reactive<{categoryNewList:CategoryNewList[], hasMore:boolean, nextCursor:number}>({
  categoryNewList: [],
  hasMore: false, //当前页面是否有更多新闻
  nextCursor: 0 //下次请求的游标
})

// 在 onmounted 生命周期函数中发起数据请求
onMounted(() => {
  request({
    // url 类同于 home 页面的 URL 内容，故可以封装为 utils 文件中的一个方法调用
    url: utils.getCategoryNewListUrl({category_id: newsCategoryId})
  }).then((res) => {
    state.categoryNewList = res.data.data.list
    store.commit('changeHomePageLoading', false)
    state.hasMore = res.data.data.has_More
    state.nextCursor = res.data.data.next_cursor
  }).catch((error) => {
    // 请求失败: 报错获取失败，则调用 Taro.showToast() 提示用户
    Taro.showToast({
      title: error.message,
      icon: 'error'
    })
  })
})
</script>
<style lang="scss">
.news-content {
  width: 100%;
  margin-bottom: 60px;
  .feed-bottom-text {
    font-weight: 400;
    font-size: 12px;
    line-height: 25px;
    color: $noteFontColor;
    text-align: center;
  }
}

</style>
