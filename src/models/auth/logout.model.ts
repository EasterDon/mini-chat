import { pool } from "@/models/db/index.js";
import { ResultSetHeader } from "mysql2";

export const update_user_online_state = async (
  id: number,
  username: string,
) => {
  const [query_res] = await pool.execute<ResultSetHeader>(
    "update user set online=false where id=? and username=?",
    [id, username],
  );
  if (query_res.affectedRows === 0) {
    throw new Error("登出失败");
  }
};
