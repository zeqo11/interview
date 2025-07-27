import { Container } from "@mui/material";
import EmployeeTable from "../components/employee-table/EmployeeTable";
import PageHeader from "../components/page-header/PageHeader";
import SettingsButtonWithDrawer from "@/components/settings-button-with-drawer/SettingsButtonWithDrawer";

const EmployeesPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageHeader />

      <SettingsButtonWithDrawer />

      <EmployeeTable />
    </Container>
  );
};

export default EmployeesPage;
