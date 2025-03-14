<script setup lang="ts">
import { Avatar } from 'ant-design-vue';
// const avatar_name = 'avatar.png';
// const last_message_value = {
//   sender: 'Easter',
//   content: 'Hello World!',
// };
// const avatar_src = new URL('/avatar/' + avatar_name, import.meta.url).href;
// console.log(avatar_src);

const props = defineProps(['value']);
</script>

<template>
  <div class="chat-list-item">
    <Avatar class="item-avatar" :size="50" :src="props.value.avatar" />
    <div class="item-content">
      <div class="item-title">
        <div class="item-name">{{ props.value.nickname }}</div>
        <!-- 
          @future
          改为当天消息显示时间
          一周内消息显示周几
          其余时间显示月/日
        -->
        <div class="item-last-message-time">00:00</div>
      </div>

      <div class="item-last-message">{{ '测试' }}:{{ '测试' }}</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.chat-list-item {
  width: 95%;
  height: 4rem;
  box-sizing: border-box;
  padding: 0 20px;
  border-radius: 1rem;
  display: flex;
  flex: 1 auto;
  align-items: center;
  transition: background-color 0.5s;

  &:hover {
    background-color: #f4f4f5;
  }

  .item-avatar {
    width: 3rem;
    height: 3rem;
  }

  .item-content {
    width: calc(100% - 3rem);
    height: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    /// @future
    /// 样式美化

    .item-title {
      height: 50%;
      display: flex;
      align-items: center;

      .item-name {
        width: 80%;
        font-size: large;
      }

      .item-last-message-time {
        color: #707579;
        font-size: small;
      }
    }

    .item-last-message {
      height: 40%;
      color: #707579;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
