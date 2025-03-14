import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import type { Message } from '@/types';

export const useMessageStore = defineStore('message', () => {
  const friend_message: Ref<{ room: number; message: Message[] }[]> = ref([]);

  const set_friend_message = (new_message: Message) => {
    // let index = friend_message.value.findIndex(
    //   (item) => item.id === new_message.sender,
    // );
    // if (index === -1) {
    //   friend_message.value.push({ id: new_message.sender, message: [] });
    //   index = friend_message.value.length - 1;
    // }
    // friend_message.value[index].message.push({
    //   type: new_message.type,
    //   content: new_message.content,
    // });

    // 查找是否已存在该 sender 的条目
    let friend = friend_message.value.find(
      (item) => item.room === new_message.room,
    );

    // 如果不存在，则创建一个新条目
    if (!friend) {
      friend = { room: new_message.room, message: [] };
      friend_message.value.push(friend);
    }

    // 由于 friend 是 friend_message.value 中某个对象的引用，直接修改 friend 也会反映到 friend_message.value 中。
    // 将新消息添加到 message 数组中
    friend.message.push(new_message);
  };

  return { friend_message, set_friend_message };
});
