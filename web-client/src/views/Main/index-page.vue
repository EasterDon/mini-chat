<script setup lang="ts">
import { MainChat, LeftColumn } from './components';

// import { WS } from '@/api';
// const socket = new WS('test');
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
