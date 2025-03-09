<script setup lang="ts">
import { socket, chat } from './ws';
import { MainChat, LeftColumn } from './components';

import { useUserStore } from '@/stores/user';

socket.on('connect', async () => {
  chat('😄');
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
