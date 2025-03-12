export enum Gender {
  Male,
  Female,
  Secret,
}

export type UserProfile = {
  id: null | number;
  avatar: null | string;
  username: null | string;
  nickname: null | string;
  level: null | number;
};

export type ChangeProfile = {
  avatar: null | string;
  nickname: null | string;
  gender: null | Gender;
  personal_message: null | string;
  email: null | string;
  phone_number: null | string;
  address: null | string;
  birthday: null | string;
};