import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { CustomThemeProvider } from "./contexts/ThemeContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import EmployeesPage from "./pages/EmployeesPage";

const App = () => {
  return (
    <CustomThemeProvider>
      <NotificationProvider>
        <QueryClientProvider client={queryClient}>
          <SettingsProvider>
            <EmployeesPage />
          </SettingsProvider>
        </QueryClientProvider>
      </NotificationProvider>
    </CustomThemeProvider>
  );
};

export default App;
