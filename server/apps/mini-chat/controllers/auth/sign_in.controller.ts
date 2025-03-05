import { Request, Response } from "express";
import { user_sign_in } from "@/apps/mini-chat/services/auth/index.js";

export const sign_in = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // 调用 Service 层处理登录逻辑
    const result = await user_sign_in(username, password);
    if (!result.profile) {
      res.status(result.status).json({ message: result.message });
      return;
    }
    // 返回响应
    res.status(result.status).json({
      message: result.message,
      profile: result.profile,
      token: result.token,
    });
  } catch (err) {
    res.status(500).json({
      message: "服务器错误",
    });
  }
};
