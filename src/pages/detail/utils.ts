import Taro from '@tarojs/taro';
import { getNewsIdFromRouter } from '@/utils/utils'

// 刷新详情页（只能在详情页调该方法）
export const reFreshDetailPage = () => {
  const newsId = getNewsIdFromRouter()
  Taro.redirectTo({
    url: `/pages/detail/index?news_id=${newsId}`
  })
}