import { FC } from 'react';
import { BiErrorCircle, BiHelpCircle } from 'react-icons/bi';
import { MdDone, MdOutlineDeviceUnknown } from 'react-icons/md';

import { IconButton } from '../../../components/atoms/buttons/IconButton';
import { useNebuiaThemeContext } from '../../context/NebuiaThemeContext';
import { LoaderIndicator } from '../atoms';
import { ListTile } from './ListTile';

export enum PermissionsCamera {
  WAITING,
  REJECT,
  NO_CAMERA,
  DONE,
}
type PermissionsProps = {
  permission: PermissionsCamera;
};
const State: FC<PermissionsProps> = ({ permission }) => {
  if (permission === PermissionsCamera.WAITING) {
    return <LoaderIndicator size="s30" />;
  }
  if (permission === PermissionsCamera.REJECT) {
    return <BiErrorCircle className="text-red-500 " size="35px" />;
  }
  if (permission === PermissionsCamera.NO_CAMERA) {
    return <MdOutlineDeviceUnknown className="text-black " size="35px" />;
  }

  return <MdDone className="text-primary-500" size="35px" />;
};
const getTitle = (permission: PermissionsCamera): string => {
  switch (permission) {
    case PermissionsCamera.WAITING:
      return 'Solicitando Permisos';
    case PermissionsCamera.REJECT:
      return 'Permiso denegado';
    case PermissionsCamera.NO_CAMERA:
      return 'Sin cámara disponible';
    case PermissionsCamera.DONE:
      return 'Permiso completo';
    default:
      return 'Unknown';
  }
};
const getSubtitle = (permissionsCamera: PermissionsCamera): string => {
  if (permissionsCamera === PermissionsCamera.WAITING) {
    return 'Por favor permite el uso de la cámara';
  }
  if (permissionsCamera === PermissionsCamera.REJECT) {
    return 'No es posible acceder a tu cámara, por favor habilita el permiso.';
  }
  if (permissionsCamera === PermissionsCamera.NO_CAMERA) {
    return 'No cuentas con un dispositivo para poder realizar esta prueba.';
  }

  return 'Coloca tu rostro en el centro del circulo';
};
export const Permissions: FC<PermissionsProps> = ({ permission }) => {
  const { theme } = useNebuiaThemeContext();

  return (
    <div className="rounded-sm border border-gray-400">
      <ListTile
        leading={<State permission={permission} />}
        title={getTitle(permission)}
        subtitle={getSubtitle(permission)}
        trailing={
          <IconButton>
            <BiHelpCircle color={theme.text} />
          </IconButton>
        }
      />
    </div>
  );
};
