import { check_sign_in_value } from "@/utils/check/index.js";
import model from "@/models/auth/index.js";
import { create_token } from "@/utils/jwt/index.js";

/**
 * 用户登录
 */
export const sign_in_user = async (username: string, password: string) => {
  // 验证用户名密码是否符合格式
  check_sign_in_value(username, password);

  // 查询数据库是否存在该用户
  const profile = await model.sign_in.get_user_by_username(username);

  // 密码验证
  if (profile.password !== password) {
    throw new Error("密码错误，请重试");
  }

  // 将用户在线状态改为在线
  await model.sign_in.update_user_online_status(true, profile.id);
  profile.online = 1;

  // 将除密码外的数据返回给客户端
  delete profile.password;
  const token = create_token(profile.id, profile.username);
  return {
    profile,
    token,
  };
};
