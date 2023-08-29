export type ActionHookResponse<R, T = void> = (
  arg0: T,
) => [boolean, string | undefined, R | undefined];
