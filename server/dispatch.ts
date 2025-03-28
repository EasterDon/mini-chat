import { Application } from "express";
import { expressjwt } from "express-jwt";

// http 服务器
import { router } from "@/apps/mini-chat/index.js";
// ws 服务器
import { use_ws_mini_chat } from "@/apps/mini-chat/ws/index.js";

export const use_routes = (app: Application) => {
  // 无需jwt验证路由
  app.use(
    expressjwt({ secret: process.env.secret_jwt, algorithms: "HS256" }).unless({
      path: ["/mini-chat/sign-in", "/mini-chat/sign-up"],
    })
  );

  // 不同页面路由
  app.use("/mini-chat", router);
};

export const use_ws = (server: any) => {
  use_ws_mini_chat(server);
};
