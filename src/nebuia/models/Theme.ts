import { Optional } from '../../lib/common/Optional';

export class Theme {
  // eslint-disable-next-line no-use-before-define
  private static instance: Optional<Theme>;
  primary = '#1652f0';
  secondary = '#02BC9E';
  card = '#ffffff';
  background = '#ffffff';
  text = '#30384E';
  textSecondary = 'rgba(90, 88, 100, 0.8)';
  // font size
  readonly titleSize = '1.125rem';
  readonly normalSize = '1rem';
  readonly smallSize = '0.875rem';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static get i(): Theme {
    return this.instance ?? (this.instance = new Theme());
  }

  // general colors8
}
export function lightenDarkenColor(c: string, amt: number): string {
  let col = c;
  let usePound = false;

  if (col.startsWith('#')) {
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
      (_, r: string, g: string, b: string) => `#${r}${r}${g}${g}${b}${b}`,
    )
    .substring(1)
    .match(/.{2}/g)
    ?.map((x) => parseInt(x, 16)) ?? [0, 0, 0];
