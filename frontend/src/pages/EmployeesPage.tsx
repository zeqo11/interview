import { Container } from "@mui/material";
import EmployeeTable from "../components/employee-table/EmployeeTable";
import PageHeader from "../components/page-header/PageHeader";

const EmployeesPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageHeader />

      <EmployeeTable />
    </Container>
  );
};

export default EmployeesPage;
