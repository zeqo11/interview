import { createContext, useState, ReactNode } from 'react';

interface SettingsContextType {
  isBatchModeOn: boolean;
  onChangeBatchMode: (value: boolean) => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [isBatchModeOn, setIsBatchModeOn] = useState(true);

  return (
    <SettingsContext.Provider value={{ isBatchModeOn, onChangeBatchMode: setIsBatchModeOn }}>
      {children}
    </SettingsContext.Provider>
  );
};