import { Request, Response } from "express";
import { user_sign_up } from "@/apps/mini-chat/services/auth/sign_up.service.js";

const handleError = (err: unknown, res: Response) => {
  if (err instanceof Error) {
    if (err.message.includes("user_unique")) {
      res.status(401).json({ message: "该账号已被注册" });
      return;
    }
    res.status(400).json({ message: err.message });
    return;
  }
  res.status(500).json({ message: "服务器错误" });
  return;
};

/**
 * 接受用户注册数据
 */
export const sign_up = async (req: Request, res: Response) => {
  try {
    const sign_up_value: SignUpUserValue = req.body;
    const query_res = await user_sign_up(sign_up_value);
    res.status(201).json({ message: query_res.message });
  } catch (err) {
    handleError(err, res);
  }
};
