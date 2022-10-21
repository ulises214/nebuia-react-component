export const fancyTimeFormat = (duration: number): string => {
  // Hours, minutes and seconds
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret: string;

  ret = `${mins}:${secs < 10 ? '0' : ''}`;
  ret += `${secs}`;

  return ret;
};
