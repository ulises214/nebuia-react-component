type NebuiaApiResultSuccess<T> = { status: true; payload: T };
type NebuiaApiResponseError = { status: false; payload: string };

export type NebuiaApiResponse<T> =
  | NebuiaApiResponseError
  | NebuiaApiResultSuccess<T>;
