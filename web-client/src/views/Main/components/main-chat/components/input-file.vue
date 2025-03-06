<script lang="ts" setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { LinkOutlined } from '@ant-design/icons-vue';
import { upload_file } from '../request';

// 文件上传
const input_file = ref<HTMLInputElement | null>(null);
const upload_input_file = async () => {
  if (!input_file.value) {
    return;
  }
  if (!input_file.value.files) {
    message.warn('请选择文件');
    return;
  }
  const file = input_file.value.files[0];

  console.log(file);

  const upload_res = await upload_file(file);
  if (!upload_res.isOk) {
    message.error('文件上传失败');
    return;
  }
};
</script>

<template>
  <input
    ref="input_file"
    type="file"
    :multiple="false"
    style="display: none"
    @change="upload_input_file"
  />
  <LinkOutlined class="icon" @click="input_file?.click()" />
</template>

<style lang="less" scoped>
.icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;

  &:focus {
    box-shadow: 0px 0px 10px red;
  }
}
</style>
