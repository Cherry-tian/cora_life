<template>
  <nut-tabs 
    v-model="state.tabIndex" 
    title-scroll 
    title-gutter="8" 
    :color=styleConfig.themeColor
    background="#fff"
  >
    <nut-tabpane 
      v-for="item in state.categoryList" 
      :title="item.name" 
      :key="item.id"
    >
      <view v-if="!state.loading">
        <view 
          class="feed"
          v-if="state.categoryNewList.length > 0"
          id="scroll"
        >
          <nut-infiniteloading
            containerId='scroll'
            :use-window='true'
            :has-more="state.hasMore"
            @load-more="loadMore"
            load-txt="加载中~"
            load-more-txt="没有啦～"
            load-icon="loading"
          >
            <FeedCard 
              v-for="item in state.categoryNewList" 
              :key="item.user_new.id"
              :itemInfo="item.user_new"
            />
          </nut-infiniteloading>
        </view>
        <nut-empty description="无数据" v-else/>
      </view> 
      <FeedLoading v-else/>
    </nut-tabpane>
  </nut-tabs>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
import Taro from '@tarojs/taro';
import { getCategoryList } from '@/api/index.js'
import * as utils from '@/utils/utils';
import { CateGroy } from './type'
import {CategoryNewList} from '@/types/common'
import { styleConfig, newestCategoryID } from '@/const'
import FeedCard from './components/feedCard.vue';
import FeedLoading from './components/feedLoading.vue';
import { useStore } from 'vuex';
const store = useStore()

// 定义 tab 栏分类的数据
const state = reactive<{ categoryList: CateGroy[], tabIndex: string, categoryNewList: CategoryNewList[], hasMore: boolean, nextCursor: number, loading: boolean }>({
  categoryList: [],
  tabIndex: '0', // nut-tabs组件绑定的为 tab 的 index 字符串, 即 '0', '1', '2'...
  categoryNewList: [],
  hasMore: false, // 当前页面是否有更多新闻
  nextCursor: 0, // 下次请求的游标
  loading: true,
})
const categoryNewListMap = new Map()
const hasMoreMap = new Map()
const nextCursorMap = new Map()
const getCurrentCategroyIdByTabIndex = (tabIndex: string): number =>  {
  let index = Number(tabIndex)
  return state.categoryList[index].id 
}
// 1. 用 Taro.request() 方法获取分类栏目的数据，将该方法挂载在 onmounted 生命周期函数上。
// 3. 初次进入页面获取新闻内容数据 可将两次请求结果同时处理，promise.all()
onMounted(async () => {
  // 页面第一次打开时，默认先请求「最新」tab下的数据
  const requestTask = [Taro.request({
    url: getCategoryList,
  }), fetchNewList(newestCategoryID)]
  // 等待所有 Promise 请求结果返回，再继续执行 同时改变 homePageLoding 状态
  Promise.all(requestTask).then(([res]) => {
    state.categoryList = res.data.data.list
    store.commit('changeHomePageLoading', false)
    state.loading = false
  }).catch((error) => {
    state.loading = false
    // 任何一个请求失败，就会报错获取失败，则调用 Taro.showToast() 提示用户
    Taro.showToast({
      title: error.message,
      icon: 'error'
    })
  })
})

// 2. 用 watch() 方法监视 state.currentPage 变化，如果页面双向绑定发生变化，则发起获取分类下内容列表的请求，保存相应数据到 state 中
watch(
  // 监视对象，如果不是 proxy 对象则用回调函数的写法
  () => state.tabIndex,
  // 回调函数 用async函数进行异步请求 url中包含必须传递的参数
  async (tabIndex) => {
    state.loading = true
    // 判断 map 对象中是否有该 ID 对应的值，如果没有则发起请求
    if (!categoryNewListMap.has(tabIndex)) {
      // 针对每个 categroy 发起请求前清空当前数据
      state.categoryNewList = []
      state.hasMore = false
      state.nextCursor = 0
      await fetchNewList(getCurrentCategroyIdByTabIndex(tabIndex))
    } else {
      state.categoryNewList = categoryNewListMap.get(tabIndex)
      state.hasMore = hasMoreMap.get(tabIndex)
      state.nextCursor = nextCursorMap.get(tabIndex)
    }  
    state.loading = false
  }
)

const fetchNewList = async (category_id) => {
  return Taro.request({
    url: utils.getCategoryNewListUrl({
      category_id,
      cursor: state.nextCursor
    })
  }).then(res => {
    if (res.data.data.list?.length) {
      state.categoryNewList.push(...res.data.data.list)
    }
    state.hasMore = res.data.data.has_more
    state.nextCursor = res.data.data.next_cursor
    categoryNewListMap.set(state.tabIndex, state.categoryNewList)
    hasMoreMap.set(state.tabIndex, state.hasMore)
    nextCursorMap.set(state.tabIndex, state.nextCursor)
  }).catch((error) => {
    Taro.showToast({
      title: error.message,
      icon: 'error'
    })
  })
}

const loadMore = (done) => {
  fetchNewList(getCurrentCategroyIdByTabIndex(state.tabIndex))
  done()
}

</script>
<style lang="scss">
.nut-tabpane {
  padding-top: 0px;
}

.feed {
  // 下拉刷新组件 nut-infiniteloading 要求的样式
  height: calc(100vh - 128px);
  width: 100%;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
 