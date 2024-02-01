/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import { DropFileInput } from '../../common/presentation/components/molecules/inputs/DropFileInput';

export const ComponentsPages = () => {
  const [file, setFile] = useState<File>();
  useEffect(() => {
    console.info(file);
  }, [file]);

  return (
    <DropFileInput
      type={['img']}
      id={`upload-`}
      label={'Busco no vendo'}
      onFileChange={(file) => {
        if (!file) {
          return;
        }
        setFile(file);
      }}
    />
  );
};
