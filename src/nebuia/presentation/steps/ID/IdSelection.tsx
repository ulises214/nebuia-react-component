import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../../../common/presentation/components/atoms/buttons/Button';
import { P } from '../../../../common/presentation/components/atoms/P';
import { useControlButton } from '../../../../common/presentation/hooks/UseControlButton';
import clsxm from '../../../../common/presentation/utils/clsxm';
import { useTheme } from '../../../../theme/presentation/hooks/UseTheme';
import { ParamCallback } from '../../../domain/types/ParamCallback';
import { ID_ICON, PASSPORT_ICON } from './Images';
import { Documents, IdAction } from './index';

type Props = {
  current?: keyof typeof Documents;
  onSelect: (doc: keyof typeof Documents) => void;
};

type SelectionProps = Props & {
  setAction: ParamCallback<IdAction>;
};

export const Card: React.FC<
  Props & {
    doc: keyof typeof Documents;
  }
> = ({ current, onSelect, doc }) => {
  const { t } = useTranslation();
  const { dark } = useTheme().theme;

  const isActive = current === doc;

  return (
    <Button
      variant="ghost"
      onClick={() => onSelect(doc)}
      className={clsxm(
        'p-4 border border-solid flex items-center justify-start gap-4',
        isActive && '!border-nebuia-primary-500',
        !dark && '!shadow-md',
        !isActive && {
          'border-gray-300': !dark,
          'border-gray-500': dark,
        },
      )}
    >
      {
        <picture>
          <img
            src={doc === 'ine' ? ID_ICON : PASSPORT_ICON}
            alt=""
            className="h-12 w-12"
          />
        </picture>
      }
      <P className="grow text-left">{t(`pages.id.selection.types.${doc}`)}</P>
    </Button>
  );
};

export const IdSelection: FC<SelectionProps> = ({
  onSelect,
  current,
  setAction,
}) => {
  const { t } = useTranslation();

  const handleNext = useCallback(() => {
    setAction('capture');
  }, [setAction]);

  useControlButton({
    action: handleNext,
    label: t('common.continue'),
    side: 'next',
    active: !!current,
  });

  return (
    <div className="flex h-3/5 flex-col justify-center gap-4">
      <P className="max-w-sm text-center">
        {t('pages.id.selection.instructions')}
      </P>
      <div className="flex flex-col gap-4">
        <Card doc="ine" current={current} onSelect={onSelect} />
        <Card doc="passport" current={current} onSelect={onSelect} />
      </div>
    </div>
  );
};
