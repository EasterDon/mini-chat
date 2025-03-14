<script setup lang="ts">
import {
  computed,
  inject,
  nextTick,
  onMounted,
  ref,
  unref,
  type Ref,
} from 'vue';

import { Input } from 'ant-design-vue';
import { SmileOutlined, AudioOutlined } from '@ant-design/icons-vue';

import ChatMessage from './components/chat-message.vue';
import InputFile from './components/input-file.vue';

import { useUserStore } from '@/stores/user';
import { useRoomStore } from '@/stores/room';

const user_store = useUserStore();
const room_store = useRoomStore();

import type { SendMessage, Message } from '@/types';
import { chat } from '@/views/Main/ws';

const chat_content: Ref<HTMLDivElement | null> = ref(null);

// 获取聊天信息
import { useMessageStore } from '@/stores/message';
const message_store = useMessageStore();
const current_chat_id = inject('current_chat_id', ref(0));
const message_index = computed(() =>
  message_store.friend_message.findIndex(
    (item) =>
      item.message[0].sender === current_chat_id.value ||
      item.message[0].receiver === current_chat_id.value,
  ),
);
const values = computed(() =>
  message_index.value === -1
    ? []
    : message_store.friend_message[message_index.value].message,
);
/**
 * 检查聊天容器是否位于最底部或最顶部，并在满足条件时滚动到最底部。
 *
 * 该函数主要用于聊天应用或其他需要自动滚动到底部的场景，
 * 当新消息被添加时，如果用户已经在最底部或最顶部，则自动平滑滚动到最底部。
 */
const to_bottom = async () => {
  if (!chat_content.value) return;
  const container = chat_content.value;
  const isAtBottom =
    container.scrollHeight - container.scrollTop <= container.clientHeight + 1;
  const isAtTop = container.scrollTop === 0;
  if (!isAtBottom && !isAtTop) return;
  await nextTick();
  if (isAtBottom || isAtTop) {
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  }
};

onMounted(async () => {
  await to_bottom();
});

// 聊天信息
const message_value = ref('');
const current_room = computed(
  () =>
    room_store.rooms.find(
      (item) => item.user_id_1 || item.user_id_2 === current_chat_id.value,
    ).id,
);
const send_message = async () => {
  if (!unref(current_chat_id)) return;
  if (!message_value.value) return;
  const message: SendMessage = {
    room: current_room.value,
    sender: user_store.profile.id!,
    receiver: unref(current_chat_id),
    type: 'text',
    content: message_value.value,
  };
  const res = await chat(message);
  message_value.value = '';
  if (!res.status) return;
  if (!res.timestamp) return;
  const new_message: Message = { ...message, date: res.timestamp };
  message_store.set_friend_message(new_message);
};
</script>

<template>
  <div class="unshow" v-show="!current_chat_id"></div>
  <div class="chat-wrapper" v-show="current_chat_id">
    <div class="chat-header">
      <div>name</div>
      <div>search value-bar option</div>
    </div>
    <div ref="chat_content" class="chat-content">
      <template v-for="(message, index) in values" :key="index">
        <ChatMessage :message />
      </template>
    </div>
    <div class="message-input">
      <InputFile />
      <form @submit.prevent>
        <Input
          class="input"
          v-model:value="message_value"
          @press-enter="send_message"
        />
      </form>
      <SmileOutlined class="icon" />
      <AudioOutlined @click="send_message" class="icon" />
    </div>
  </div>
</template>

<style scoped lang="less">
.unshow {
  width: 100%;
  height: 100%;
  background-color: black;
}

.chat-wrapper {
  width: 100%;
  height: 100%;
  background-color: beige;

  .chat-header {
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
  }

  .chat-content {
    width: 100%;
    height: 80%;
    background-color: whitesmoke;
    overflow-y: scroll;
    scrollbar-width: thin;
    scroll-behavior: smooth;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .message-input {
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    align-items: center;

    .input {
      width: 60%;
      height: 50%;
    }

    .icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;

      &:focus {
        box-shadow: 0px 0px 10px red;
      }
    }
  }
}
</style>
