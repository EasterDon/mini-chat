<script setup lang="ts">
import type { MessageValue } from '@/types';
const prop = defineProps<{ message: MessageValue }>();
</script>

<template>
  <div class="message">{{ prop.message.content }}</div>
</template>

<style scoped lang="less">
.message {
  max-width: 80%;
  min-height: 3rem;
  background-color: aliceblue;
}
</style>
