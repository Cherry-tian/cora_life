const config = {
  // 样式配置
  styleConfig: {
    // themeColor: "#F04142", // 头条主色
    // themeColor: "#e25856", // 近头条的主色
    themeColor: "#4382e2", // 腾讯主色
    fontColor: "#222",
    backgroundColor: "#FFFFFF",
    activeIconColor: "#fa2c19"
  },
  newestCategoryID: 1, // 「最新」这个tab的 category_id
  newsCategoryId: 1, // 新闻页面的 category_id
  followRelation: 1, // 登录用户关注了内容发布用户
  coFollowRelation: 3 // 登录用户和内容发布用户互关
}

module.exports = config
