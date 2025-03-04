<script lang="ts" setup>
import { ref } from 'vue';
import { Input } from 'ant-design-vue';
import {
  MenuOutlined,
  SearchOutlined,
  LoadingOutlined,
} from '@ant-design/icons-vue';

const is_searching = ref(false);
const is_focusing = ref(false);
const input_value = ref('');

const has_focus = () => {
  is_focusing.value = true;
};

const out_input_focus = () => {
  is_searching.value = false;
  is_focusing.value = false;
};

const search_value = async () => {
  if (input_value.value.trim() === '') {
    is_searching.value = false;
    return;
  }
  is_searching.value = true;
  await new Promise((r) => setTimeout(() => r(1), 2000));
  is_searching.value = false;
};
</script>

<template>
  <div class="search-bar">
    <MenuOutlined class="open-menu" />
    <Input
      class="SearchInput"
      placeholder="搜索"
      v-model:value="input_value"
      :class="{ 'has-focus': is_focusing }"
      :allow-clear="true"
      :bordered="false"
      @focus="has_focus"
      @blur="out_input_focus"
      @input="search_value"
    >
      <template #prefix>
        <SearchOutlined class="icon-search" v-if="!is_searching" />
        <LoadingOutlined class="icon-loading" v-else />
      </template>
    </Input>
  </div>
</template>

<style lang="less" scoped>
.search-bar {
  height: 3.5rem;
  display: flex;
  align-items: center;

  .open-menu {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.SearchInput {
  max-width: calc(100% - 3.25rem);
  border: 2px solid rgb(244, 244, 245);
  border-radius: 1.375rem;

  .icon-search,
  .icon-loading {
    // color: #b2b5b7;
    color: #3390ec;
  }
}

.has-focus {
  border: 2px solid #3390ec;
}
</style>
