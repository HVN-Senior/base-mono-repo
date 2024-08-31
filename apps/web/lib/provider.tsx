'use client';

import React, { memo } from 'react';
import { QueryClient, QueryClientProvider, type DefaultOptions } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type FCC } from '@ui/types';

import { ThemeProvider } from '@/lib/theme-provider';

interface Props {}

const queryOption: DefaultOptions['queries'] = {
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  retry: false,
};

const queryClient = new QueryClient({ defaultOptions: { queries: queryOption } });

const Provider: FCC<Props> = ({ children }) => {
  const [_queryClient] = React.useState(() => queryClient);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
      <QueryClientProvider client={_queryClient}>
        {children}
        <ReactQueryDevtools buttonPosition="bottom-left" />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default memo(Provider);
