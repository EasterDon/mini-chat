import { Request, Response, NextFunction } from "express";
import { user_sign_in } from "@/src/services/auth/index.js";

export const sign_in = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(err);
  }
};
