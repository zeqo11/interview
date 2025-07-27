import { createContext, useState, ReactNode } from 'react';

interface SettingsContextType {
  doItAllOnce: boolean;
  setDoItAllOnce: (value: boolean) => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [doItAllOnce, setDoItAllOnce] = useState(true);

  return (
    <SettingsContext.Provider value={{ doItAllOnce, setDoItAllOnce }}>
      {children}
    </SettingsContext.Provider>
  );
};