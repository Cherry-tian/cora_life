import { createApp } from 'vue'
import './app.scss'
import store from './store/index'

// taro 全局加载
import NutUI from "@nutui/nutui-taro"
import "@nutui/nutui-taro/dist/style.css";
const App = createApp({
  onShow(options) { },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
}).use(NutUI).use(store)

// taro 按需加载
// import {
//   Button,
//   Avatar,
//   Icon,
//   Popup,
//   OverLay,
//   TextArea,
//   Tabs,
//   TabPane,
//   Tabbar,
//   TabbarItem,
//   ImagePreview,
//   Input,
//   Radio,
//   RadioGroup,
//   Cell,
//   CellGroup,
//   Uploader,
//   Progress,
//   Swiper,
//   SwiperItem,
//   InfiniteLoading,
//   Empty,
// } from "@nutui/nutui-taro";

// const App = createApp({
//   onShow(options) {},
// })
//   .use(store)
//   .use(Button)
//   .use(Icon)
//   .use(Avatar)
//   .use(OverLay)
//   .use(TextArea)
//   .use(Tabs)
//   .use(TabPane)
//   .use(Tabbar)
//   .use(TabbarItem)
//   .use(Popup)
//   .use(ImagePreview)
//   .use(Input)
//   .use(Radio)
//   .use(RadioGroup)
//   .use(Cell)
//   .use(CellGroup)
//   .use(Uploader)
//   .use(Progress)
//   .use(Swiper)
//   .use(SwiperItem)
//   .use(InfiniteLoading)
//   .use(Empty)

export default App
