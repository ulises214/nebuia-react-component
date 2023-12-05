import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../../common/presentation/components/atoms/buttons/Button';
import { Loader } from '../../common/presentation/components/atoms/Loader';
import { P } from '../../common/presentation/components/atoms/P';
import { H1 } from '../../common/presentation/components/atoms/titles/H1';
import {
  useCameraPermissions,
  useCheckCameraPermissions,
} from '../hooks/useCameraPermissions';
import { FaceStatePermissions } from '../store/state';
import { DenyPermissionsImage, SelfieImage } from './images/camera';

const Base: FC<{
  title: string;
  message: string;
  children?: JSX.Element;
  image: JSX.Element;
}> = ({ image, message, title, children }) => {
  return (
    <div className="flex flex-col  items-center gap-4">
      <figure className="my-10 text-nebuia-primary-500">{image}</figure>
      <H1>{title}</H1>
      <P className="max-w-sm text-center">{message}</P>
      {children}
    </div>
  );
};

const RequestsPermissions = () => {
  const { t } = useTranslation();
  const { loading, request } = useCameraPermissions();

  return (
    <Base
      image={<SelfieImage className="h-auto w-full max-w-[10rem]" />}
      title={t(`newFace.permissions.requesting.title`)}
      message={t(`newFace.permissions.requesting.message`)}
    >
      <Button isLoading={loading} variant="primary" onClick={request}>
        {t(`newFace.permissions.requesting.action`)}
      </Button>
    </Base>
  );
};
const DenyPermissions: FC<{ step: 'deny' | 'error' | 'notFound' }> = ({
  step,
}) => {
  const { t } = useTranslation();

  return (
    <Base
      title={t(`newFace.permissions.${step}.title`)}
      message={t(`newFace.permissions.${step}.message`)}
      image={<DenyPermissionsImage className="h-auto w-full max-w-[10rem]" />}
    ></Base>
  );
};

export const FaceIdle = () => {
  useCheckCameraPermissions();

  return (
    <div className="flex flex-col justify-center">
      <Loader />
    </div>
  );
};

export const FacePermissions: FC<{ state: FaceStatePermissions }> = ({
  state,
}) => {
  if (state.step === 'requesting') {
    return <RequestsPermissions />;
  }
  if (state.step === 'denied') {
    return <DenyPermissions step="deny" />;
  }
  if (state.step === 'error') {
    return <DenyPermissions step="error" />;
  }

  return <DenyPermissions step="notFound" />;
};
