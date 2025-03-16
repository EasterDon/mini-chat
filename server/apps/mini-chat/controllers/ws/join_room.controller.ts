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
    akt({ status: true, rooms }); // 回调客户端
  } catch (error) {
    akt({ status: false, rooms: null });
  }
};
