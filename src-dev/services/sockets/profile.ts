import * as model from "#models/sockets/index.js";

export const get_friens_profile = async (friend_id: number) => {};

/**
 * 根据用户ID获取该用户所有好友的基础信息
 * @param user_id 用户ID
 */
export const get_friends_profile = async (user_id: number) => {
  const friends = await model.get_friends_profile(user_id);
  return friends;
};
