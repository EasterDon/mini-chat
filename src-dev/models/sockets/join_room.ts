import { pool } from "#models/db.js";

export const get_user_rooms = async (user_id: number) => {
  const [rooms] = await pool.query(
    "SELECT * FROM friendship WHERE user_id_1 = ? OR user_id_2 = ?",
    [user_id, user_id],
  );
  return rooms;
};
