import { SettingsContext } from "@/contexts/SettingsContext";
import { useContext } from "react";

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  
  return context;
};