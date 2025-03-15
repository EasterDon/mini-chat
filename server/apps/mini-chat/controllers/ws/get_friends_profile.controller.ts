import { Socket } from "socket.io";

import { friends_profile } from "@/apps/mini-chat/services/ws/index.js";

export const get_friends_profile = async (socket: Socket, msg: any, akt: any) => {
  try {
    const friends = await friends_profile(msg.id);
    akt(friends); // 回调客户端
  } catch (error) {
    akt([]);
  }
};
