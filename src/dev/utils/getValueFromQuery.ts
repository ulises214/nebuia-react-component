const query = new URLSearchParams(window.location.search);

export const getFromQuery = (key: string): string | undefined => {
  const value = query.get(key);

  return value ?? undefined;
};
