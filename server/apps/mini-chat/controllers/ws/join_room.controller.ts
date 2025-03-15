import { Socket } from "socket.io";
import { get_user_rooms } from "@/apps/mini-chat/services/ws/index.js";

export const join_room = async (
  socket: Socket,
  msg: { id: number },
  akt: any
) => {
  try {
    const rooms = await get_user_rooms(msg.id);
    (rooms as Array<{ id: number }>).forEach((item) => {
      socket.join(`friend-${item.id}`);
    });
    akt(rooms); // 回调客户端
  } catch (error) {
    console.error("加入房间失败:", error);
    akt([]);
  }
};
