<script setup lang="ts">
import SearchBar from './components/search-bar.vue';
import ChatListItem from './components/chat-list-item.vue';
import router from '@/router';
import { useFriendStore } from '@/stores/friend';
import { inject } from 'vue';

/**
 * 用户退出登录
 */
const logout = async () => {
  localStorage.removeItem('token');
  router.push('login');
};

// 好友与群聊
const friend_store = useFriendStore();

const change_current_chat_id = inject(
  'change_current_chat_id',
  (id: number) => {
    console.log("失败",id);
  },
);
</script>

<template>
  <div id="LeftColumn">
    <div id="LeftColumn-main">
      <div class="LeftMainHeader">
        <SearchBar />
      </div>
      <div class="chat-list">
        <ChatListItem
          v-for="item in friend_store.friend_list"
          :value="item"
          :key="item.id"
          @click="change_current_chat_id(item.id)"
        />
      </div>
      <div class="NewChatButton"></div>
      <button @click="logout">退出登录</button>
    </div>
  </div>
</template>

<style scoped lang="less">
#LeftColumn {
  width: 25vw;
  background-color: #ffffff;
}

#LeftColumn-main {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.LeftMainHeader {
  position: relative;
}

.chat-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  overflow-y: scroll;
}
</style>
