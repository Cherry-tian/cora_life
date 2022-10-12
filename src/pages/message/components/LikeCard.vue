<template>
  <view class="msg-like-wrapper">
    <view class="msg-like-avatar">
      <nut-avatar
        size="normal"
        :icon="itemInfo.user.avatar_url"
      />
    </view>
    <view class="msg-like-content">
      <view class="msg-like-author-name">{{ itemInfo.user.name }}</view>
      <view class="msg-like-icon">
        <!-- 点赞关系和收藏关系的 icon 不同 -->
        <nut-icon v-if="itemInfo.type === likeRelation" name="heart1" size="16" color="#999"></nut-icon>
        <nut-icon v-if="itemInfo.type === favoriteRelation" name="star-n" size="16" color="#999"></nut-icon>
      </view>
      <view class="msglike-time">{{ utils.publishTimeStr(itemInfo.create_time) }}</view>
    </view>
    <view class="msg-news-img">
      <img class="news-img" :src="itemInfo.newsInfo.img" @tap="handleClickImg" />
    </view>
  </view>
</template>
<script setup lang="ts">
import utils from '@/utils/utils';
import { onMounted, reactive } from 'vue';
import Taro from '@tarojs/taro';
import { getMegNews } from '@/api/index.js';
import { useStore } from 'vuex';
import { likeRelation, favoriteRelation } from '@/const';
const props = defineProps({
  itemInfo: {
    type: Object,
    required: true
  }
})
const store = useStore()
// 在初次渲染完成后发送请求获取点赞/收藏的新闻 id 对应的新闻内容，newsInfo 以提供给详情页
const state = reactive({
  newsInfo: {}
})
onMounted(() => {
  Taro.request({
    url: getMegNews,
    data: {
      new_id_list: props.itemInfo.newsInfo.id,
      uid: 122 //当前登录用户 id
    }
  }).then((res) => {
    state.newsInfo = res.data.data.list[0].user_new
    // console.log(state.newsInfo);
  }).catch(() => {
    Taro.showToast({
      title: '获取远程数据出错',
      icon: 'error'
    })
  })
})
const handleClickImg = () => {
  //  改变 store 中 newsInfo 的状态
  store.commit('changeNewsInfo', state.newsInfo)
   // 用 Taro.navigateTo 实现路由跳转
   Taro.navigateTo({
    url: '/pages/detail/index'
  })
  
}
</script>
<style lang="scss">
.msg-like-wrapper {
  border-bottom: 1px solid #ebebeb;
  display: flex;
  justify-content: center;
  padding-top: 6px;
  .msg-like-avatar {
    width: 30px;
    height: 30px;
  }
  .msg-like-content {
    padding-left: 25px;
    .msg-like-author-name {
      padding-bottom: 2px;
      font-family: 'PingFang SC';
      font-weight: 500;
      font-size: 13px;
      text-align:left;
    }
    .msg-like-icon {
      height: 18px;
    }
    .msglike-time {
      font-weight: 400;
      font-size: 11px;
      line-height: 14px;
      /* 灰阶/Color_grey_4 */
      color: $noteFontColor;
    }
  }
  .msg-news-img {
    margin-left: auto;
    justify-content: flex-end;
    .news-img {
      width: 52px;
      height: 52px;
    }
  }
}
</style>
