import { useCallback, useState } from 'react';

import { DocumentCapture } from '../../../../common/presentation/components/molecules/DocumentCapture';
import { useAnaliceAddress } from '../../hooks/UseAnaliceAddress';
import { AddressList } from './AddressList';
import { HomeImage } from './images';

export const AddressStep = () => {
  const [file, setFile] = useState<File>();

  const [isLoading, error, address] = useAnaliceAddress({
    image: file,
  });

  const onRetryProcess = useCallback(() => {
    setFile(undefined);
  }, []);

  if (address?.address?.length) {
    return <AddressList address={address} onRetryProcess={onRetryProcess} />;
  }

  return (
    <div className="h-full pt-8">
      <DocumentCapture
        errorMessageKey="pages.address.error.description"
        errorTitleKey="pages.address.error.title"
        image={HomeImage}
        inputLabelKey="pages.address.instructions.inputLabel"
        isLoading={isLoading}
        messageKey="pages.address.instructions.message"
        titleKey="pages.address.instructions.title"
        onLoad={(file) => setFile(file)}
        type={['img', 'pdf']}
        error={!!error}
      />
    </div>
  );
};
