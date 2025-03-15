import { Application } from "express";
import { Http2Server } from "node:http2";

// http 服务器
import { router } from "@/apps/mini-chat/index.js";
// ws 服务器
import { use_ws_mini_chat } from "@/apps/mini-chat/ws/index.js";

export const use_routes = (app: Application) => {
  app.use("/mini-chat", router);
};

export const use_ws = (server: any) => {
  use_ws_mini_chat(server);
};
