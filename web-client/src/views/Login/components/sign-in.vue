<script setup lang="ts">
import { Input, InputPassword, Button, message } from 'ant-design-vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { ref, type Ref } from 'vue';
import { useUserStore } from '@/stores/user';
import router from '@/router';
import { sign_in_request } from '../request';

const user_store = useUserStore();

const username = ref('');
const password = ref('');

const input_username: Ref<HTMLInputElement | null> = ref(null);
const input_password: Ref<HTMLInputElement | null> = ref(null);

const sign_in = async () => {
  if (!username.value) {
    input_username.value?.focus();
    message.warn('用户名不能为空');
    return;
  }
  if (!password.value) {
    input_password.value?.focus();
    message.warn('密码不能为空');
    return;
  }
  const result = await sign_in_request(username.value, password.value);
  if (!result.isOk) return;

  await user_store.init_profile_property(result.data.profile);
  localStorage.setItem('token', result.data.token);
  message.info(`欢迎您！${user_store.profile.nickname}`);

  router.push('/main');
};
</script>

<template>

    <form class="login" @submit.prevent="sign_in">
      <Input
        ref="input_username"
        v-model:value.trim="username"
        :allow-clear="true"
        type="text"
        placeholder="用户名"
      >
        <template #prefix>
          <UserOutlined />
        </template>
      </Input>
      <InputPassword
        ref="input_password"
        v-model:value.trim="password"
        :allow-clear="true"
        type="password"
        placeholder="密码"
      >
        <template #prefix>
          <LockOutlined />
        </template>
      </InputPassword>
      <Button html-type="submit" type="primary">登录</Button>
    </form>
</template>

<style scoped lang="less">
  .login {
    width: 300px;
    padding: 20px 0;
    background-color: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
</style>