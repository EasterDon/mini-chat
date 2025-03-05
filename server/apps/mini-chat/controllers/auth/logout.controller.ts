import { Request, Response } from "express";
import { user_logout } from "@/apps/mini-chat/services/auth/index.js";

export const logout = async (req: Request, res: Response) => {
  try {
    const { id, username } = req.body;

    // 调用 Service 层处理登出逻辑
    const result = await user_logout(id, username);

    // 返回响应
    res.status(result.status).json({ message: result.message });
  } catch (err) {
    res.status(500).json({ message: "登出失败，请联系开发者" });
  }
};
