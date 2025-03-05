import model from "@/apps/mini-chat/models/auth/index.js";
import { check_sign_up_value } from "@/utils/check/index.js";

export const user_sign_up = async (user_value: SignUpUserValue) => {
  // 验证用户数据
  const check_res = check_sign_up_value(user_value);
  if (!check_res.success) {
    throw new Error(check_res.message);
  }

  // 创建用户
  const result = await model.sign_up.create_new_user(user_value);
  if (result.affectedRows === 0) {
    throw new Error("注册用户失败");
  }

  return { message: "注册成功" };
};
