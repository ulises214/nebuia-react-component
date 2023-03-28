export function lightenDarkenColor(pito: string, amt: number): string {
  let usePound = false;
  let col = pito;
  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) {
    r = 255;
  } else if (r < 0) {
    r = 0;
  }

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) {
    b = 255;
  } else if (b < 0) {
    b = 0;
  }

  let g = (num & 0x0000ff) + amt;

  if (g > 255) {
    g = 255;
  } else if (g < 0) {
    g = 0;
  }

  const hex = (g | (b << 8) | (r << 16)).toString(16);
  if (hex.length !== 6) {
    return (usePound ? '#' : '') + '0'.repeat(6 - hex.length) + hex;
  }

  return (usePound ? '#' : '') + hex;
}
export const hexToRgb = (hex: string): number[] =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      (_m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`,
    )
    .substring(1)
    .match(/.{2}/g)
    ?.map((x) => parseInt(x, 16)) ?? [0, 0, 0];

export const hexToRgba = (hex: string, alpha: number): string => {
  const rgb = hexToRgb(hex);

  return `rgba(${rgb[0] ?? 0}, ${rgb[1] ?? 0}, ${rgb[2] ?? 0}, ${alpha})`;
};
