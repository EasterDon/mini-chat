import { RowDataPacket } from "mysql2";

import { pool } from "@/apps/mini-chat/models/db/index.js";

export const get_user_by_username = async (username: string) => {
  const [query_res] = await pool.query<RowDataPacket[]>(
    `select * from user where username=?`,
    [username]
  );

  const result = query_res[0] ? query_res[0] : null;

  return result;
};

export const update_user_online_status = async (
  online: boolean,
  user_id: number
) => {
  await pool.query("UPDATE user SET online = ? WHERE id = ?", [
    online,
    user_id,
  ]);
};
