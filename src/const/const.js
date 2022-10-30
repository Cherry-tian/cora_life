
  // 样式配置
export const styleConfig = {
  // themeColor: "#F04142", // 头条主色
  // themeColor: "#e25856", // 近头条的主色
  themeColor: "#4382e2", // 腾讯主色
  fontColor: "#222",
  backgroundColor: "#FFFFFF",
  activeIconColor: "#fa2c19",
  wechatColor: 'rgb(0, 198, 70)', // 微信绿
}

export const appConfig = {
  name: 'yiLife' // 小程序名称
}

// 将需要与后端协商明确的分类 id 维护在 const 中以便后期查询更改
export const newestCategoryID =  1 // 「最新」这个tab的 category_id
export const newsCategoryId = 2 // 新闻页面的 category_id

export const followRelation =  1 // 登录用户关注了内容发布用户
export const coFollowRelation =  3 // 登录用户和内容发布用户互关
export const  officialCategroyId = 2 // 发布页分类中 官方新闻 的id

// 消息页设置：
export const fansRelation = 2 // 用户是当前登录用户的粉丝
export const  messageLike = 1 // 用户点赞了当前登录用户发布的内容
export const  messageFavorite = 2 //用户收藏了当前登录用户发布的内容

export const localStorageKey = {
  jwt: 'jwt',
  officialMsg: 'official',
  commentMsg: 'comment', 
  fansMsg: 'fans',
  interactionMsg: 'interaction',
}
