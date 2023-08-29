export type ParamCallback<T, R = void> = (param: T) => R;
export type PromiseCallback<T = void, R = void> = ParamCallback<T, Promise<R>>;
export type PromiseOrCallback<T = void, R = void> = ParamCallback<
  T,
  Promise<R> | R
>;
export type ValueCallback<T> = () => T;
export type PromiseValueCallback<T> = ValueCallback<Promise<T>>;
export type PromiseOrValueCallback<T> = ValueCallback<Promise<T> | T>;
