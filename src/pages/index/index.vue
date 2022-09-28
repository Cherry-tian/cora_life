<template>
  <!-- 内容区域 -->
  <view class="content">
    <home v-if="pageIndex == 0" />
    <news v-if="pageIndex == 1" />
    <publish v-if="pageIndex == 2" />
    <message v-if="pageIndex == 3" />
    <My v-if="pageIndex == 4" />
  </view>
  <!-- 底部 tab 栏切换区域 -->
  <nut-tabbar :changePage="changePage" />

</template>

<script setup lang="ts">
// 引入各内容区域对应板块
import Home from '@/pages/home/index.vue'
import News from '@/pages/news/index.vue'
import Publish from '@/pages/publish/index.vue'
import NutTabbar from './components/nut-tabbar.vue'
import Message from '../message/index.vue';
import My from '../my/index.vue';
import { ref } from 'vue';

// 定义根据 index 改变页面的方法
const pageIndex = ref(0)
const changePage = (index: number) => {
  pageIndex.value = index
}

</script>
