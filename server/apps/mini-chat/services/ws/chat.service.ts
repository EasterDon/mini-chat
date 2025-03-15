import { Socket } from "socket.io";

export const receive_message = async (socket: Socket, msg: any) => {
  const timestamp = Date.now();
  let status = true;

  // 发送消息给目标房间
  socket.to(`friend-${msg.room}`).emit("get-message", { ...msg, timestamp });

  return { status, timestamp };
};
