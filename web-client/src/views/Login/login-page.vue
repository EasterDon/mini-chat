<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import { Button } from 'ant-design-vue';
import SignIn from './components/sign-in.vue';
import SignUp from './components/sign-up.vue';

enum LoginChoice {
  sign_in,
  sign_up,
}

const current_choice: Ref<LoginChoice> = ref(LoginChoice.sign_in);
const choice = computed(() =>
  LoginChoice.sign_in === current_choice.value ? SignIn : SignUp,
);

const change_choice = () => {
  current_choice.value =
    LoginChoice.sign_in === current_choice.value
      ? LoginChoice.sign_up
      : LoginChoice.sign_in;
};
</script>

<template>
  <div class="login-wrapper">
    <component :is="choice"></component>
    <Button @click="change_choice">切换</Button>
  </div>
</template>

<style scoped lang="less">
.login-wrapper {
  width: 100%;
  height: 100%;
  background: center / cover no-repeat
    url('http://127.0.0.1:3001/images/background/1.jpg');
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
