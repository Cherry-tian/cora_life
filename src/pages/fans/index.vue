<template>
  <view class="fans-page">
    <FansCard v-for="item in state.fansList" :key="item.follow_uid" :itemInfo="item"/>
  </view>
 
</template>
<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import FansCard from '../commonComponents/FansCard.vue';
import Taro from '@tarojs/taro';
import { getUserFansList } from '@/api/index.js';
import { request } from '@/api/request';
import { getUidFromRouter } from '@/utils/utils'
import { countConfig } from '@/const'

const state = reactive({
  fansList: [],
  fansNextCursor: 0,
  fansIsLoading: true,
  fansHasMore: false
})
onMounted(() => {
  request({
    url: getUserFansList,
    data: {
      uid: getUidFromRouter(),
      cursor: state.fansNextCursor, //起始游标
      count: countConfig.relation, // 请求数量
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
})
</script>
<style lang="scss">
.fans-page {
  padding: 0 15px 90px;
}
</style>
