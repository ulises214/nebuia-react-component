export type MaybeWhen<
  T extends {
    type: string;
  },
  R,
> = (
  state: T,
  args: {
    [K in T['type']]?: (state: Extract<T, { type: K }>) => R;
  } & {
    orDefault: (state: T) => R;
  },
) => R;
