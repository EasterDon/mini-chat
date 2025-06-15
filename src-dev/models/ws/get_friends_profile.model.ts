import { pool } from "#models/db.js";

export const get_friends_profile = async (user_id: number) => {
  const [friends] = await pool.query(
    `
      SELECT u.id, u.avatar, u.username, u.nickname, u.online
      FROM user u
      JOIN (
        SELECT
          CASE
            WHEN user_id_1 = ? THEN user_id_2
            WHEN user_id_2 = ? THEN user_id_1
          END AS friend_id
        FROM friendship
        WHERE user_id_1 = ? OR user_id_2 = ?
      ) AS friends
      ON u.id = friends.friend_id;
      `,
    [user_id, user_id, user_id, user_id],
  );
  return friends;
};
