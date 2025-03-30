import { NextFunction, Request, Response } from "express";
import { user_sign_up } from "@/src/services/auth/sign_up.service.js";

/**
 * 接受用户注册数据
 */
export const sign_up = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sign_up_value: SignUpUserValue = req.body;
    const query_res = await user_sign_up(sign_up_value);
    res.status(201).json({ message: query_res.message });
  } catch (err) {
    next(err);
  }
};
