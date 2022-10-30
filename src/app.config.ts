import { styleConfig } from './const/const'
export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/detail/index',
    'pages/myInfo/index',
    'pages/userInfo/index', // 用户信息页，复用个人主页
    'pages/follow/index',
    'pages/fans/index',
    'pages/login/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: styleConfig.themeColor,
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
