<script setup lang="ts">
import { nextTick, onMounted, ref, type Ref } from 'vue';

import { Input } from 'ant-design-vue';
import { SmileOutlined, AudioOutlined } from '@ant-design/icons-vue';

import ChatMessage from './components/chat-message.vue';
import InputFile from './components/input-file.vue';

import type { MessageValue } from '@/types';

const chat_content: Ref<HTMLDivElement | null> = ref(null);

const values = ref<MessageValue[]>([
  { type: 'text', sender: 1, content: 'hello', date: '今天' },
  { type: 'text', sender: 1, content: 'hello', date: '今天' },
  { type: 'text', sender: 1, content: 'hello', date: '今天' },
  { type: 'text', sender: 1, content: 'no hello', date: '今天' },
]);

const add = async () => {
  values.value.push({
    type: 'text',
    sender: 1,
    content: 'hello',
    date: '今天',
  });

  await to_bottom();
};

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
</script>

<template>
  <div class="chat-wrapper">
    <div class="chat-header">
      <div>name</div>
      <div>search value-bar option</div>
    </div>
    <div ref="chat_content" class="chat-content">
      <template v-for="message in values" :key="message">
        <ChatMessage :message />
      </template>
    </div>
    <div class="message-input">
      <InputFile />
      <Input class="input" />
      <SmileOutlined class="icon" />
      <AudioOutlined @click="add" class="icon" />
    </div>
  </div>
</template>

<style scoped lang="less">
.chat-wrapper {
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
