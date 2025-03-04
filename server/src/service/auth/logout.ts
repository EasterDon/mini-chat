import { Request, Response } from "express";
import { pool } from "@/utils/db/index.js";
import { ResultSetHeader } from "mysql2";

export const logout = async (req: Request, res: Response) => {
  const { id, username } = req.body;
  try {
    const [query_res] = await pool.execute<ResultSetHeader>(
      "update user set online=false where id=? and username=?",
      [id, username]
    );
    if (query_res.affectedRows === 0) {
      throw new Error("登出失败，请联系开发者");
    }
    res.status(200).json({ message: "登出成功" });
  } catch (err) {
    res.status(500).json({ message: "登出失败，请联系开发者" });
  }

};
