export default {
  changeHomePageLoading(state: any, loading: boolean): void {
    state.homePageLoading = loading
  },
  changeNewsInfo(state: any, newsInfo: any): void {
    state.newsInfo = newsInfo
  },
  changeNewsId(state: any, id: any): void {
    state.newsId = id
  },
  changeUserInfo(state: any, userInfo: any): void {
    state.userInfo = userInfo
  },
  changeHasNewOfficialMsg(state: any, hasNewMsg: any): void {
    state.hasNewOfficialMsg = hasNewMsg
  },
  changeHasNewCommentMsg(state: any, hasNewMsg: any): void {
    state.hasNewCommentMsg = hasNewMsg
  },
  changeHasNewFansMsg(state: any, hasNewMsg: any): void {
    state.hasNewFansMsg = hasNewMsg
  },
  changeHasNewInteractionMsg(state: any, hasNewMsg: any): void {
    state.hasNewInteractionMsg = hasNewMsg
  },
}
