import * as model from "@/src/models/ws/index.js";

export const friends_profile = async (user_id: number) => {
  const friends = await model.get_friends_profile(user_id);
  return friends;
};
