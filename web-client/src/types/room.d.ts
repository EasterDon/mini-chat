/**
 * 好友聊天室
 */
type FriendRoom = {
  id: number;
  user_id_1: number;
  user_id_2: number;
  /**
   * 好友关系状态
   * 0 - 请求中，1 - 已接受，2 - 已拒绝
   */
  status: number;
  created_time: string;
};
