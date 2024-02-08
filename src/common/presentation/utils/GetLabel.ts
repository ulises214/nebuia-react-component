import { AdvancedSignType } from 'nebuia-ts/models';

export const getAdvancedSignatureTypeLabel = (type: AdvancedSignType): string =>
  ({
    [AdvancedSignType.graphic]: 'Gráfica',
    [AdvancedSignType.fiel]: 'FIEL',
    [AdvancedSignType.block_chain]: 'Blockchain',
  })[type];
