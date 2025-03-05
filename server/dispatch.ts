import { Application } from "express";
import { router } from "@/apps/mini-chat/index.js";

export const use_routes = (app: Application) => {
  app.use("/mini-chat", router);
};
