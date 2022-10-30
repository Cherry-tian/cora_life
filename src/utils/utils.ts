import { getCategoryNewList, getSelfUID } from '@/api/index.js';
import Taro from '@tarojs/taro';

//1. 定义获取内容列表的 URL （将需要传递的查询参数进行拼接处理）函数参数的解构赋值，可以设置默认值
export const getCategoryNewListUrl = ({
  category_id,
  cursor = 0,
  count = 5,
  uid = 23333
}): string => {
  return `${getCategoryNewList}?category_id=${category_id}&cursor=${cursor}&count=${count}&uid=${uid}`
}

//2. 定义日期显示模式：对今天的数据显示「xx小时前或xx分钟前」；对昨天的数据显示「昨天12:32」;再往前只显示日期「08-19」
export const publishTimeStr = (createTime: number) => {
  if (isToday(createTime)) {
    const createTimeHour = new Date(createTime).getHours()
    const currHour = new Date().getHours()
    if (createTimeHour !== currHour) {
      return `${currHour - createTimeHour} 小时前`
    } else {
      const createTimeMin = new Date(createTime).getMinutes()
      const currMin = new Date().getMinutes()
      return `${currMin - createTimeMin} 分钟前`
    }
  } else if (isYesterday(createTime)) {
    return `昨天${new Date(createTime).getHours()}:${new Date(createTime).getMinutes()}`
  } else {
    const createDate = new Date(createTime)
    return `${createDate.getMonth() + 1}-${createDate.getDate()}`
  }
}
// 前提：判断今天还是昨天的函数
const isToday = (createTime: number) => {
  if (new Date().toDateString() === new Date(createTime).toDateString()) return true
  return false
}
const isYesterday = (createTime) => {
  const yesterday = createTime - 24 * 60 * 60 * 1000
  if (new Date(yesterday).getFullYear() === new Date().getFullYear()
    && new Date(yesterday).getMonth() === new Date().getMonth()
    && new Date(yesterday).getDate() === new Date().getDate()) {
    return true
  }
  return false
}

export const jumpToUserPage = (uid) => {
  // 跳转到用户信息页；路由参数带上这个用户的uid
  Taro.navigateTo({
    url: `/pages/userInfo/index?uid=${uid}`
  })
}

// 跳转到用详情页
export const jumpToDetailPage = (store, newsInfo) => {
  // 1. 用 Taro.navigateTo 实现路由跳转
  Taro.navigateTo({
    url: '/pages/detail/index'
  })
  // 2. 改变 store 中 newsInfo 的状态
  store.commit('changeNewsInfo', newsInfo)
}

// 展示微信小程序分享图标 https://taro-docs.jd.com/docs/apis/share/showShareMenu
export const showShareMenu = () => {
  Taro.showShareMenu({
    withShareTicket: true,
    showShareItems: ['shareAppMessage', 'shareTimeline']
  })
}

// 获取用户自己的uid
export const getUID = async () => {
  const uid =  await Taro.request({
    url: getSelfUID,
    header: { // TODO remove jwt
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsIm9wZW5JZCI6IjEiLCJpYXQiOjE2NjcxMTI4NzAsImV4cCI6MTY2NzU0NDg3MH0.XDjPRUCMUFxoeqCU6kLLmYnbaNLMlrJpJq0Pfo62QuM'
    }
  }).then((res) => {
    return res.data.uid
  }).catch(() => {
    Taro.showToast({
      title: '载入远程数据出错',
      icon: 'error'
    })
  })
  return uid
}

// 将 Taro.getStorage() 包装为 Promise 式
export const getLocalStorage = (key: string): Promise<any> => {
  return new Promise((resolve, reject)=> {
    Taro.getStorage({
      key: key,
      success: (res) => {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    });
  });
}

export default {
  getCategoryNewListUrl,
  jumpToUserPage,
  jumpToDetailPage,
  showShareMenu,
  publishTimeStr,
  getUID,
  getLocalStorage
}
