<script setup lang="ts">
import { computed } from 'vue';
import type { Message } from '@/types';
import { useUserStore } from '@/stores/user';

const prop = defineProps<{ message: Message }>();
const user_store = useUserStore();
const message_position = computed(() =>
  user_store.profile.id === prop.message.sender ? 'right' : 'left',
);
</script>

<template>
  <div class="message" :class="message_position">
    {{ prop.message.content }}
  </div>
</template>

<style scoped lang="less">
.message {
  min-width: 3rem;
  max-width: 80%;
  min-height: 2rem;
  padding: 5px;
  border-radius: 5px;
  text-wrap: wrap;
  background-color: rgb(216, 211, 211);
}

.left {
  align-self: self-start;
}
.right {
  align-self: self-end;
}
</style>
