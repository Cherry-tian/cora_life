import { getCategoryNewList } from '@/api/index.js';
import Taro from '@tarojs/taro';

//1. 定义获取内容列表的 URL （将需要传递的查询参数进行拼接处理）函数参数的解构赋值，可以设置默认值
const getCategoryNewListUrl = ({
  category_id,
  cursor = 0,
  count = 5,
  uid = 23333
}): string => {
  return `${getCategoryNewList}?category_id=${category_id}&cursor=${cursor}&count=${count}&uid=${uid}`
}

//2. 定义日期显示模式：对今天的数据显示「xx小时前或xx分钟前」；对昨天的数据显示「昨天12:32」;再往前只显示日期「08-19」
const publishTimeStr = (createTime: number) => {
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

const jumpToUserPage = (uid) => {
  // 跳转到用户信息页；路由参数带上这个用户的uid
  Taro.navigateTo({
    url: `/pages/userInfo/index?uid=${uid}`
  })
}

export default {
  getCategoryNewListUrl,
  jumpToUserPage,
  publishTimeStr
}
