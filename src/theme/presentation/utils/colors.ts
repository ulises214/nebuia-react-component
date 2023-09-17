export function getColorContrast(colorHex: string): string {
  // Convierte el color hexadecimal a RGB
  const r = parseInt(colorHex.substring(1, 3), 16);
  const g = parseInt(colorHex.substring(3, 5), 16);
  const b = parseInt(colorHex.substring(5, 7), 16);

  // Calcula el brillo relativo del color
  const brillo = (r * 299 + g * 587 + b * 114) / 1000;

  // Elige un color de contraste basado en el brillo
  const colorContraste = brillo > 128 ? '#000000' : '#FFFFFF';

  return colorContraste;
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
