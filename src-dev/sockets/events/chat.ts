import { Socket } from "socket.io";
import { friend_message, group_message } from "#services/sockets/index.js";

export const chat = async (socket: Socket, msg: any, akt: any) => {
  try {
    let message_handler = null;

    switch (msg.type) {
      case "friend":
        message_handler = friend_message;
        break;
      case "group":
        message_handler = group_message;
        break;
      default:
        throw new Error("消息类型错误！");
    }

    const { status, timestamp } = await message_handler(socket, msg);
    akt({ status, timestamp });
  } catch (error) {
    akt({});
  }
};
