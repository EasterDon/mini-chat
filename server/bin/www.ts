#!/usr/bin/env node
// 让系统动态的去查找node 来执行脚本文件
import app from "../app.js";
import debugPkg from "debug";
import http from "http";

import { ErrorRequestHandler } from "express";

const { debug } = debugPkg;

/**
 * 将端口规范化为数字、字符串或 false
 * normalize: 规范化
 */
const normalizePort = (val: any) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // 命名管道
    return val;
  }
  if (port >= 0) {
    // 端口号
    return port;
  }
  return false;
};

/**
 * 从环境中获取端口并存储在 Express 中
 * process.env 属性返回包含用户环境的对象
 */
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * 创建 HTTP 服务器
 */
const server = http.createServer(app);

/**
 * HTTP 服务器 "监听 "事件的事件监听器。
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  debug("Listening on " + bind);
};

/**
 * HTTP 服务器 "错误 "事件的事件监听器。
 */
const onError: ErrorRequestHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // 用友好信息处理特定的监听错误
  switch (error.code) {
    case "EACCES":
      console.error(bind + " 需要提升权限");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " 已被占用");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * 在所有网络接口上监听提供的端口。
 */
// server.listen(port, () => console.log("服务器已启动"));
server.listen(3000, () => console.log(`服务器已启动`));
server.on("error", onError);
server.on("listening", onListening);
