import { check_sign_in_value } from "@/utils/check/index.js";
import model from "@/src/models/auth/index.js";
import { create_jwt } from "@/utils/jwt/index.js";

/**
 * 用户登录
 */
export const user_sign_in = async (username: string, password: string) => {
  // 验证用户名密码是否符合格式
  const check_res = await check_sign_in_value(username, password);
  if (!check_res.success) {
    return { status: 400, message: check_res.message };
  }

  // 查询数据库是否存在该用户
  const profile = await model.sign_in.get_user_by_username(username);
  if (!profile) {
    return { status: 404, message: "没有该用户，请先注册" };
  }

  // 密码验证
  if (profile.password !== password) {
    return { status: 400, message: "密码错误，请重试" };
  }

  // 将用户在线状态改为在线
  await model.sign_in.update_user_online_status(true, profile.id);
  profile.online = 1;

  // 将除密码外的数据返回给客户端
  delete profile.password;
  const token = await create_jwt(profile.id, profile.username, profile.level);
  return {
    status: 200,
    message: "登录成功",
    profile,
    token,
  };
};
