import { pool } from "@/apps/mini-chat/models/db/index.js";
import { ResultSetHeader } from "mysql2";

export const create_new_user = async (user_value: SignUpUserValue) => {
  const {
    avatar = "http://127.0.0.1:3001/images/avatar/index.png",
    username,
    password,
    nickname,
  } = user_value;
  const [result] = await pool.execute<ResultSetHeader>(
    "INSERT INTO user (avatar, username, password, nickname) VALUES (?, ?, ?, ?)",
    [avatar, username, password, nickname]
  );
  return result;
};
