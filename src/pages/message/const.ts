export enum TabIndex {
  offcial = 0,
  comment = 1,
  fans = 2,
  like = 3
}

export const tabList = [
  {
    title: '官方',
    key: TabIndex.offcial,
    hasRead: false,
  },
  {
    title: '评论',
    key: TabIndex.comment,
    hasRead: false,
  },
  {
    title: '粉丝',
    key: TabIndex.fans,
    hasRead: true,
  },
  {
    title: '赞和收藏',
    key: TabIndex.like,
    hasRead: true,
  }
]