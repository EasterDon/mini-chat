<script setup lang="ts">
import { reactive } from 'vue';
import { Form, FormItem, Input, Button, message } from 'ant-design-vue';
import { sign_up_request } from '../request';

const sign_up_value = reactive<SignUpValue>({
  username: '',
  nickname: '',
  password: '',
});

const sign_up = async () => {
  const result = await sign_up_request(sign_up_value);
  if (!result.isOk) return;
  message.info('注册成功，请返回登录');
};
</script>

<template>
  <Form :model="sign_up_value" autocomplete="off" @finish="sign_up">
    <FormItem label="账号" name="username">
      <Input v-model:value.trim="sign_up_value.username" />
    </FormItem>
    <FormItem label="昵称" name="nickname"
      ><Input v-model:value.trim="sign_up_value.nickname"
    /></FormItem>
    <FormItem label="密码" name="password"
      ><Input v-model:value.trim="sign_up_value.password"
    /></FormItem>
    <Button html-type="submit"></Button>
  </Form>
</template>
