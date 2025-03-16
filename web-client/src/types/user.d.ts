enum Gender {
  Male,
  Female,
  Secret,
}

type UserProfile = {
  id: number;
  avatar: string;
  username: string;
  nickname: string;
  level: number;
  online: boolean;
};

type ChangeProfile = {
  avatar: null | string;
  nickname: null | string;
  gender: null | Gender;
  personal_message: null | string;
  email: null | string;
  phone_number: null | string;
  address: null | string;
  birthday: null | string;
};
