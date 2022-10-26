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
        >
          <FeedCard 
            v-for="item in state.categoryNewList" 
            :key="item.user_new.id" 
            :itemInfo="item.user_new" 
          />
          <view class="feed-bottom-text">没有更多了</view>
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
import utils from '@/utils/utils';
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
  hasMore: false, //当前页面是否有更多新闻
  nextCursor: 0, //下次请求的游标
  loading: true,
})

const categoryNew = reactive(new Map()) 
const getCurrentCategroyIdByTabIndex = (tabIndex: string): number =>  {
  let index = Number(tabIndex)
  return state.categoryList[index].id 
}
// 1. 用 Taro.request() 方法获取分类栏目的数据，将该方法挂载在 onmounted 生命周期函数上。
// 3. 初次进入页面获取新闻内容数据 可将两次请求结果同时处理，promise.all()
onMounted(() => {
  const requestTask = [Taro.request({
    url: getCategoryList,
  }), Taro.request({
    // 页面第一次打开时，默认先请求「最新」tab下的数据
    url: utils.getCategoryNewListUrl({ category_id: newestCategoryID })
  })]
  // 等待所有 Promise 请求结果返回，再继续执行 同时改变 homePageLoding 状态
  Promise.all(requestTask).then(([res1, res2]) => {
    state.categoryList = res1.data.data.list
    store.commit('changeHomePageLoading', false)
    state.loading = false

    state.categoryNewList = res2.data.data.list
    categoryNew.set(state.tabIndex, state.categoryNewList)
    state.hasMore = res2.data.data.has_More
    state.nextCursor = res2.data.data.next_cursor
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
    if (!categoryNew.has(tabIndex)) {
      // 针对每个 categroy 发起请求前清空当前数据
      state.categoryNewList =[]
      const res = await Taro.request({
        url: utils.getCategoryNewListUrl({ category_id: getCurrentCategroyIdByTabIndex(tabIndex) })
      })
      state.categoryNewList = res.data.data.list
      categoryNew.set(state.tabIndex, state.categoryNewList)
      state.hasMore = res.data.data.has_More
      state.nextCursor = res.data.data.next_cursor
    } else {
      state.categoryNewList = categoryNew.get(tabIndex)
    }  
    state.loading = false
  }
)
</script>
<style lang="scss">
.feed {
  margin-top: -20px;
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
 