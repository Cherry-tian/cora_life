<template>
  <view class="publish-wrapper">
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
      :url=uploadImg
      multiple
      maximum="9"
      @success="uploadImgSuccess"
      @failure="uploadImgFailure"
      @delete="uploadImgDelete"
      :headers="state.headers"
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
  <!-- jacle 需要使用原生 input 标签进行一次编译才会出现正确效果 -->
  <!-- <view clase="compile-helper">
    <input type="text" style="height: 0px;"/>
    <textarea style="height: 0px;"></textarea>
    <button style="height: 0px;"></button>
  </view>
  <button @tap="clearLocalMsg">清除本地缓存消息</button> 
  <button @click="clearJWT">清除 jwt</button>  -->
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import Taro from '@tarojs/taro';
import { getPublishCategoryList, publish, uploadImg } from '@/api/index.js';
import { officialCategroyId, localStorageKey } from '@/const';
import { request } from '@/api/request';
import { getLocalStorage } from '@/utils/utils'

interface PubCategoryList {
  id: number,
  name: string
}
interface Data {
  title: string | undefined;
  content: string;
  category_id: number;
  uri_list?: string[];
  uid?: number;
}
const store = useStore()
const props = defineProps({
  jumpToHomePage: {
    type: Function,
    required: true
  }
})

const state = reactive<{title: string, content: string, isLoading: boolean, pubCategoryList: PubCategoryList[], categoryId: number, uriList: string[], headers: any}>({
  title: '',
  content: '',
  isLoading: false,
  pubCategoryList: [],
  categoryId: 0,
  uriList: [],
  headers: {},
})
// 定义判断用户选择分类是否为官方新闻
const isOfficial = computed(() => {
  return state.categoryId === officialCategroyId
})
const packHeaders = async () => {
  const jwt = await getLocalStorage(localStorageKey.jwt).catch(e => {
    console.log('get jwt from local fail, err: ', e)
  })
  state.headers = { jwt }
} 
// 1. 页面初加载则请求发布内容分类列表，将列表分类内容渲染至底部区域，nut-radio组件的label属性与各分类的id绑定。
onMounted(async () => {
  request({
    url: getPublishCategoryList,
    // 对于 GET 方法的数据，会将数据转换成 query string
  }).then((res) => {
    store.commit('changeHomePageLoading', false)
    state.pubCategoryList = res.data.data.list
  }).catch(() => {
    Taro.showToast({
      title: '获取分类列表失败',
      icon: 'error'
    })
  })

  await packHeaders()
})

//2. 点击发送按钮 向后端接口发送 POST 请求及相关数据
const handleBtnClick = () => {
  // 需提前检验用户输入内容是否合法
  const isPassValidation = validatePublishData()
  if (isPassValidation) {
    // 发起请求携带参数
    let data: Data = {
      title: state.title ? state.title : undefined, //只有新闻类需要传入 title
      content: state.content,
      category_id: state.categoryId,
    }
    if (state.uriList.length) {
      // 先过滤 ‘’ 的项
      const uriList = state.uriList.filter(uri => uri.length > 0)
      if (uriList.length) {
        data.uri_list = uriList
      }
    }
    state.isLoading = true
    request({
      method: 'POST',
      url: publish,
      data,
    }).then(() => {
      state.isLoading = false
      Taro.showToast({
        title: '发布成功',
        icon: 'success'
      })
      // 跳转到首页
      setTimeout(() => {
        props.jumpToHomePage()
      }, 500)
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

// 4. 用户上传成功、上传失败、删除图片时更新 uriList
const uploadImgSuccess = ({responseText}) => {
  const resData = JSON.parse(responseText.data) 
  state.uriList.push(resData.data.uri)
}
const uploadImgFailure = () => {
  // 如果上传失败则 push 空字符串，保证 delete 时根据 index 的移除是正确的
  state.uriList.push('')
}
const uploadImgDelete = ({ index }) => {
  state.uriList.splice(index, 1) 
}

// 清除 jwt
const clearJWT = () => {
  Taro.removeStorage({
    key: localStorageKey.jwt
  })
}
// 清除本地消息缓存
const clearLocalMsg = () => {
  Taro.removeStorage({
    key: localStorageKey.commentMsg
  })
  Taro.removeStorage({
    key: localStorageKey.officialMsg
  })
  Taro.removeStorage({
    key: localStorageKey.fansMsg
  })
  Taro.removeStorage({
    key: localStorageKey.interactionMsg
  })
}
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
.compile-helper {
  height: 0px;
}
</style>