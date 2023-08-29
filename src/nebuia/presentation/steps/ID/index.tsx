import { FC, useCallback, useState } from 'react';

import { IdCapture } from './IdCapture';
import { IdSelection } from './IdSelection';
import { IdUpload } from './IdUpload';
import { Documents, IdAction } from './types';

export const IDStep: FC = () => {
  const [docType, setDocType] = useState<keyof typeof Documents>();
  const [action, setAction] = useState<IdAction>('selection');
  const [frontalImage, setFrontalImage] = useState<string>();
  const [backImage, setBackImage] = useState<string>();

  const cancel = useCallback(() => {
    setDocType(undefined);
    setAction('selection');
    setFrontalImage(undefined);
    setBackImage(undefined);
  }, []);

  if (action === 'selection') {
    return (
      <IdSelection
        onSelect={setDocType}
        current={docType}
        setAction={setAction}
      />
    );
  }
  if (!docType) {
    return <></>;
  }

  if (action === 'capture') {
    return (
      <IdCapture
        current={docType}
        setAction={setAction}
        setBackImage={setBackImage}
        setFrontalImage={setFrontalImage}
        backImage={backImage}
        frontalImage={frontalImage}
      />
    );
  }

  return (
    <IdUpload
      doc={docType}
      cancel={cancel}
      images={
        (docType === 'ine'
          ? [frontalImage, backImage]
          : [frontalImage]) as string[]
      }
    />
  );
};
