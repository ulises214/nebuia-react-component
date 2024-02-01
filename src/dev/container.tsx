import { FC, PropsWithChildren } from 'react';

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="container flex size-full items-center justify-center">
      {children}
    </div>
  );
};
