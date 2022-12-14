import { FC } from 'react';

import clsxm from '../../../lib/common/utils/clsxm';
import { ParamCallback } from '../../../lib/common/VoidCallback';
import NextImage from '../../../lib/components/molecules/NextImage';
import { useNebuiaThemeContext } from '../../context/NebuiaThemeContext';
import { CompleteStep } from '../../models/CompleteStep';
import { H1 } from '../atoms';
import { ListTile } from '../molecules';

const deviceIcon = 'https://i.ibb.co/MPd4Fp5/icon-cross-device.png';

type Step = CompleteStep & {
  disabled: boolean;
};
type InstructionsProps = {
  names: Step[];
  onStepClick: ParamCallback<Step>;
};
const Line: FC = () => {
  const { theme } = useNebuiaThemeContext();

  return (
    <div
      style={{ width: '2px', backgroundColor: theme.textSecondary }}
      className="h-5"
    ></div>
  );
};
const Tile: FC<{ name: Step; line: boolean; onClick: ParamCallback<Step> }> = ({
  name,
  line,
  onClick,
}) => {
  return (
    <ListTile
      onClick={() => !name.disabled && onClick(name)}
      className={clsxm(
        'items-start justify-center py-1',
        !name.disabled && 'cursor-pointer',
        !name.disabled && !name.status && 'hover:bg-gray-200',
        name.disabled && 'opacity-50',
        name.status && 'bg-blue-100 opacity-100',
      )}
      leading={
        <div
          className={clsxm(
            'flex flex-col items-center justify-start gap-2',
            // line && 'pt-4'
          )}
        >
          <NextImage width={30} height={30} src={deviceIcon} alt="Icon" />
          {line && <Line />}
        </div>
      }
      title={_getTitle(name.name)}
      subtitle={_getSummary(name.name)}
    />
  );
};

export const NebuiaStepsInstructions: FC<InstructionsProps> = ({
  names,
  onStepClick,
}) => {
  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <H1 center className="w-full">
        Completa tu proceso de identidad
      </H1>
      {names.map((n, k) => {
        return (
          <Tile
            onClick={onStepClick}
            key={k}
            line={k !== names.length - 1}
            name={n}
          />
        );
      })}
    </div>
  );
};
function _getTitle(name: string): string {
  switch (name) {
    case 'email':
      return 'Correo electr??nico';
    case 'phone':
      return 'Tel??fono celular';
    case 'liveness':
      return 'Prueba de vida';
    case 'id':
      return 'Documento de identidad';
    case 'address':
      return 'Comprobante de domicilio';
    default:
      return '';
  }
}
function _getSummary(name: string): string {
  switch (name) {
    case 'email':
      return 'Verificaremos tu correo electr??nico via OTP';
    case 'phone':
      return 'Verificaremos tu n??mero de tel??fono via OTP';
    case 'liveness':
      return 'Analizaremos tu rostro para verificar que seas t?? quien realice el procedimiento';
    case 'id':
      return 'Deber??s proporcionar una identificaci??n oficial como tu INE o pasaporte';
    case 'address':
      return 'Deber??s proporcionar un comprobante de domicilio de no m??s de 3 meses';
    default:
      return '';
  }
}
