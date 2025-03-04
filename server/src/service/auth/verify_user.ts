import { Request, Response, NextFunction } from "express";
import { RowDataPacket } from "mysql2/typings/mysql/index.js";
import jwt from "jsonwebtoken";
import { pool } from "@/utils/db/index.js";
import { no_need_jwt } from "../../middleware/no_need_middleware.js";

export const verify_user_sign_in_value = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, username } = req.body;

    // 检查请求体中是否包含必要的字段
    if (!id || !username) {
      return res.status(400).json({ message: "缺少必要用户信息" });
    }

    const [query_res] = await pool.query<RowDataPacket[]>(
      "select * from user where id=? and username=?",
      [id, username]
    );
    // 待补充
    if (query_res.length !== 1) {
      return res.status(403).json({ message: "用户身份信息有误" });
    }
    return next();
  } catch (err) {
    return res.status(500).json({ message: "服务器内部错误，请联系开发者" });
  }
};

/**
 * 检验jwt，跳过/auth/sign-in
 */
export const check_jwt = (req: Request, res: Response, next: NextFunction) => {
  if (no_need_jwt.some((path) => req.originalUrl.startsWith(path))) {
    return next();
  }
  const token = req.headers.authorization?.split(" ")[1];
  // 从 Authorization 头中提取 Bearer Token
  if (!token) {
    res.status(401).json({ message: "未发现token" });
  }
  if (!process.env.JWT_SECRET) {
    res.status(500).json({
      message: "服务器出现token解析错误，请联系开发者",
    });
  }
  try {
    // 验证 JWT 签名
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!);
    Reflect.defineProperty(req, "auth", {
      value: decoded,
      enumerable: true,
    });
    /* req.auth = decoded; */
    // 将解码后的信息附加到请求对象上
    next();
    // 继续执行下一个中间件或路由处理函数
  } catch (err) {
    return res.status(403).json({ message: "token错误" });
  }
};
