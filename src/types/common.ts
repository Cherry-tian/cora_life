// 定义 user_new 的接口
interface Author {
  uid: number;
  name: string;
  avatar_url: string
  // 如果需要其他数据，如关注量的数据之后补充
}
interface Interaction {
  favorite_count: number,
  like_count: number,
  is_favorited: boolean,
  is_liked: boolean,
  commnet_count: number,
  forward_count: number,
  is_forwarded: boolean
}
interface User_new {
  id: number;
  is_official: boolean;
  desrciprtion: string;
  create_time: number;
  title: string;
  author: Author;
  image_url_list: string[];
  interaction: Interaction
}
export interface CategoryNewList {
  item_type: string;
  user_new: User_new
}
