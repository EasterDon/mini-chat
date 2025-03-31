import { NextFunction, Request, Response } from "express";
import { user_logout } from "@/src/services/auth/index.js";

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, username } = req.body;

    // 调用 Service 层处理登出逻辑
    const result = await user_logout(id, username);

    // 返回响应
    res.status(result.status).json({ message: result.message });
  } catch (err) {
    next(err);
  }
};
