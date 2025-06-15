import { Server } from "socket.io";

import * as events from "./events/index.js";

export const use_ws_mini_chat = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // 允许所有域名访问
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("disconnect", () => {
      console.log(`用户${socket.id}断开`);
    });

    socket.on("join-room", (msg, akt) => events.join_room(socket, msg, akt));

    socket.on("chat-message", (msg, akt) => events.chat(socket, msg, akt));

    socket.on("get-friends-profile", async (msg: { id: number }, akt) =>
      events.get_friends_profile(socket, msg, akt),
    );

    socket.on("upload-file", () => {
      console.log("文件上传");
    });
  });

  return io;
};
