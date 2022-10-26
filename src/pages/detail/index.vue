<template>
  <view class="detail-page-wrapper">
    <!-- 卡片部分 -->
    <view class="detail-page">
      <CardUser 
      :authorInfo="state.newsInfo.author" 
      :createTime="state.newsInfo.create_time"
      :showFollowBtn = 'true'
      />
      <CardContent 
      :contentText="state.newsInfo.desrciprtion" 
      :imgList="state.newsInfo.image_url_list"
      :isOfficial="state.newsInfo.is_official"
      :contentTitle="state.newsInfo.title"  />
    </view>
    <!-- 交互部分 -->
    <Interaction :newsInfo="state.newsInfo" />
    <!-- 占位符 -->
    <view class="place-holder"></view>
    <!-- 底部 -->
    <DetailFooter :newsId="state.newsInfo.id" :interaction="state.newsInfo.interaction" />
  </view>
</template>
<script setup lang="ts">
import CardUser from '../commonComponents/cardUser.vue';
import CardContent from './components/cardContent.vue';
import { useStore } from 'vuex';
import Interaction from './components/interaction/interaction.vue';
import DetailFooter from './components/detailFooter.vue';
import { reactive, onMounted } from 'vue';
import utils from '@/utils/utils';

const store = useStore()
const state = reactive({
  newsInfo: store.state.newsInfo
})
onMounted(() => {
  utils.showShareMenu()
})
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
