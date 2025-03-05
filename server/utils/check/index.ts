import * as regex from "@/utils/regex/index.js";
import { ERROR_MESSAGES } from "./error_message.js";
export const check_sign_up_value = (
  sign_up_value: SignUpUserValue
): ValidationResult => {
  if (!regex.username_regex.test(sign_up_value.username)) {
    return {
      success: false,
      message: ERROR_MESSAGES.INVALID_USERNAME,
    };
  }
  if (!regex.password_regex.test(sign_up_value.password)) {
    return {
      success: false,
      message: ERROR_MESSAGES.INVALID_PASSWORD,
    };
  }
  if (!regex.nickname_regex.test(sign_up_value.nickname)) {
    return {
      success: false,
      message: ERROR_MESSAGES.INVALID_NICKNAME,
    };
  }
  if (
    sign_up_value.avatar &&
    !regex.image_url_regex.test(sign_up_value.avatar)
  ) {
    return {
      success: false,
      message: ERROR_MESSAGES.INVALID_AVATAR_URL,
    };
  }
  return {
    success: true,
    message: "",
  };
};

export const check_sign_in_value = async (
  username: string,
  password: string
) => {
  let message = null;

  // 检查用户名
  if (!username || typeof username !== "string" || !username.trim()) {
    message = "请输入有效的用户名";
  } else if (username.includes(" ")) {
    message = "用户名中不能包含空格";
  } else if (!regex.username_regex.test(username)) {
    message = "用户名只能包含字母、数字、下划线和连字符";
  }

  // 检查密码
  if (!password || typeof password !== "string" || !password.trim()) {
    message = "请输入有效的密码";
  } else if (password.includes(" ")) {
    message = "密码中不能包含空格";
  } else if (!regex.password_regex.test(password)) {
    message = "密码必须包含字母、数字和特殊字符且长度不少于8";
  }

  // 如果存在任何错误，返回失败的结果
  if (message !== null) {
    return { success: false, message };
  }

  // 返回成功的验证结果
  return { success: true, message };
};
