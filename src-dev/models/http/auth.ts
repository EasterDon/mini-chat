import { pool } from "#models/db.js";
import { ResultSetHeader, type RowDataPacket } from "mysql2";
import { hash } from "bcryptjs";

const sign_up_check = `SELECT username FROM user WHERE username = ?`;

/**
 * 创建新用户
 * @param user_value 用户信息
 */
export const create_new_user = async (user_value: SignUpUserValue) => {
  const {
    avatar = "/images/avatar/index.png",
    username,
    password,
    nickname,
  } = user_value;

  // 查询用户名是否被注册
  const [check_result] = await pool.query<RowDataPacket[]>(sign_up_check, [
    username,
  ]);
  if (check_result.length > 0) throw new Error("该用户名已被注册");

  // 加盐操作
  const saltRounds = 12;
  const hashedPassword = await hash(password, saltRounds);
  const [result] = await pool.execute<ResultSetHeader>(
    "INSERT INTO user (avatar, username, password,nickname) VALUES (?, ?, ?, ?)",
    [avatar, username, hashedPassword, nickname],
  );
  if (result.affectedRows !== 1)
    throw new Error("用户注册失败：数据库未写入数据");
};

// 查询用户
export const get_profile_by_username = async (username: string) => {
  const [query_res] = await pool.query<RowDataPacket[]>(
    "select * from user where username=?",
    [username],
  );

  if (query_res.length === 0) throw new Error("没有该用户，请先注册");

  return query_res[0];
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
