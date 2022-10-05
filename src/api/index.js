// 域名
const domainMock = "yapi.smart-xwork.cn/mock/168776"
const domainDev = "TODO"
const domainProd = "TODO"

// 获取 api path 前缀
const getPathPrefix = () => {
  // TODO 区分环境
  return "http://" + domainMock
}

// api路径
const getCategoryListPath = "/api/feed/category_list" // 获取分类列表
const getCategoryNewListPath = "/api/feed/category_new_list" // 获取分类下新闻列表
const favoritePath = "/api/feed/favorite" // 收藏
const cancelFavoritePath = "/api/feed/cancel_favorite" // 取消收藏
const likePath = "/api/feed/like" // 点赞
const cancelLikePath = "/api/feed/cancel_like" // 取消点赞


const getCategoryList = getPathPrefix() + getCategoryListPath // 获取分类列表
const getCategoryNewList = getPathPrefix() + getCategoryNewListPath // 获取分类下新闻列表
const favorite = getPathPrefix() + favoritePath // 收藏
const cancelFavorite = getPathPrefix() + cancelFavoritePath // 取消收藏
const like = getPathPrefix() + likePath // 点赞
const cancelLike = getPathPrefix() + cancelLikePath // 取消点赞

module.exports = {
  getCategoryList,
  getCategoryNewList,
  favorite,
  cancelFavorite,
  like,
  cancelLike
}
