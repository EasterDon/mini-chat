import { message } from 'ant-design-vue';
import { AxiosError } from 'axios';
export const error_handler = (error: unknown) => {
  if (error instanceof AxiosError) {
    axios_error_handler(error);
    return;
  }
  if (error instanceof Error) {
    message.error(error.message);
    return;
  }
};

const axios_error_handler = (error: AxiosError) => {
  if (error.code?.includes('ERR_NETWORK')) {
    message.error('网络错误');
  } else if (error.code?.includes('ERR_BAD_REQUEST')) {
    // @ts-expect-error a a
    message.error(error.response?.data.message);
  }
};
