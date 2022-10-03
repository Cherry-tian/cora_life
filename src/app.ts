import { createApp } from 'vue'
import './app.scss'
import {
  Button,
  Toast,
  Avatar,
  Icon,
  Popup,
  OverLay,
  TextArea,
  Tabs,
  TabPane,
  Tabbar,
  TabbarItem,
 } from '@nutui/nutui-taro';
import store from './store/index'

const App = createApp({
  onShow(options) { },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
}).use(store)
  .use(Button)
  .use(Toast)
  .use(Icon)
  .use(Avatar)
  .use(Popup)
  .use(OverLay)
  .use(TextArea)
  .use(Tabs)
  .use(TabPane)
  .use(Tabbar)
  .use(TabbarItem)

export default App
