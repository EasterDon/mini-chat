import type { RequestFn } from '@/types';

/* eslint-disable @typescript-eslint/no-unsafe-function-type */
interface SearchFuncOption {
  onSearchStart?: Function;
  onSearchSuccess?: Function;
  onSearchError?: Function;
  onSearchCancel?: Function;
}

// 全局变量，用于存储 AbortController 和防抖定时器
let abortController: AbortController | null = null;
let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 *
 * @param value 查询的数据
 * @param debounceDelay 防抖时间，默认300ms
 * @param requestFn 需要执行的网络请求任务
 * @param options 其它选项，包含函数执行的开始、成功、错误、取消四个阶段，用户需要执行的函数
 * @returns
 */
export const search_value = <T>(
  value: string,
  debounceDelay = 300,
  requestFn: RequestFn<T>,
  options?: SearchFuncOption,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    if (value.trim() === '') {
      reject(new Error('参数不能为空'));
    }

    if (options?.onSearchStart) options.onSearchStart();

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(async () => {
      if (abortController) {
        if (options?.onSearchCancel) options.onSearchCancel();
        abortController.abort();
        abortController = null;
      }

      abortController = new AbortController();

      // if (options?.onSearchStart) options.onSearchStart();

      try {
        const response = await requestFn(abortController.signal);
        if (options?.onSearchSuccess) options.onSearchSuccess();
        resolve(response);
      } catch (error) {
        if (options?.onSearchError) options.onSearchError();
        if (error instanceof Error) {
          reject(error);
        } else {
          const unknownError = new Error('未知错误');
          reject(unknownError);
        }
      } finally {
        abortController = null;
      }
    }, debounceDelay);
  });
};
