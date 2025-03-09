import axios from 'axios';
import { error_handler } from './error_handler';

export const login_request = async (username: string, password: string) => {
  try {
    const res = await axios.post('http://127.0.0.1:3000/mini-chat/auth/sign-in', {
      username: username,
      password: password,
    });
    return {
      isOk: true,
      data: res.data,
    };
  } catch (error) {
    error_handler(error);
    return {
      isOk: false,
      data: null,
    };
  }
};