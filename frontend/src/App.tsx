import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { CustomThemeProvider } from "./contexts/ThemeContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import EmployeesPage from "./pages/EmployeesPage";

const App = () => {
  return (
    <CustomThemeProvider>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider>
          <EmployeesPage />
        </SettingsProvider>
      </QueryClientProvider>
    </CustomThemeProvider>
  );
};

export default App;
