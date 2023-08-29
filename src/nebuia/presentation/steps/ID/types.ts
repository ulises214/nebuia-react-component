export const Documents = {
  ine: {
    name: 'ine',
    sides: ['front', 'back'] as const,
  },
  passport: {
    name: 'passport',
    sides: ['front'] as const,
  },
} as const;

export type IdAction = 'selection' | 'capture' | 'upload';
