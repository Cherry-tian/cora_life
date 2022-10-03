import { createApp } from 'vue'
import './app.scss'
import {
  Button,
  Toast,
  Tabbar,
  TabbarItem,
  Icon
 } from '@nutui/nutui-taro';
import store from './store/index'

const App = createApp({
  onShow(options) { },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
}).use(store)
  .use(Button)
  .use(Toast)
  .use(Icon)
  .use(TabbarItem)
  .use(Tabbar)

export default App
