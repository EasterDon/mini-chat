import type { SendMessage } from '@/types';
import { io, Socket } from 'socket.io-client';

export const socket: Socket = io('http://localhost:3000');

// 封装 emit 为 Promise
export const chat = (
  message: SendMessage,
): Promise<{ status: boolean; timestamp?: number }> => {
  return new Promise((resolve, reject) => {
    socket.emit(
      'chat-message',
      message,
      (ack: { status: boolean; timestamp?: number }) => {
        if (ack.status) {
          resolve(ack); // 成功时 resolve
        } else {
          reject(ack); // 失败时 reject
        }
      },
    );
  });
};

