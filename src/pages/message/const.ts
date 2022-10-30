import { MessageType } from '@/types/common';

export const tabList = [
  {
    title: '官方',
    key: MessageType.Official,
    hasNewMsg: false,
  },
  {
    title: '评论',
    key: MessageType.Comment,
    hasNewMsg: false,
  },
  {
    title: '粉丝',
    key: MessageType.Fans,
    hasNewMsg: true,
  },
  {
    title: '赞和收藏',
    key: MessageType.Interaction,
    hasNewMsg: true,
  }
]