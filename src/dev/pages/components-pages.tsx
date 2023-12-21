/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import { Layout } from '../../common/presentation/components/layouts/Layout';
import { DropFileInput } from '../../common/presentation/components/molecules/inputs/DropFileInput';
import { ThemeProvider } from '../../theme/presentation/providers/ThemeProvider';

export const ComponentsPages = () => {
  const [file, setFile] = useState<File>();
  useEffect(() => {
    console.info(file);
  }, [file]);

  return (
    <ThemeProvider>
      <Layout>
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
      </Layout>
    </ThemeProvider>
  );
};
