// 定义 CommentList 的接口

interface Stats {
  like_count: number,
  is_liked: boolean
}
interface User {
  is_author: boolean,
  uid: number,
  is_comment_author: boolean,
  name: string,
  avatar_url: string
}
interface ReplyList {
  content: string,
  comment_id: number,
  create_time: number,
  user: User,
  reply_to_user: {
    is_author: boolean,
    name: string,
    uid: number
  },
  stats: Stats
}
export interface CommentList {
  comment_id: number,
  content: string,
  create_time: number,
  stats: Stats,
  user: User,
  reply: {
    total_count: number,
    has_more: boolean,
    next_cursor: number,
    reply_list: ReplyList[]}
}
export interface ForwardList {
  id: number,
  content: string,
  create_time: number,
  user: User,
}
export interface LikeList {
  create_time: number,
  user: User,
}
