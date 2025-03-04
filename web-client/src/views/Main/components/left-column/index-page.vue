<script setup lang="ts">
import SearchBar from './components/search-bar.vue';
import ChatListItem from './components/chat-list-item.vue';
import router from '@/router';

/**
 * 用户退出登录
 */
const logout = async () => {
  localStorage.removeItem('token');
  router.push('login');
};
</script>

<template>
  <div id="LeftColumn">
    <div id="LeftColumn-main">
      <div class="LeftMainHeader">
        <SearchBar />
      </div>
      <div class="chat-list">
        <ChatListItem v-for="item in 80" :key="item" />
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
