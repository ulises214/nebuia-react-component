import { FC, PropsWithChildren } from 'react';

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className="container">{children}</div>;
};
