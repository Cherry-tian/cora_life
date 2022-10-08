<template>
  <view class="publish-wrapper">
    <!-- 需要使用原生 input 标签进行一次编译才会出现正确效果 -->
    <!-- <input type="text" />
    <textarea></textarea>
    <button></button> -->
    <nut-input 
      v-if="isOfficial"
      class="publish-title"
      v-model="state.title"  
      placeholder="输入标题" 
    />
    <view class="publish-content">
      <nut-textarea 
        v-model="state.content"
        placeholder="这一刻的想法..."
        class="content-textarea"
      />
      <nut-button 
        class="content-button"
        size="small" 
        plain
        color="#ff5900"
        :loading="state.isLoading"
        @tap="handleBtnClick"
      >
        {{ `${state.isLoading ? '' : '发送'}` }}
      </nut-button>
    </view>
    <!-- 图片上传区域 -->
    <nut-uploader 
      class="img-uploader"
      :url="uploadUrl"
      multiple
      maximum="9"
     />
    <!-- 分类列表区域 -->
    <nut-cell class="publish-list">
      <!-- 通过 v-model 绑定值当前选项的 label 即 分类id -->
      <nut-radiogroup direction="horizontal" v-model="state.categoryId">
        <nut-radio 
          v-for="item in state.pubCategoryList"
          :key="item.id"
          shape="button" 
          :label="item.id"
        >
          {{ item.name }}
        </nut-radio>
      </nut-radiogroup>
    </nut-cell>
  </view>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useStore } from 'vuex';
import Taro from '@tarojs/taro';
import { getPublishCategoryList, publish } from '@/api/index.js';
import { officialCategroyId } from '@/const';
interface PubCategoryList {
  id: number,
  name: string
}

const store = useStore()
store.commit('changeHomePageLoading', false)
const state = reactive<{title: string, content: string, isLoading: boolean, pubCategoryList: PubCategoryList[], categoryId: number}>({
  title: '',
  content: '',
  isLoading: false,
  pubCategoryList: [],
  categoryId: 0
})
// TODO: 获取图片的url
const uploadUrl = ref('http://xxxxxx')
// 定义判断用户选择分类是否为官方新闻
const isOfficial = computed(() => {
  return state.categoryId === officialCategroyId
})
// 1. 页面初加载则请求发布内容分类列表，将列表分类内容渲染至底部区域，nut-radio组件的label属性与各分类的id绑定。
onMounted(() => {
  Taro.request({
    url: getPublishCategoryList,
    // 对于 GET 方法的数据，会将数据转换成 query string
    data: {
      uid: 0 // TODO: 获取当前发布内容用户的 uid 并传入
    }
  }).then((res) => {
    state.pubCategoryList = res.data.data.list
  }).catch(() => {
    Taro.showToast({
      title: '获取分类列表失败',
      icon: 'error'
    })
  })
})

//2. 点击发送按钮 向后端接口发送 POST 请求及相关数据
const handleBtnClick = () => {
  // 需提前检验用户输入内容是否合法
  const isPassValidation = validatePublishData()
  if (isPassValidation) {
    state.isLoading = true
    Taro.request({
      method: 'POST',
      url: publish,
      data: {
        title: state.title,
        content: state.content,
        category_id: state.categoryId,
        uri: '', // TODO: 输入登录用户 uid 和上传图片的 URL
        uid: ''
      }
    }).then(() => {
      state.isLoading = false
      Taro.showToast({
        title: '发布成功',
        icon: 'success'
      })
      // TODO: 跳转到某个页面（最新？）
    }).catch(() => {
      state.isLoading = false
      Taro.showToast({
        title: '发布失败，请稍后再试！',
        icon: 'error'
      })
    })
  }
}
// 2.1 检验用户输入内容
const validatePublishData = () => {
  if (!state.content) {
    Taro.showToast({
      title: '请输入正文',
      icon: 'error'
    })
    return false
  }
  if (!state.categoryId) {
    Taro.showToast({
      title: '请选择分类',
      icon: 'error'
    })
    return false
  }
  if (isOfficial.value && !state.title) {
    Taro.showToast({
      title: '请填写标题',
      icon: 'error'
    })
    return false
  }
  return true
}
// 3. 用户每次切换分类，清空已经输入的标题和文本内容
watch(
  () => state.categoryId,
  () => {
    state.title = ''
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss">
.publish-wrapper {
  padding-top: 10px;
  .publish-title {
    font-weight: 500;
  }
  .publish-content {
    display: flex;
    justify-content: center;
    .content-button {
      width: 50px;
      margin: 5px 15px 0 0;
    }
  }
  .img-uploader {
    padding-left: 25px;
  }
  .publish-list {
    
    margin-top: 20px;
    padding: 20px 25px;
  }
}
</style>
