import { nextTick, type Ref } from 'vue';

/**
 * 检查聊天容器是否位于最底部或最顶部，并在满足条件时滚动到最底部。
 *
 * 该函数主要用于聊天应用或其他需要自动滚动到底部的场景，
 * 当新消息被添加时，如果用户已经在最底部或最顶部，则自动平滑滚动到最底部。
 *
 * @param element vue的模板元素引用
 */
export const to_bottom = async (element: Ref<HTMLElement | null>) => {
  if (!element) return;
  if (!element.value) return;
  const container = element.value;
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
