import express, { Application } from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { createServer } from "http";
import { Server } from "socket.io";

import { use_routes } from "./dispatch.js";
import { error_handler } from "@/apps/mini-chat/middleware/error_handler/index.js";

import listEndpoints from "express-list-endpoints";

const app: Application = express();

// http服务器
const server = createServer(app);
// ws服务器
const io = new Server(server, {
  cors: {
    origin: "*", // 允许所有域名访问
    methods: ["GET", "POST"],
  },
});

/*
  import.meta.url：提供当前模块文件的 URL
  fileURLToPath(url)：将 URL 转换为本地文件系统路径
  dirname(path)：获取给定路径的目录名
*/
const current_dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

app.use(express.static(path.join(current_dirname, "public")));

use_routes(app);

app.use((_req, _res, next) => {
  const err = new Error("Not Found");
  //@ts-ignore
  err.status = 404;
  next(err);
});

console.log("当前项目所有路由：\n");
console.table(listEndpoints(app));

app.use(error_handler);
import { pool } from "@/apps/mini-chat/models/db/index.js";
io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log(`用户${socket.id}断开`);
  });

  socket.on("join-room", async (msg: { id: number }, akt) => {
    const [rooms] = await pool.query(
      "select * from friendship where user_id_1=? or user_id_2=?",
      [msg.id, msg.id]
    );
    (rooms as Array<{ id: number }>).forEach((item) => {
      socket.join(`friend-${item.id}`);
    });
    akt(rooms);
  });

  socket.on("chat-message", (msg, akt) => {
    let status = true;
    let timestamp = Date.now();
    socket.to(`friend-${msg.room}`).emit("get-message", { ...msg, timestamp });
    if (status) akt({ status, timestamp });
    else akt({ status });
  });

  socket.on("get-friends-profile", async (msg: { id: number }, akt) => {
    // 查询所有好友信息
    const [friends_value] = await pool.query(
      `
        SELECT u.id,u.avatar,u.username,u.nickname,u.online
        FROM user u
        JOIN (
          SELECT 
            CASE 
              WHEN user_id_1 = ? THEN user_id_2 
              WHEN user_id_2 = ? THEN user_id_1 
            END AS friend_id
          FROM friendship
          WHERE user_id_1 = ? OR user_id_2 = ?
        ) AS friends
        ON u.id = friends.friend_id;
        `,
      [msg.id, msg.id, msg.id, msg.id]
    );
    akt(friends_value);
  });

  socket.on("upload-file", () => {
    console.log("文件上传");
  });
});
export { app, server };
