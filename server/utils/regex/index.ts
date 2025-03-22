export const username_regex = /^[a-zA-Z0-9_-]{8,20}$/;

export const password_regex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

export const nickname_regex = /^[\p{L}\p{N}]{1,16}$/u;

export const image_url_regex =
  /^http:\/\/127\.0\.0\.1:3000\/images\/avatar\/[^\/\s]+\.(jpg|jpeg|png|gif|bmp|webp)$/i;
