export type VoidCallback = () => void | Promise<void>;
export type ValueCallback<T> = () => T;
export type ParamCallback<T, R = void> = (param: T) => R;
export type DoubleParamCallback<T, K, R = void> = (param0: T, param1: K) => R;
