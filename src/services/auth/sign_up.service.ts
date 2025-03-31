import model from "@/models/auth/index.js";
import { check_sign_up_value } from "@/utils/check/index.js";

export const sign_up_user = async (user_value: SignUpUserValue) => {
  check_sign_up_value(user_value);
  await model.sign_up.create_new_user(user_value);
};
