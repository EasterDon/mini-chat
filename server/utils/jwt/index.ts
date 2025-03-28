import { sign } from "jsonwebtoken";

export const create_token = (user_id: number, username: string) => {
  if (!process.env.jwt_secret) {
    throw new ReferenceError("请在.env文件中创建jwt_secret");
  }
  const token = sign(
    { user: { id: user_id, username } },
    process.env.jwt_secret,
    { algorithm: "HS256", expiresIn: "7d" }
  );

  return token;
};