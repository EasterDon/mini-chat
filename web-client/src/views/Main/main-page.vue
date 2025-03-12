<script setup lang="ts">
import { socket } from './ws';
import { MainChat, LeftColumn } from './components';

import { useUserStore } from '@/stores/user';

const user_store = useUserStore();

socket.on('connect', async () => {
  // chat('😄');
  socket.emit('join-room', { id: user_store.profile.id }, (akt) => {
    console.log(akt);
  });
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
