import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { UserProfile } from '@/types';
import { message } from 'ant-design-vue';

export const useFrinedStore = defineStore('friend', () => {
  const friend_list = ref<UserProfile[]>([]);

  async function init_friend_list(friend_list_value: UserProfile[]) {
    friend_list.value = friend_list_value;
  }

  async function update_friend_list(
    change_item: UserProfile,
    method: FriendListMethod,
  ) {
    try {
      const index = friend_list.value.findIndex(
        (item) => item.id === change_item.id,
      );

      if (index === -1 && method !== FriendListMethod.Add) return false;

      switch (method) {
        case FriendListMethod.Add:
          if (index !== -1) return false;
          friend_list.value.push(change_item);
          break;

        case FriendListMethod.Delete:
          friend_list.value.splice(index, 1);
          break;

        case FriendListMethod.Update:
          friend_list.value[index] = {
            ...friend_list.value[index],
            ...change_item,
          };
          break;

        default:
          return false;
      }

      return true;
    } catch (error) {
      message.error(`更新好友列表信息失败：${error}`);
      return false;
    }
  }
  return { friend_list, init_friend_list, update_friend_list };
});

enum FriendListMethod {
  Add,
  Delete,
  Update,
}
