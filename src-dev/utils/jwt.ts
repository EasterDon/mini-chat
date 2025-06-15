import jwt from "jsonwebtoken";

let jwt_secret = process.env.jwt_secret;

export const create_token = (user_id: number, username: string) => {
  if (!jwt_secret) {
    throw new ReferenceError("请在.env文件中创建jwt_secret");
  }

  // const { sign } = jwt;

  const token = jwt.sign({ user: { id: user_id, username } }, jwt_secret, {
    algorithm: "HS256",
    expiresIn: "7d",
  });

  return token;
};
