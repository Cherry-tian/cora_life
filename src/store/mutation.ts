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
  }
}
