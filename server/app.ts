import express, { Application } from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

import { use_routes } from "./dispatch.js";
import { error_handler } from "@/apps/mini-chat/middleware/error_handler/index.js";

import listEndpoints from "express-list-endpoints";

const app: Application = express();

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

import { createServer } from "http";
import { Server } from "socket.io";
const ws_server = createServer(app);
const io = new Server(ws_server, {});

io.on("connection", (socket) => {
  console.log(`用户${socket.id}连接`);
  console.log(`此次连接信息为：${socket.rooms}`);
  socket.on("chat message", (msg) => {
    console.log(`用户${socket.id}发送信息：${msg}`);
  });
  socket.on("disconnect", () => {
    console.log(`用户${socket.id}断开`);
  });
});
ws_server.listen(3001);

export default app;
