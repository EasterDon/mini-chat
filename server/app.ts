import express, { Application } from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { createServer } from "http";

import { expressjwt } from "express-jwt";

// @ts-ignore
import { router } from "src/index.js";
import { error_handler } from "@/src/middleware/error_handler/index.js";
import { use_ws_mini_chat } from "./src/ws/index.js";

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

app.use(
  expressjwt({ secret: process.env.secret_jwt, algorithms: "HS256" }).unless({
    path: ["/mini-chat/sign-in", "/mini-chat/sign-up"],
  })
);

app.use("/mini-chat", router);

app.use((_req, _res, next) => {
  const err = new Error("Not Found");
  next(err);
});

app.use(error_handler);

// http服务器
const server = createServer(app);
// ws服务器
use_ws_mini_chat(server);

export { app, server };
