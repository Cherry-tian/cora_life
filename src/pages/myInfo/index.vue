<template>
  <view class="my-info-edit">
    <nut-uploader :url="uploadImg" class="myinfo-upload-avatar" maximum="1" accept="image/*"
      @success="handleUploadeSuccess">
      <nut-avatar size="75" :icon="state.userInfo?.avatar_url" ></nut-avatar>
      <view class="change-avatar">更换头像</view>
    </nut-uploader>
  </view>
  <view class="myinfo-content">
    <nut-cell-group>
      <nut-cell title="昵称" :desc="name" is-link @tap="state.showChangeName = true"></nut-cell>
      <nut-cell title="简介" :desc="userDesc" is-link @tap="state.showChangeDesc = true"></nut-cell>
    </nut-cell-group>
  </view>
  <!-- 底部弹出框 -->
  <nut-popup 
    :style="{ height: '30%' }" 
    position="bottom"
    v-model:visible="state.showChangeName" 
    :z-index="100"
    >
    <view class="footer-input-area">
      <nut-textarea 
        class="input-area"
        v-model="state.userInfo.name" 
        placeholder="昵称：" 
        limit-show max-length="8"
        text-align="left"
      />
      <nut-button 
        class="input-btn"
        size="small"
        plain 
        color="#ff5900"
        :loading="state.isLoading"
        @tap="handleClickSave"
        >
        {{`${state.isLoading ? '' : '保存'}`}}
      </nut-button>
    </view>
   </nut-popup>
   <nut-popup 
    :style="{ height: '30%' }" 
    position="bottom"
    v-model:visible="state.showChangeDesc" 
    :z-index="100"
    >
    <view class="footer-input-area">
      <nut-textarea 
        class="input-area"
        v-model="state.userInfo.description" 
        placeholder="简介：" 
        limit-show max-length="50"
        text-align="left"
        rows="2"
      />
      <nut-button 
        class="input-btn"
        size="small"
        plain 
        color="#ff5900"
        :loading="state.isLoading"
        @tap="handleClickSave"
        >
        {{`${state.isLoading ? '' : '保存'}`}}
      </nut-button>
    </view>
   </nut-popup>
</template>
<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import Taro from '@tarojs/taro';
import { editUserInfo, uploadImg } from '@/api/index.js';
import { request } from '@/api/request';

const store = useStore()
const state = reactive({
  userInfo: store.state.userInfo,
  showChangeName: false,
  showChangeDesc: false,
  isLoading: false,
  avatar_uri: ''
})
//1. 昵称和简介部分如果无内容默认是“昵称”和 “简介” （简介字数不超过20）
const name = computed(() => {
  return state.userInfo?.name? state.userInfo?.name : '昵称'
})
const userDesc = computed(() => {
  if (state.userInfo.description) {
    return state.userInfo.description?.length > 20 ? state.userInfo.description.substring(0, 20) + '...' :  state.userInfo.description
  }
  return '简介'
})
// 更换头像成功则获取图片对应 uid, 并提示用户新头像审核中
const handleUploadeSuccess = ({responseText}) => {
  const resData = JSON.parse(responseText.data)
  state.avatar_uri = resData.data.uri

  Taro.showToast({
      title: '新头像审核中',
      icon: 'success'
  })
}
// 2. 点击弹框保存发送更改用户资料的数据请求
const handleClickSave = () => {
  state.isLoading = true
  request({
    method: 'POST',
    url: editUserInfo,
    data: {
      name: state.userInfo.name || undefined,
      description: state.userInfo.description || undefined,
      avatar_uri: state.avatar_uri || undefined,
    }
  }).then(() => {
    state.isLoading = false
    state.showChangeDesc = false
    state.showChangeName = false
    Taro.showToast({
      title: '修改资料成功',
      icon: 'success'
    })
  }).catch(() => {
    Taro.showToast({
      title: '修改资料失败！',
      icon: 'error'
    })
  })
}
</script>
<style lang="scss">
  .my-info-edit {
    display: flex;
    justify-content: center;
    margin: 35px 0 20px 0;
    .change-avatar {
      padding-left: 14px;
      font-size: 14px;
    }
  }
  .myinfo-content {
    padding: 0 10px;
    
    .nut-cell__title {
      color: black;
    }
    .nut-cell__value {
      color: $descGrayColor;
    }
  }
.footer-input-area {
  padding-top: 15px;
  display: flex;
  .textarea {
    height: 0;
  }
  .button {
    height: 0;
    text-align: left;
  }
  // .input-area {
  //   padding-top: 15px;
  // }
  .input-btn {
    width: 50px;
    margin-left: auto;
    margin-right: 15px;
    margin-top: 10px;
    justify-content: flex-end;
  }
}
</style>
