import { Request, Response } from "express";

import * as regex from "@/utils/regex/index.js";
import { pool } from "@/utils/db/index.js";
import { ResultSetHeader } from "mysql2";

const sign_up_sql =
  "insert into user (avatar,username,password,nickname) values (?,?,?,?)";

/**
 * 接受用户注册数据
 */
export const sign_up = async (req: Request, res: Response) => {
  try {
    const sign_up_value: UserValue = req.body;
    if (!sign_up_value.avatar) {
      sign_up_value.avatar = "http://127.0.0.1:3001/images/avatar/index.png";
    }
    const check_res = await check_sign_up_value(sign_up_value);
    if (!check_res.success) { throw new Error(`${check_res.message}`) }
    const [query_res] = await pool.execute<ResultSetHeader>(sign_up_sql, [
      sign_up_value.avatar,
      sign_up_value.username,
      sign_up_value.password,
      sign_up_value.nickname,
    ]);
    if (query_res.affectedRows === 0) {
      res
        .status(500)
        .json({ message: "注册用户失败，请联系开发者" });
    }
    res.status(201).json({ message: "注册成功" });
  } catch (err) {
    if (err instanceof Error) {
      if (err.message) {
        if (err.message.includes("user_unique")) {
          res.status(401)
            .json({ message: "该账号已被注册" });
        }
        res
          .status(401)
          .json({ message: err.message });
      }
      res
        .status(500)
        .json({ message: "服务器出现问题，请联系开发者" });


    }
  };
}

const check_sign_up_value = async (sign_up_value: UserValue) => {
  if (!regex.username_regex.test(sign_up_value.username)) {
    return {
      success: false,
      message: "用户账号不符合格式",
    };
  }
  if (!regex.password_regex.test(sign_up_value.password)) {
    return {
      success: false,
      message: "密码不符合格式",
    };
  }
  if (!regex.nickname_regex.test(sign_up_value.nickname)) {
    return {
      success: false,
      message: "用户昵称不合法"
    }
  }
  if (!regex.image_url_regex.test(sign_up_value.avatar!)) {
    return {
      success: false,
      message: "用户头像地址不合法"
    }
  }
  return {
    success: true,
    message: ""
  }
};

interface UserValue {
  avatar: string | null;
  username: string;
  password: string;
  nickname: string;
}