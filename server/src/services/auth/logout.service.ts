import model from "@/src/models/auth/index.js";

export const user_logout = async (id: number, username: string) => {
  try {
    // 更新用户在线状态
    const affected_rows = await model.logout.update_user_online_status(
      id,
      username
    );

    if (affected_rows === 0) {
      return { status: 400, message: "登出失败，请联系开发者" };
    }

    return { status: 200, message: "登出成功" };
  } catch (err) {
    throw new Error("登出失败，请联系开发者");
  }
};
