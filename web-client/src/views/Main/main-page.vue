<script setup lang="ts">
import { ref, provide, type Ref, onMounted } from 'vue';
import { MainChat, LeftColumn } from './components';

import { useUserStore } from '@/stores/user';
import { useFriendStore } from '@/stores/friend';

import { useRoomStore } from '@/stores/room';

import { join_rooms, get_friends_profile, start_socket } from './ws';

const user_store = useUserStore();
const friend_store = useFriendStore();
const room_store = useRoomStore();

onMounted(async () => {
  await init_rooms();
  await init_friends_profile();
  start_socket();
});

/**
 * 用户加入所有 好友-自己，群友-自己 构成的聊天室
 */
const init_rooms = async () => {
  try {
    const rooms = await join_rooms(user_store.profile.id);
    room_store.init_rooms(rooms);
  } catch (error) {
    console.log(error);
  }
};
/**
 * 用户获取所有好友信息
 */
const init_friends_profile = async () => {
  try {
    const friends_profile = await get_friends_profile(user_store.profile.id);
    friend_store.init_friend_list(friends_profile);
  } catch (error) {
    console.log(error);
  }
};

// 全局可使用的当前聊天室id
const current_chat_id: Ref<null | number> = ref(null);
const change_current_chat_id = (id: number) => {
  current_chat_id.value = id;
};
provide('current_chat_id', current_chat_id);
provide('change_current_chat_id', change_current_chat_id);
</script>

<template>
  <main id="main">
    <LeftColumn />
    <MainChat />
  </main>
</template>

<style scoped lang="less">
#main {
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 100%;
  text-align: left;
}
</style>
