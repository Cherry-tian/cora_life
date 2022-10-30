<template>
  <view class="card-user">
    <view class="avatar-wrapper" @tap="() => utils.jumpToUserPage(authorInfo.uid)">
      <nut-avatar size="normal" 
      class="avatar" 
      :icon="authorInfo.avatar_url">
      </nut-avatar>
    </view>
    <view>
      <text class="user-name">{{authorInfo.name}}</text>
      <text class="publish-time"> {{timeStr}}</text>
    </view>
    <!-- 关注按钮逻辑：
    1. 用户首次打开详情页，若已关注该内容发布者则不出现关注按钮
    2. 若未关注该内容发布者，则出现关注按钮
      点击按钮，可以实现关注和取消关注交互（isFollowed = true/false），且按钮样式发生改变（文字和颜色）
    -->
    <!-- 登录用户与内容发布用户关系为： 0：未关注；1：关注，2：粉丝，3：互关；在 1 和 3 时不显示该按钮 -->
    <view
      class="follow-btn"
      v-if="showFollowBtn && (authorInfo.relation_info.relation_type !== followRelation && authorInfo.relation_info.relation_type !== coFollowRelation)"
    >
      <FollowedBtn
        :isFollowed="state.isFollowed"
        :isLoading="state.isLoading"
        :changeIsFollowed="changeIsFollowed"
        :changeIsLoading="changeIsLoading"
        :uid="props.authorInfo.uid"
      />
    </view>
  </view>
</template>
<script setup lang="ts">
import { defineProps, ref, reactive, onMounted } from 'vue';
import * as utils from '@/utils/utils';
import { followRelation, coFollowRelation } from '@/const';
import FollowedBtn from '@/pages/commonComponents/followedBtn.vue';
const props = defineProps(['authorInfo', 'createTime', 'showFollowBtn'])
const state = reactive({
  isLoading: false,
  isFollowed: false
})
const changeIsFollowed = (b) => {
  state.isFollowed = b
}
const changeIsLoading = (b) => {
  state.isLoading = b
}
const timeStr = ref('')
// 调用特定形式显示时间的公共方法,包裹在 onmounted 生命周期函数中
onMounted(() => {
  timeStr.value = utils.publishTimeStr(props.createTime)
})
</script>
<style lang="scss">
.card-user {
  height: 45px;
  display: flex;
  align-items: center;

  .avatar-wrapper {
    width: 35px;
    display: flex;
    justify-content: center;
    margin-right: 5px;

    .avatar {
      width: 30px;
      height: 30px;
    }

  }

  .user-name {
    margin-right: 5px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
  }

  .publish-time {
    font-weight: 400;
    font-size: 11px;
    line-height: 12px;
    /* 灰阶/Color_grey_4 */
    color: $noteFontColor;
  }

  .follow-btn {
    margin-left: auto;
    justify-content: flex-end;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    text-align: center;
    line-height: 22px;
    width: 66px;
    .follow-btton-add {
      font-size: 16px;
    }
  }
}
</style>
