import { RowDataPacket } from "mysql2";
import { pool } from "@/models/db/index.js";

export const get_user_by_username = async (username: string) => {
  const [query_res] = await pool.query<RowDataPacket[]>(
    `select * from user where username=?`,
    [username],
  );

  const profile = query_res[0];
  if (!profile) {
    throw new Error("没有该用户，请先注册");
  }

  return profile;
};

export const update_user_online_status = async (
  online: boolean,
  user_id: number,
) => {
  await pool.query("UPDATE user SET online = ? WHERE id = ?", [
    online,
    user_id,
  ]);
};
