import express, { Application } from "express";
import path from "path";
import morgan from "morgan";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { createServer } from "http";

import { expressjwt } from "express-jwt";

import { router } from "#routes/index.js";
import { error_handler } from "#utils/error_handler.js";
import { use_ws_mini_chat } from "#ws/index.js";

const app: Application = express();

/*
  import.meta.url：提供当前模块文件的 URL
  fileURLToPath(url)：将 URL 转换为本地文件系统路径
  dirname(path)：获取给定路径的目录名
*/
const current_dirname = dirname(fileURLToPath(import.meta.url));

const jwt_secret = process.env.jwt_secret;
if (!jwt_secret) {
  console.error("请确保.env文件中含有 jwt_secret 字段");
  process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(express.static(path.join(current_dirname, "public")));

app.use(
  expressjwt({ secret: jwt_secret, algorithms: ["HS256"] }).unless({
    path: ["/mini-chat/auth/sign-in", "/mini-chat/auth/sign-up"],
  }),
);

app.use("/mini-chat", router);

app.use((_req, _res, next) => {
  const err = new Error("Not Found");
  console.log(err);
  next(err);
});

// 错误处理程序
app.use(error_handler);

// http服务器
const server = createServer(app);
// ws服务器
use_ws_mini_chat(server);

export { app, server };
