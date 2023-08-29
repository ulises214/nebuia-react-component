import { useTranslation } from 'react-i18next';

import { Loader } from '../../../../common/presentation/components/atoms/Loader';
import { Alert } from '../../../../common/presentation/components/molecules/Alert';
import { useGetReport } from '../../hooks/UseGetReport';
import { DetailsContent } from './Content';

export const FinishDetailsPage = () => {
  const { t } = useTranslation();
  const [isLoading, error, result] = useGetReport();

  return (
    <div className="flex flex-col items-center space-y-4">
      {isLoading && <Loader />}
      {error && (
        <Alert
          title={t('pages.details.error.title')}
          message={t('pages.details.error.description')}
          variant="error"
        />
      )}
      {result && <DetailsContent result={result} />}
    </div>
  );
};
