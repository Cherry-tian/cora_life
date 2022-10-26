<template>
  <view class="my-info-wrapper">
    <view class="my-info">
      <view class="my-avatar-wrapper">
        <nut-avatar size="75" 
          class="avatar" 
          :icon="userInfo.avatar_url"
        >
        </nut-avatar>
      </view>
      <view class="my-user-name">{{userInfo.name}}</view>
      <nut-button  
        class="my-edit-button"
        color="black"
        plain
        @tap="handleClick"
        shape="square"
        v-if="isSelf"
      >
        编辑资料
      </nut-button>
      <FollowedBtn
        v-else
        class="my-follow-button"
        :isFollowed="state.isFollowed"
        :isLoading="state.isLoading"
        :changeIsFollowed="changeIsFollowed"
        :changeIsLoading="changeIsLoading"
        :uid="props.userInfo.uid"
      />
      <!-- <button>fix编译bug</button> -->
    </view>
    <view class="my-intro">
      {{userInfo.description}}
    </view>
    <!-- <view class="my-interaction-list">
      <view class="my-like">
        <text class="my-interaction-num">{{userInfo.relation_info.statistics.liked_count}}</text>
        获赞
      </view>
      <view class="my-subscribe" @tap="handleClickFollow">
        <text class="my-interaction-num">{{userInfo.relation_info.statistics.following_count}}</text>
        关注
      </view>
      <view class="my-fans" @tap="handleClickFans">
        <text class="my-interaction-num">{{userInfo.relation_info.statistics.follower_count}}</text>
        粉丝
      </view>
    </view> -->
  </view>
</template>
<script setup lang="ts">
import { useStore } from 'vuex';
import Taro from '@tarojs/taro'
import { reactive, watch } from 'vue';
import { followRelation, coFollowRelation } from '@/const';
import FollowedBtn from '@/pages/commonComponents/followedBtn.vue';

const store = useStore()
const props = defineProps({
  userInfo: {
    type: Object,
    required: true
  },
  isSelf: Boolean
})
const state = reactive({
  isLoading: false,
  isFollowed: false,
})
const changeIsFollowed = (b) => {
  state.isFollowed = b
}
const changeIsLoading = (b) => {
  state.isLoading = b
}
// 点击跳转到编辑资料页面按钮 改变 store 中 userInfo 的值
const handleClick = () => {
  store.commit('changeUserInfo', props.userInfo)
  Taro.navigateTo({
    url: '/pages/myInfo/index'
  })
}
watch(
  () => props.userInfo,
  (newUserInfo) => {
    if (newUserInfo.relation_info.relation_type == followRelation || 
      newUserInfo.relation_info.relation_type == coFollowRelation
    ) {
      state.isFollowed = true
    }
  }
)
// 点击 关注 跳转到关注页
const handleClickFollow = () => {
  Taro.navigateTo({
    url: '/pages/follow/index'
  })
}
// 点击 粉丝 跳转到粉丝页
const handleClickFans = () => {
  Taro.navigateTo({
    url: '/pages/fans/index'
  })
}
</script>
<style lang="scss">
.my-info-wrapper {
  margin: 25px 20px;
  .my-info {
    display: flex;
    align-items: center;
    .my-user-name {
      margin-left: 15px;
      font-size: 22px;
    }
    .my-edit-button {
      margin-left: auto;
      justify-content: flex-end;
      height: 26px;
    }
    .my-follow-button {
      margin-left: auto;
      justify-content: flex-end;
      height: 26px;
    }
  }
  .my-intro {
    font-size: 14px;
    color: rgb(115, 119, 128);
    line-height: 20px;
    padding: 20px 0;
  }
  .my-interaction-list {
    display: flex;
    font-size: 14px;
    color: rgb(115, 119, 128);
    line-height: 20px;
    .my-like, .my-subscribe, .my-fans {
      padding-right: 15px;
      .my-interaction-num {
        color: black;
        font-weight: 600;
        font-size: 16px;
      }
    }
   
  }
}
</style>
