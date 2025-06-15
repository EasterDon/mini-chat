import { pool } from "./db.js";
import { ResultSetHeader, type RowDataPacket } from "mysql2";

export const create_new_user = async (user_value: SignUpUserValue) => {
  const {
    avatar = "http://127.0.0.1:3001/images/avatar/index.png",
    username,
    password,
    nickname,
  } = user_value;
  const [result] = await pool.execute<ResultSetHeader>(
    "INSERT INTO user (avatar, username, password, nickname) VALUES (?, ?, ?, ?)",
    [avatar, username, password, nickname],
  );
  if (result.affectedRows !== 1) {
    throw new Error("用户注册失败：数据库未写入数据");
  }
};

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

export const update_user_online_state = async (
  id: number,
  username: string,
  state: boolean,
) => {
  const [query_res] = await pool.execute<ResultSetHeader>(
    "update user set online=? where id=? and username=?",
    [state, id, username],
  );
  if (query_res.affectedRows === 0) {
    throw new Error("登出失败");
  }
};
