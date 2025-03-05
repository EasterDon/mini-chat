import jwt from "jsonwebtoken";

export const create_jwt = async (
  id: number,
  username: string,
  level: number
) => {
  return jwt.sign({ id, username, level }, process.env.jwt_secret!, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
};
