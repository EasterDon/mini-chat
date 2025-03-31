import model from "@/models/auth/index.js";

export const logout_user = async (id: number, username: string) => {
  // 更新用户在线状态
  await model.logout.update_user_online_state(id, username);
};
