<template>
  <view class="detail-page-wrapper">
    <!-- 卡片部分 -->
    <view class="detail-page">
      <CardUser 
        :authorInfo="state.newsInfo?.author" 
        :createTime="state.newsInfo?.create_time"
        :showFollowBtn='true'
      />
      <CardContent 
        :contentText="state.newsInfo?.desrciprtion" 
        :imgList="state.newsInfo?.image_url_list"
        :isOfficial="state.newsInfo?.is_official"
        :contentTitle="state.newsInfo?.title"
      />
    </view>
    <!-- 交互部分 -->
    <Interaction :newsInfo="state.newsInfo" />
    <!-- 占位符 -->
    <view class="place-holder"></view>
    <!-- 底部 -->
    <DetailFooter :newsId="state.newsInfo?.id" :interaction="state.newsInfo?.interaction" />
  </view>
</template>
<script setup lang="ts">
import CardUser from '../commonComponents/cardUser.vue';
import CardContent from './components/cardContent.vue';
import { User_new } from '@/types/common'
import Interaction from './components/interaction/interaction.vue';
import DetailFooter from './components/detailFooter.vue';
import { reactive, onMounted } from 'vue';
import * as utils from '@/utils/utils';
import Taro from '@tarojs/taro';
import { appConfig } from '@/const';

const state = reactive<{
  newsInfo: User_new
}>({
  newsInfo: {},
})
onMounted(async () => {
  utils.showShareMenu()
  const newsId = getNewsIdFromRouter()
  state.newsInfo = await utils.getNewsInfoById(newsId)
})
// Taro useShareAppMessage https://nervjs.github.io/taro-docs/docs/composition-api#useshareappmessage
// Taro onShareAppMessage https://nervjs.github.io/taro-docs/docs/vue-page#onshareappmessage-object
// 本质是微信的 onShareAppMessage https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/practice/appshare.html
// 走「按钮触发分享」的，和「右上角圆点分享」最后都会走这个方法
Taro.useShareAppMessage(res => {
  if (res.from === 'button') {
    // 来自页面内转发按钮，暂时不用做什么区分
    console.log('res',res)
  }
  return {
    title: appConfig.name,
    path: `/pages/detail/index?news_id=${state.newsInfo.id}`
  }
})
// 从路由参数中获取新闻id
const getNewsIdFromRouter = () => {
  const routerParams = Taro.getCurrentInstance().router.params
  return routerParams.news_id
}
</script>
<style lang="scss">
// .detail-page-wrapper {
//   height: calc(100vh - 75px);
// }
.detail-page {
  margin: 5px 22px;
}
.place-holder {
  height: 75px;
}
</style>
