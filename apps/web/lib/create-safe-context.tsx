'use client';

import React, { createContext, useContext, type FC, type ReactNode } from 'react';

/**
 * Creates a safe context that can be used to provide and consume values in the React component tree.
 *
 * @param {string} errorMessage - The error message to throw if the context value is null.
 * @template ContextValue - The type of the context value.
 * @return {[(props: { value: ContextValue; children: React.ReactNode }) => JSX.Element, () => ContextValue]} - An array containing the Provider component and the useSafeContext hook.
 */
export const createSafeContext = <ContextValue,>(errorMessage: string) => {
  const Context = createContext<ContextValue | null>(null);

  const useSafeContext = (): ContextValue => {
    const ctx = useContext(Context);

    if (ctx === null) {
      throw new Error(errorMessage);
    }

    return ctx;
  };

  const Provider: FC<{ value: ContextValue; children: ReactNode }> = ({ children, value }) => (
    <Context.Provider value={value}>{children}</Context.Provider>
  );

  return [Provider, useSafeContext] as const;
};
