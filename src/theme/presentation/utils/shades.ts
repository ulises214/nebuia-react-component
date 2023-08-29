import { hexToRgb, lightenDarkenColor } from './colors';

const shadesNumbers = [210, 180, 120, 90, 60, 30, 0, -10, -20, -30];
export const getColorShades = (color: string): string[] => {
  return shadesNumbers.map((s) =>
    hexToRgb(lightenDarkenColor(color, s)).join(' '),
  );
};

const twShades = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
];

export const setTwShades = (color: string, prefix: string): void => {
  const rgbColors = getColorShades(color);
  rgbColors.forEach((s, i) => {
    document.documentElement.style.setProperty(
      `--tw-nebuia-color-${prefix}-${twShades[i]}`,
      s,
    );
  });
};
