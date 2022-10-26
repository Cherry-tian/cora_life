<template>
  <view class="msg-comment-wrapper">
    <view class="msg-comment-avatar">
      <nut-avatar
        size="normal"
        :icon="itemInfo.user.avatar_url"
      />
    </view>
    <view class="msg-comment-content">
      <view class="msg-comment-author-name">{{ itemInfo.user.name }}</view>
      <view class="msg-comment-desc">{{ `${itemInfo.isReply? ('回复了你：' + itemInfo.content) : itemInfo.content}` }}</view>
      <view class="msgcomment-time">{{utils.publishTimeStr(itemInfo.create_time)}}</view>
    </view>
    <view class="comment-img">
      <img class="msg-comment-img" :src="itemInfo.newsInfo.img" @tap="handleClickImg" />
    </view>
  </view>
</template>
<script setup lang="ts">
import utils from '@/utils/utils';
import { onMounted, reactive } from 'vue';
import Taro from '@tarojs/taro';
import { getMegNews } from '@/api/index.js';
import { useStore } from 'vuex';
const props = defineProps({
  itemInfo: {
    type: Object,
    required: true
  }
})
const store = useStore()
// 在初次渲染完成后发送请求获取评论的新闻 id 对应的新闻内容，newsInfo 以提供给详情页
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
  utils.jumpToDetailPage(store, state.newsInfo)
}
</script>
<style lang="scss">
.msg-comment-wrapper {
  border-bottom: 1px solid #ebebeb;
  display: flex;
  justify-content: center;
  padding-top: 6px;
  .msg-comment-avatar {
    width: 30px;
    height: 30px;
  }
  .msg-comment-content {
    padding-left: 25px;
    .msg-comment-author-name {
      font-family: 'PingFang SC';
      font-weight: 500;
      font-size: 13px;
      text-align:left;
    }
    .msg-comment-desc {
      font-family: $fontFamilyText;
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
      color: #3d3d3d;
      text-align:left
    }
    .msgcomment-time {
      font-weight: 400;
      font-size: 11px;
      line-height: 14px;
      /* 灰阶/Color_grey_4 */
      color: $noteFontColor;
    }
  }
  .comment-img {
    margin-left: auto;
    justify-content: flex-end;
    .msg-comment-img {
      width: 52px;
      height: 52px;
    }
  }
}
</style>
