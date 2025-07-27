import { useState } from "react";

export interface ColumnVisibilityConfig {
  [key: string]: boolean;
}

const STORAGE_KEY = "employee-table-column-visibility";

export const useColumnVisibility = (
  initialConfig: ColumnVisibilityConfig,
  storageKey: string = STORAGE_KEY
) => {
  const getInitialState = (): ColumnVisibilityConfig => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsedConfig = JSON.parse(stored) as ColumnVisibilityConfig;
        
        return { ...initialConfig, ...parsedConfig };
      }
    } catch (error) {
      console.warn("Failed to load column visibility from localStorage:", error);
    }

    return initialConfig;
  };

  const [visibleColumns, setVisibleColumns] = useState<ColumnVisibilityConfig>(getInitialState);

  const saveToStorage = (newConfig: ColumnVisibilityConfig) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(newConfig));
    } catch (error) {
      console.warn("Failed to save column visibility to localStorage:", error);
    }
  };

  const toggleColumn = (columnKey: string) => {
    setVisibleColumns(prev => {
      const newConfig = {
        ...prev,
        [columnKey]: !prev[columnKey]
      };
      saveToStorage(newConfig);

      return newConfig;
    });
  };

  const isColumnVisible = (columnKey: string): boolean => {
    return visibleColumns[columnKey] ?? true;
  };

  const resetToDefaults = () => {
    setVisibleColumns(initialConfig);
    saveToStorage(initialConfig);
  };

  return {
    visibleColumns,
    toggleColumn,
    isColumnVisible,
    resetToDefaults,
  };
};