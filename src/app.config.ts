import { styleConfig } from './const/const'
export default defineAppConfig({
  pages: [
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: styleConfig.themeColor,
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
