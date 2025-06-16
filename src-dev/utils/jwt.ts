import { sign } from "jsonwebtoken";
import { expressjwt } from "express-jwt";

let jwt_secret = process.env.jwt_secret;

export const create_token = (user_id: number, username: string) => {
  const token = sign({ user: { id: user_id, username } }, jwt_secret!, {
    algorithm: "HS256",
    expiresIn: "7d",
  });

  return token;
};

export const check_token = expressjwt({
  secret: jwt_secret!,
  algorithms: ["HS256"],
  credentialsRequired: true,
}).unless({
  path: ["/auth/sign-in", "/auth/sign-up"],
});
