import { NextFunction, Request, Response } from "express";
import service from "@/services/auth/index.js";

/**
 * 接受用户注册数据
 */
export const sign_up_user = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sign_up_value: SignUpUserValue = req.body;
    await service.sign_up.sign_up_user(sign_up_value);
    res.status(201);
  } catch (err) {
    next(err);
  }
};
