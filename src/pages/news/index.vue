<template>
  <view>
    <view class="news-content" id="scroll">
      <nut-infiniteloading
        containerId = 'scroll'
        :use-window='false'
        :has-more="state.hasMore"
        @load-more="loadMore"
        load-txt="加载中..."
        load-more-txt="没有更多了"
        load-icon="loading"
    >
      <NewsFeedCard 
        v-for="item in state.categoryNewList" 
        :key="item.user_new.id" 
        :itemInfo="item.user_new"
      />
    </nut-infiniteloading>
      <!-- <view class="feed-bottom-text">没有更多了</view> -->
    </view>
  </view>

</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import NewsFeedCard from './components/newsFeedCard.vue';
import { CategoryNewList } from '@/types/common';
import Taro from '@tarojs/taro';
import * as utils from '@/utils/utils';
import { newsCategoryId } from '@/const';
import { useStore } from 'vuex';
import { request } from '@/api/request';

const store = useStore()
const state = reactive<{categoryNewList:CategoryNewList[], hasMore:boolean, nextCursor:number}>({
  categoryNewList: [],
  hasMore: false, //当前页面是否有更多新闻
  nextCursor: 0 //下次请求的游标
})
const fetchGetOfficialNewList = async () => {
  return request({
    // url 类同于 home 页面的 URL 内容，故可以封装为 utils 文件中的一个方法调用
    url: utils.getCategoryNewListUrl({category_id: newsCategoryId, cursor: state.nextCursor})
  }).then((res) => {
    state.categoryNewList.push(...res.data.data.list)
    store.commit('changeHomePageLoading', false)
    state.hasMore = res.data.data.has_more
    state.nextCursor = res.data.data.next_cursor
  }).catch((error) => {
    // 请求失败: 报错获取失败，则调用 Taro.showToast() 提示用户
    Taro.showToast({
      title: error.message,
      icon: 'error'
    })
  })
}
// 在 onmounted 生命周期函数中发起数据请求
onMounted(() => {
  fetchGetOfficialNewList();
})
// 滚动刷新
const loadMore = (done: any) => {
  fetchGetOfficialNewList();
  done();
}
</script>
<style lang="scss">
.news-content {
  height: calc(100vh - 76px);
  width: 100%;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;
  .feed-bottom-text {
    margin-top: 5px;
    font-weight: 400;
    font-size: 12px;
    line-height: 25px;
    color: $noteFontColor;
    text-align: center;
  }
}

</style>
