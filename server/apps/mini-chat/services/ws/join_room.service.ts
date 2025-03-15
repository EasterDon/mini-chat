import * as model from "@/apps/mini-chat/models/ws/index.js";

export const get_user_rooms = async (user_id: number) => {
  const rooms = await model.get_user_rooms(user_id);
  return rooms;
};
