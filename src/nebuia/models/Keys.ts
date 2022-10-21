export type NebuiaKeys = {
  apiKey: string;
  apiSecret: string;
  keyId: string;
};
export abstract class KeysUtils {
  static json(keys: NebuiaKeys): Record<string, string> {
    return {
      api_key: keys.apiKey,
      api_secret: keys.apiSecret,
      time_key: keys.keyId,
    };
  }
}
