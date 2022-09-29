<template>
  <nut-tabs v-model="state.tab1value" title-scroll title-gutter="8" type="smile" :color=styleConfig.themeColor
    background="#fff">
    <nut-tabpane v-for="item in state.categoryList" :title="item.name" :key="item.id">
      {{item.name}}
    </nut-tabpane>
  </nut-tabs>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import Taro from '@tarojs/taro';
import { getCategoryList } from '@/api/index.js'
import { CateGroy } from '../../types/index'
import { styleConfig } from '@/const'
// 定义 tab 栏分类的数据
const state = reactive<{ categoryList: CateGroy[], tab1value: string }>({
  categoryList: [],
  tab1value: '0'
})
// 用 Taro.request() 方法获取分类栏目的数据，将该方法挂载在 onmounted 生命周期函数上。
onMounted(async () => {
  try {
    const res = await Taro.request({
      url: getCategoryList
    })
    state.categoryList = res.data.data.list
    // console.log(state.categoryList);

  } catch (error) {
    // 获取失败，则调用 Taro.showToast() 提示用户
    Taro.showToast({
      title: '获取分类失败',
      icon: 'error'
    })
  }
})
</script>

 