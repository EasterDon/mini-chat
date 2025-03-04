import { Request, Response } from "express";
import { RowDataPacket } from "mysql2/typings/mysql/index.js";
import jwt from "jsonwebtoken";
import { pool } from "@/utils/db/index.js";
import { username_regex, password_regex } from "@/utils/regex/index.js";

/**
 * 用户登录
 */
export const sign_in = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // 验证用户名密码是否符合格式
  const check_res = await check_sign_in_value(username, password);
  if (!check_res.success) {
    res.status(400).json({
      message: check_res.message,
    });
    return;
  }

  // 查询数据库是否存在该用户
  try {
    const [query_res] = await pool.query<RowDataPacket[]>(
      `select * from user where username=?`,
      [username]
    );
    if (query_res.length === 0) {
      res.status(404).json({
        message: "没有该用户，请先注册",
      });
      return;
    }

    // 密码验证
    const profile = query_res[0];
    if (profile.password !== password) {
      res.status(400).json({
        message: "密码错误，请重试",
      });
      return;
    }

    // 将用户在线状态改为在线
    await pool.query(`update user set online=true where id=?`, [profile.id]);
    profile.online = 1;

    // 将除密码外的数据返回给客户端
    delete profile.password;
    const token = await create_jwt(profile.id, profile.username, profile.level);
    res.status(200).json({
      message: "登录成功",
      profile,
      token,
    });
    return;
  } catch (err) {
    res.status(500).json({
      message: "服务器内部错误，请联系开发者",
    });
    return;
  }
};

const check_sign_in_value = async (username: string, password: string) => {
  let message = null;

  // 检查用户名
  if (!username || typeof username !== "string" || !username.trim()) {
    message = "请输入有效的用户名";
  } else if (username.includes(" ")) {
    message = "用户名中不能包含空格";
  } else if (!username_regex.test(username)) {
    message = "用户名只能包含字母、数字、下划线和连字符";
  }

  // 检查密码
  if (!password || typeof password !== "string" || !password.trim()) {
    message = "请输入有效的密码";
  } else if (password.includes(" ")) {
    message = "密码中不能包含空格";
  } else if (!password_regex.test(password)) {
    message = "密码必须包含字母、数字和特殊字符且长度不少于8";
  }

  // 如果存在任何错误，返回失败的结果
  if (message !== null) {
    return { success: false, message };
  }

  // 返回成功的验证结果
  return { success: true, message };
};

export const create_jwt = async (
  id: number,
  username: string,
  level: number
) => {
  return jwt.sign({ id, username, level }, process.env.jwt_secret!, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
};
