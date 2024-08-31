import React from 'react';
import { TailwindIndicator } from '@ui/components';
import { type FCC } from '@ui/types';

const MainLayout: FCC = ({ children }) => {
  return (
    <>
      <main className="min-h-screen">{children}</main>
      <TailwindIndicator isProduction={false} />
    </>
  );
};

export default MainLayout;
