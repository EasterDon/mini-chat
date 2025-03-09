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

io.on("connection", (socket) => {
  socket.on("hello", (msg) => {
    console.log(`用户${socket.id}发送信息：${msg}`);
  });
  socket.on("disconnect", () => {
    console.log(`用户${socket.id}断开`);
  });

  socket.on("chat-message", (msg, akt) => {
    let status = true;
    if (status) akt({ status, timestamp: Date.now() });
    else akt({ status });
  });
  socket.on("upload-file", () => {
    console.log("文件上传");
  });
});

export { app, server };
