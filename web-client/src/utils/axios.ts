import axios from 'axios';
export const server = axios.create({
  url: 'http://127.0.0.1:3000/',
  timeout: 3000,
});

export const login = axios.create({
  url: 'http://127.0.0.1:3000/login',
  timeout: 5000,
});
