import express, { Application } from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { createServer } from "http";

import { use_routes, use_ws } from "./dispatch.js";
import { error_handler } from "@/apps/mini-chat/middleware/error_handler/index.js";

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
  next(err);
});

app.use(error_handler);

// http服务器
const server = createServer(app);
// ws服务器
use_ws(server);

export { app, server };
