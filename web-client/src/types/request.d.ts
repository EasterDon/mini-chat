export type RequestFn<T> = (signal: AbortSignal) => Promise<T>;