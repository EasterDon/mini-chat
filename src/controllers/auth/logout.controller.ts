import { NextFunction, Request, Response } from "express";
import service from "@/services/auth/index.js";

export const logout_user = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, username } = req.body;
    await service.logout.logout_user(id, username);
    res.status(201);
  } catch (err) {
    next(err);
  }
};
