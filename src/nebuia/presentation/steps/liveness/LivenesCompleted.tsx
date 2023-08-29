import { useTranslation } from 'react-i18next';

import { Loader } from '../../../../common/presentation/components/atoms/Loader';
import { Alert } from '../../../../common/presentation/components/molecules/Alert';
import { useReportLivenessFace } from '../../hooks/UseReportLivenesFace';

export const LivenessCompleted = () => {
  const { t } = useTranslation();
  const [isLoading, error, image] = useReportLivenessFace();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert
        variant="error"
        title={t('errors.noLivenessFace')}
        message={error}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <picture>
        <img
          src={image}
          alt=""
          className="mx-auto w-full max-w-[18rem] rounded-full border border-solid border-emerald-500"
        />
      </picture>
      <Alert
        title={t('pages.livenessSuccess.title')}
        message={t('pages.livenessSuccess.description')}
        variant="success"
      />
    </div>
  );
};
