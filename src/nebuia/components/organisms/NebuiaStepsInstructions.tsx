/* eslint-disable no-use-before-define */
import { FC, PropsWithChildren } from 'react';
import {
  MdArrowCircleRight,
  MdCheckCircle,
  MdEmail,
  MdFace6,
  MdHome,
  MdOutlineEmail,
  MdOutlineFace6,
  MdOutlineHome,
  MdOutlineSmartphone,
  MdOutlineVerifiedUser,
  MdRadioButtonUnchecked,
  MdSmartphone,
  MdVerifiedUser,
} from 'react-icons/md';

import clsxm from '../../../lib/common/utils/clsxm';
import { ParamCallback } from '../../../lib/common/VoidCallback';
import { useNebuiaThemeContext } from '../../context/NebuiaThemeContext';
import { CompleteStep } from '../../models/CompleteStep';
import { P } from '../atoms';

// const deviceIcon =
//   'data:image/png;base64,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';

type Step = CompleteStep & {
  disabled: boolean;
};
type InstructionsProps = {
  names: Step[];
  onStepClick: ParamCallback<Step>;
};
const Line: FC<{
  active: boolean;
}> = ({ active }) => {
  return (
    <div
      className={clsxm(
        'h-full grow',
        'border-r-4 border-dashed',
        active && 'border-nebuia-primary-500',
        !active && 'border-gray-400',
      )}
    ></div>
  );
};

const _Color: FC<
  PropsWithChildren<{
    disbabled: boolean;
    status: boolean;
  }>
> = ({ children, disbabled, status }) => {
  const {
    theme: { dark },
  } = useNebuiaThemeContext();

  return (
    <span
      className={clsxm(
        dark
          ? {
              'text-nebuia-primary-500': status,
              'text-nebuia-primary-400': !status && !disbabled,
              'text-gray-400': !status && disbabled,
            }
          : {
              'text-nebuia-primary-500': status,
              'text-nebuia-primary-400': !status && !disbabled,
              'text-slate-400': !status && disbabled,
            },
      )}
    >
      {children}
    </span>
  );
};

const Tile: FC<{
  name: Step;
  line: boolean;
  onClick: ParamCallback<Step>;
  index: number;
}> = ({ name, line, onClick, index }) => {
  const {
    theme: { dark },
  } = useNebuiaThemeContext();

  const Icon = _getIcon(name.name, name.status);
  const title = _getTitle(name.name);
  const summary = _getSummary(name.name);

  const RightIcon = name.status
    ? MdCheckCircle
    : name.disabled
    ? MdRadioButtonUnchecked
    : MdArrowCircleRight;

  return (
    <button
      type="button"
      onClick={() => {
        if (!name.disabled) {
          onClick(name);
        }
      }}
      className={clsxm(
        'flex w-full items-start text-start gap-4 p-2',
        !name.disabled && {
          '!bg-teal-50': !dark,
          '!bg-slate-800': dark,
        },
        !name.disabled &&
          !name.status && {
            'transition-colors': true,
            'hover:bg-teal-100': !dark,
            'hover:bg-slate-700': dark,
          },
      )}
    >
      <div className="flex grow items-center gap-2">
        <_Color disbabled={name.disabled} status={name.status}>
          <Icon className={clsxm('w-8 h-8')} />
        </_Color>

        <div className="flex w-full flex-col gap-2">
          <span className="text-xs text-gray-400">Paso {index + 1}</span>
          <P
            className={clsxm(
              name.disabled &&
                !name.status && {
                  '!text-gray-400': !dark,
                  '!text-slate-700': dark,
                },
            )}
            bold={name.status}
          >
            {title}
          </P>
          <P
            className={clsxm(
              name.disabled &&
                !name.status && {
                  '!text-gray-400': !dark,
                  '!text-slate-700': dark,
                },
              'text-xs',
            )}
          >
            {summary}
          </P>
        </div>
      </div>
      <div className="flex h-full grow-0 flex-col items-center gap-1">
        <_Color disbabled={name.disabled} status={name.status}>
          <RightIcon className={clsxm('w-6 h-6')} />
        </_Color>

        {line && <Line active={name.status || !name.disabled} />}
      </div>
    </button>
  );

  // return (
  //   <ListTile
  //     onClick={() => !name.disabled && onClick(name)}
  //     className={clsxm(
  //       'items-start justify-center py-1',
  //       !name.disabled && 'cursor-pointer',
  //       !name.disabled &&
  //         !name.status &&
  //         (dark ? 'hover:bg-slate-700' : 'hover:bg-gray-200'),
  //       name.disabled && 'opacity-50',
  //       {
  //         'opacity-100': name.status,
  //         'bg-nebuia-primary-200': name.status && !dark,
  //         'bg-nebuia-primary-700': name.status && dark,
  //       },
  //     )}
  //     leading={
  //       <div
  //         className={clsxm(
  //           'flex flex-col items-center justify-start gap-2',
  //           // line && 'pt-4'
  //         )}
  //       >
  //         <NextImage width={30} height={30} src={deviceIcon} alt="Icon" />
  //         {line && <Line />}
  //       </div>
  //     }
  //     title={_getTitle(name.name)}
  //     subtitle={_getSummary(name.name)}
  //   />
  // );
};

export const NebuiaStepsInstructions: FC<InstructionsProps> = ({
  names,
  onStepClick,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {names.map((n, k) => {
        return (
          <Tile
            index={k}
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
      return 'Correo electrónico';
    case 'phone':
      return 'Teléfono celular';
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
      return 'Verificaremos tu correo electrónico via OTP';
    case 'phone':
      return 'Verificaremos tu número de teléfono via OTP';
    case 'liveness':
      return 'Analizaremos tu rostro para verificar que seas tú quien realice el procedimiento';
    case 'id':
      return 'Deberás proporcionar una identificación oficial como tu INE o pasaporte';
    case 'address':
      return 'Deberás proporcionar un comprobante de domicilio de no más de 3 meses';
    default:
      return '';
  }
}

const _getIcon = (name: CompleteStep['name'], completed: boolean) => {
  switch (name) {
    case 'email':
      return completed ? MdEmail : MdOutlineEmail;
    case 'phone':
      return completed ? MdSmartphone : MdOutlineSmartphone;
    case 'liveness':
      return completed ? MdFace6 : MdOutlineFace6;
    case 'id':
      return completed ? MdVerifiedUser : MdOutlineVerifiedUser;
    case 'address':
      return completed ? MdHome : MdOutlineHome;
  }
};
