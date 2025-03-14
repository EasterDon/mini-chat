<script setup lang="ts">
import { ref, provide, type Ref } from 'vue';
import { socket } from './ws';
import { MainChat, LeftColumn } from './components';

import { useUserStore } from '@/stores/user';
import { useFriendStore } from '@/stores/friend';
import { useMessageStore } from '@/stores/message';
import { useRoomStore } from '@/stores/room';

const user_store = useUserStore();
const friend_store = useFriendStore();
const message_store = useMessageStore();
const room_store = useRoomStore();
socket.on('connect', async () => {
  // chat('😄');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  socket.emit('join-room', { id: user_store.profile.id }, (akt: any) => {
    room_store.init_rooms(akt);
  });
  friend_store.init_friend_list(user_store.profile.id);
});

const current_chat_id: Ref<null | number> = ref(null);
const change_current_chat_id = (id: number) => {
  current_chat_id.value = id;
};
provide('current_chat_id', current_chat_id);
provide('change_current_chat_id', change_current_chat_id);

socket.on('get-message', (msg) => {
  message_store.set_friend_message(msg);
});
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
