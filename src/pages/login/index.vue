<template>
  <view class="login-wrapper">
    <view class="login-page">
      <nut-button  
        class="login-button"
        :color="styleConfig.wechatColor"
        :loading="state.isLoading"
        @tap="handleClick"
      >
        微信授权登录
      </nut-button>
      <view class="login-content">
        授权后应用将获取以下权限
        <view class="login-content-detail">
          <nut-icon name="Check" size="10"></nut-icon>
            获得你的公开信息（头像，昵称）
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { styleConfig, localStorageKey } from '@/const';
import { useStore } from 'vuex';
import Taro from '@tarojs/taro';
import { login } from '@/api/index.js';
import { request } from '@/api/request';

const store = useStore()
store.commit('changeHomePageLoading', false)
const state = reactive({
  isLoading: false,
  wxUserInfo: {} // 微信用户信息
})
const handleClick = () => {
  state.isLoading = true
  // 1. 调用 Taro.getUserProfile() 获取用户资料 https://taro-docs.jd.com/docs/apis/open-api/user-info/getUserProfile
  Taro.getUserProfile({
    desc: '用于获取用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      state.wxUserInfo = res.userInfo
      // console.log('state.wxUserInfo', state.wxUserInfo)
      // 2. 调用接口获取登录凭证（code） https://taro-docs.jd.com/docs/apis/open-api/login/
      Taro.login({
        success: function (res) {
        if (res.code) {
          //发起网络请求
          // console.log('res.code',res.code)
          request({
            method: 'POST',
            url: login,
            data: {
              code: res.code,
              avatarUrl: state.wxUserInfo.avatarUrl,
              nickName: state.wxUserInfo.nickName,
            },
          }).then((res2) => {
            // 将服务端返回的登录态 token 保存至 localStorage 中, 微信小程序不支持 localStorage 改用 Taro.setStorage 方法
            Taro.setStorage({
              key: localStorageKey.jwt,
              data: res2.data.data.jwt,
            })
            state.isLoading = false
            Taro.showToast({
              title: '登录成功!',
              icon: 'success'
            })
            // 登录成功后，等 500ms 页面跳转回去
            setTimeout(() => {
              Taro.navigateBack()
            }, 500)
          })
        } else {
          console.log('登录失败！' + res.errMsg)
          Taro.showToast({
              title: '登录失败！',
              icon: 'error'
            })
         }
       }
     })
    },
    fail: (res) => {
      console.log('getUserProfile, err', res);
      Taro.showToast({
        title: '请稍后重试',
        icon: 'error'
      })
    }
})
  // TODO 本意是想页面跳转到登录页时，左上角不显示「返回」按钮，保证用户必须登录才能进行下一步。但是 hideHomeButton 调用成功了似乎没有生效
  // Taro.hideHomeButton: https://taro-docs.jd.com/taro/docs/apis/ui/navigation-bar/hideHomeButton 
  // onShow: https://taro-docs.jd.com/taro/docs/vue-page#onshow-
  /* onMounted(()=>{
    Taro.eventCenter.once(Taro.getCurrentInstance().router.onShow, () => {
      console.log('onShow')
      Taro.hideHomeButton();
    })
  }) */
}
</script>
<style lang="scss">
.login-wrapper {
  width: 100%;
  height: calc(100vh - 78px);
  display: flex;
  justify-content: center;
  align-items: center;
  .login-page {
    .login-button {
      width: 303px;
      height: 44px;
      font-size: 16px;
    }
    .login-content {
      padding-top: 50px;
      width: 303px;
      text-align: left;
      color: rgb(156, 158, 165);
      font-size: 12px;
      font-family: 'PingFang SC';
      line-height: 20px;
    }
  }  
}
</style>
