import { pool } from "@/apps/mini-chat/models/db/index.js";
import { ResultSetHeader } from "mysql2";

export const update_user_online_status = async (
  id: number,
  username: string
) => {
  const [query_res] = await pool.execute<ResultSetHeader>(
    "update user set online=false where id=? and username=?",
    [id, username]
  );
  return query_res.affectedRows;
};
