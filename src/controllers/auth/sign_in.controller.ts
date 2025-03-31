import { Request, Response, NextFunction } from "express";
import service from "@/services/auth/index.js";

export const sign_in_user = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;
    const result = await service.sign_in.sign_in_user(username, password);
    res.status(200).json({
      profile: result.profile,
      token: result.token,
    });
  } catch (err) {
    next(err);
  }
};
