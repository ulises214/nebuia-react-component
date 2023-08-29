export const updateUrl = (key: string, value: string): void => {
  // check if url has api_key and api_secret
  const urlParams = new URLSearchParams(window.location.search);
  const apiKey = urlParams.get('api_key');
  const apiSecret = urlParams.get('api_secret');
  if (apiKey && apiSecret) {
    urlParams.set(key, value);
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${urlParams.toString()}`,
    );
  }
};
