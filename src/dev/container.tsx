import { FC, PropsWithChildren } from 'react';

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="container flex h-full w-full items-center justify-center">
      {children}
    </div>
  );
};
