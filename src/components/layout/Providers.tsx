'use client';

import { createContext, useContext, ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

const ProvidersContext = createContext<{ isReady: boolean }>({ isReady: false });

export function Providers({ children }: ProvidersProps) {
  return <ProvidersContext.Provider value={{ isReady: true }}>{children}</ProvidersContext.Provider>;
}

export function useProviders() {
  return useContext(ProvidersContext);
}