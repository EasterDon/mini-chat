import { NextFunction, Request, Response } from "express";
import * as model from "#models/auth.js";
import { check_sign_up_value, check_sign_in_value } from "#utils/check.js";
import { create_token } from "#utils/jwt.js";

/**
 * 用户注册
 */
export const sign_up = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sign_up_value: SignUpUserValue = req.body;
    check_sign_up_value(sign_up_value);
    await model.create_new_user(sign_up_value);
    res.status(201);
  } catch (err) {
    next(err);
  }
};

/**
 * 用户登录
 */
export const sign_in = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;
    // 验证用户名密码是否符合格式
    check_sign_in_value(username, password);

    // 查询数据库是否存在该用户
    const profile = await model.get_user_by_username(username);

    // 密码验证
    if (profile.password !== password) {
      throw new Error("密码错误，请重试");
    }

    // 将用户在线状态改为在线
    await model.update_user_online_status(true, profile.id);
    profile.online = 1;

    // 将除密码外的数据返回给客户端
    delete profile.password;
    const token = create_token(profile.id, profile.username);
    res.status(200).json({
      profile,
      token,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * 用户登出
 */
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, username } = req.body;
    const state = false;
    // 更新用户在线状态
    await model.update_user_online_state(id, username, state);
    res.status(201);
  } catch (err) {
    next(err);
  }
};
