// 域名
const domainMock = "yapi.smart-xwork.cn/mock/168776"
const domainDev = "127.0.0.1:7001"
const domainProd = "TODO"

// 获取 api path 前缀
const getPathPrefix = () => {
    // TODO 区分环境
    return "http://" + domainMock
    // return "http://" + domainDev
}

// api路径
const getCategoryListPath = "/api/feed/category_list" // 获取分类列表
const getCategoryNewListPath = "/api/feed/category_new_list" // 获取分类下新闻列表
const favoritePath = "/api/feed/favorite" // 收藏
const cancelFavoritePath = "/api/feed/cancel_favorite" // 取消收藏
const likePath = "/api/feed/like" // 点赞
const cancelLikePath = "/api/feed/cancel_like" // 取消点赞
const commentListPath = "/api/comment/list" // 获取评论列表
const interactionDetailPath = "/api/interaction/detail" // 获取新闻互通详情
const publishCommentPath = "/api/comment/publish" // 发布评论
const unFollowUserPath = "/api/relation/unfollow" // 取消关注用户
const followUserPath = "/api/relation/follow" // 关注用户
const commentLikePath = "/api/comment/like" // 点赞评论
const cancelCommentLikePath = "/api/comment/cancel_like" // 取消点赞评论
const deleteCommentPath = "/api/comment/delete" // 删除评论
const getPublishCategoryListPath = "/api/feed/publish_category_list" // 获取发布页分类列表
const publishPath = "/api/feed/publish" // 内容/新闻发布
const loginPath = "/api/user/login" // 用户登录
const getUserInfoPath = "/api/user/info" // 获取用户信息
const getMegNewsPath = "/api/feed/mget_news" // 批量获取新闻
const editUserInfoPath = "/api/user/edit_ifno" // 修改用户资料
const getOfficialMsgListPath = "/api/message/official_list" // 获取消息页官方信息列表
const getCommentMsgListPath = "/api/message/comment_list" // 获取消息页评论信息列表
const getInteractionMsgListPath = "/api/message/interaction_list" // 获取消息页赞和收藏互动列表
const getUserFansListPath = "/api/user/fans_list" // 获取用户粉丝列表，包含粉丝和互关
const getFollowListPath = "/api/user/follow_list" // 获取用户关注列表，包含关注和互关
const getSelfUIDPath = "/api/user/self_uid" // 获取用户自己的uid

const getCategoryList = getPathPrefix() + getCategoryListPath // 获取分类列表
const getCategoryNewList = getPathPrefix() + getCategoryNewListPath // 获取分类下新闻列表
const favorite = getPathPrefix() + favoritePath // 收藏
const cancelFavorite = getPathPrefix() + cancelFavoritePath // 取消收藏
const like = getPathPrefix() + likePath // 点赞
const cancelLike = getPathPrefix() + cancelLikePath // 取消点赞
const commentList = getPathPrefix() + commentListPath // 获取评论列表
const interactionDetail = getPathPrefix() + interactionDetailPath // 获取新闻互通详情
const publishComment = getPathPrefix() + publishCommentPath // 发布评论
const unFollowUser = getPathPrefix() + unFollowUserPath // 取消关注用户
const followUser = getPathPrefix() + followUserPath // 关注用户
const commentLike = getPathPrefix() + commentLikePath // 点赞评论
const cancelCommentLike = getPathPrefix() + cancelCommentLikePath // 取消点赞评论
const deleteComment = getPathPrefix() + deleteCommentPath // 删除评论
const getPublishCategoryList = getPathPrefix() + getPublishCategoryListPath // 获取发布页分类列表
const publish = getPathPrefix() + publishPath // 内容/新闻发布
const login = getPathPrefix() + loginPath // 用户登录
const getUserInfo = getPathPrefix() + getUserInfoPath // 获取用户信息
const getMegNews = getPathPrefix() + getMegNewsPath // 批量获取新闻
const editUserInfo = getPathPrefix() + editUserInfoPath // 修改用户资料
const getSelfUID = getPathPrefix() + getSelfUIDPath // 获取用户自己的uid

const getOfficialMsgList = getPathPrefix() + getOfficialMsgListPath // 获取消息页官方信息列表
const getCommentMsgList = getPathPrefix() + getCommentMsgListPath // 获取消息页评论信息列表
const getInteractionMsgList = getPathPrefix() + getInteractionMsgListPath // 获取消息页赞和收藏互动列表
const getUserFansList = getPathPrefix() + getUserFansListPath // 获取用户粉丝列表，包含粉丝和互关
const getFollowList = getPathPrefix() + getFollowListPath // 获取用户关注列表，包含关注和互关

module.exports = {
    getCategoryList,
    getCategoryNewList,
    favorite,
    cancelFavorite,
    like,
    cancelLike,
    commentList,
    interactionDetail,
    publishComment,
    unFollowUser,
    followUser,
    commentLike,
    cancelCommentLike,
    deleteComment,
    getPublishCategoryList,
    publish,
    login,
    getUserInfo,
    getMegNews,
    editUserInfo,
    getOfficialMsgList,
    getCommentMsgList,
    getInteractionMsgList,
    getUserFansList,
    getFollowList,
    getSelfUID
}
