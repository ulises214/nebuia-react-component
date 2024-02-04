import { Loader } from '@components/atoms/Loader';
import { P } from '@components/atoms/P';
import { H1 } from '@components/atoms/titles/H1';
import { Alert } from '@components/molecules/Alert';
import {
  useCreditsCompanyContext,
  useCreditsStepContext,
} from '@nebuia-services/credits/context/credits-context';
import { NebuiaCompany } from '@nebuia-ts/models';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { HAPPY_GIRL_JUMPING } from '../../../../../common/presentation/constants/HappyGirlJumping';
import { useControlButton } from '../../../../../common/presentation/hooks/UseControlButton';
import { useNebuiaSdk } from '../../../../../nebuia/presentation/hooks/UseRepository';

type Status =
  | { loading: true }
  | { error: string }
  | { success: NebuiaCompany };
export const WelcomeCreditEnrollment = () => {
  const sdk = useNebuiaSdk();
  const { onNextStep } = useCreditsStepContext();
  const { setCompany } = useCreditsCompanyContext();
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>({ loading: true });

  useEffect(() => {
    if ('success' in status) {
      setCompany(status.success);
    }
  }, [setCompany, status]);

  useEffect(() => {
    void init();
    async function init() {
      const response = await sdk.getCompany();
      if (response.status) {
        setStatus({ success: response.payload });
      } else {
        setStatus({
          success: {
            id: '659444bda5383d25f13998f9',
            name: 'WalleLab',
            ip: '127.0.0.0',
            origin: 'localhost',
            steps: ['email', 'phone', 'liveness', 'address', 'id'],
            keys: {
              public_key: '19PKXH7-087CHR8-21DFA5J-3R991EZ',
              secret_key: '5369f627-1076-4708-82d7-a8b2f09485df',
            },
            settings: {
              image: 'logo_WalleLab.jpg',
              primary_color: '#a108e7',
              secondary_color: '#402154',
              credit: {
                domain: 'wallelab',
                platform_name: 'Creditos Walle',
                collaborator_document_config: [
                  {
                    document_name: 'Compronte de ingresos',
                    document_type: 'Image',
                  },
                  {
                    document_name: 'Titulo universitario',
                    document_type: 'Image',
                  },
                ],
              },
            },
            otp: {
              secret: 'IWRZXWA3PEYAUZE76ZWFQGBGPE',
            },
            admin: '65944490a5383d25f13998f8',
          },
        });
      }
    }
  }, [sdk]);

  useControlButton({
    action: onNextStep,
    label: t('pages.genericWelcome.startButton'),
    side: 'next',
    active: 'success' in status,
  });

  if ('loading' in status) {
    return <Loader />;
  }
  if ('error' in status) {
    return <Alert variant="error" message={status.error} />;
  }

  return (
    <div className="flex flex-col items-center">
      <figure>
        <img src={HAPPY_GIRL_JUMPING} alt="" className="w-full max-w-[27rem]" />
      </figure>
      <H1>{t('services.credit.instructions.title')}</H1>
      <P className="text-center">{t('services.credit.instructions.message')}</P>
    </div>
  );
};
