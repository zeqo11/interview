import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { CustomThemeProvider } from "./contexts/ThemeContext";
import EmployeesPage from "./pages/EmployeesPage";

const App = () => {
  return (
    <CustomThemeProvider>
      <QueryClientProvider client={queryClient}>
        <EmployeesPage />
      </QueryClientProvider>
    </CustomThemeProvider>
  );
};

export default App;
