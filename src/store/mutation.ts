export default {
  changeHomePageLoading(state: any, loading: boolean): void {
    state.homePageLoading = loading
  },
  changeNewsInfo(state: any, newsInfo: any): void {
    state.newsInfo = newsInfo
  },
  changeUserInfo(state: any, userInfo: any): void {
    state.userInfo = userInfo
  }
}
