import { io, Socket } from 'socket.io-client';
import { useMessageStore } from '@/stores/message';

const message_store = useMessageStore();

export const socket: Socket = io('http://localhost:3000');

export const chat = (
  message: SendMessage,
): Promise<{ status: boolean; timestamp?: number }> => {
  return new Promise((resolve, reject) => {
    socket.emit(
      'chat-message',
      message,
      (akt: { status: boolean; timestamp?: number }) => {
        if (akt.status) {
          resolve(akt); // 成功时 resolve
        } else {
          reject(akt); // 失败时 reject
        }
      },
    );
  });
};

/**
 * 通知服务器
 * 服务器通过用户id加入所有 好友-自己，群友-自己 构成的聊天室
 *
 * @param id 用户id
 * @returns 用户已加入的服务器列表
 */
export const join_rooms = (id: number): Promise<FriendRoom[]> => {
  return new Promise((resolve, reject) => {
    socket.emit(
      'join-room',
      { id },
      (akt: { status: boolean; rooms: FriendRoom[] }) => {
        if (akt.status) {
          resolve(akt.rooms);
        } else {
          reject('respoense error');
        }
      },
    );
  });
};

/**
 * 获取所有好友信息
 */
export const get_friends_profile = async (
  id: number,
): Promise<UserProfile[]> => {
  return new Promise((resolve, reject) => {
    socket.emit(
      'get-friends-profile',
      { id },
      (akt: { status: boolean; friend_profile: UserProfile[] }) => {
        if (akt.status) {
          resolve(akt.friend_profile);
        } else {
          reject('respoense error');
        }
      },
    );
  });
};

export const start_socket = () => {
  socket.on('get-message', (msg) => {
    message_store.set_friend_message(msg);
  });
};
