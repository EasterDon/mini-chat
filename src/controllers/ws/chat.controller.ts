import { Socket } from "socket.io";
import { receive_message } from "@/services/ws/index.js";

export const chat = async (socket: Socket, msg: any, akt: any) => {
  try {
    const { status, timestamp } = await receive_message(socket, msg);
    akt({ status, timestamp });
  } catch (error) {
    akt({});
  }
};
