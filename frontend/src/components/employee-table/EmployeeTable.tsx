import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  Chip,
  useTheme,
} from "@mui/material";
import {
  Room as RoomIcon,
  Work as WorkIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import type { Employee } from "@/types/Employee";
import Table, { Column } from "@/common/Table";
import { useEmployees } from "@/api/useEmployees";
import EmployeeProjectsDialog from "../employee-projects-dialog/EmployeeProjectsDialog";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
import ColumnConfigButton from "../column-config/ColumnConfigButton";
import { DependentsCell } from "@/components/employee-table/DependentsCell";

const initialColumnConfig = {
  birthYear: true,
  department: true,
  officeLocation: true,
  startDate: true,
  remainingLeave: true,
  salary: true,
  dependents: true,
};

const EmployeeTable = () => {
  const { data: employees, isLoading } = useEmployees();
  const theme = useTheme();

  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const open = !!selectedEmp;
  const handleClose = () => setSelectedEmp(null);

  const { toggleColumn, isColumnVisible } =
    useColumnVisibility(initialColumnConfig);

  const allColumns: (Column<Employee> & { columnKey?: string })[] = [
    {
      columnKey: "employee",
      header: "Employee",
      align: "left",
      cell: (e) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{
              background: theme.custom.gradients.primary,
              width: 48,
              height: 48,
              fontSize: "1.2rem",
              fontWeight: 600,
            }}
          >
            {e.firstName[0]}
            {e.lastName[0]}
          </Avatar>
          <Box>
            <Typography variant="body1" fontWeight={600}>
              {e.firstName} {e.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Employee ID: {e.id}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      columnKey: "birthYear",
      header: "Birth Year",
      cell: (e) => (
        <Chip
          label={e.birthYear}
          size="small"
          variant="outlined"
          sx={{ fontWeight: 500 }}
        />
      ),
    },
    {
      columnKey: "department",
      header: "Department",
      cell: (e) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <WorkIcon fontSize="small" color="primary" />
          <Typography fontWeight={500}>{e.department}</Typography>
        </Stack>
      ),
    },
    {
      columnKey: "officeLocation",
      header: "Office Location",
      cell: (e) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <RoomIcon fontSize="small" color="secondary" />
          <Typography>{e.officeLocation}</Typography>
        </Stack>
      ),
    },
    {
      columnKey: "startDate",
      header: "Start Date",
      cell: (e) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <CalendarIcon fontSize="small" color="action" />
          <Typography>{new Date(e.startDate).toLocaleDateString()}</Typography>
        </Stack>
      ),
    },
    {
      columnKey: "remainingLeave",
      header: "Remaining Leave",
      cell: (e) => (
        <Stack direction="row" display="flex" alignItems="center" spacing={1}>
          <Chip
            label={`${e.remainingLeaves} days`}
            size="small"
            color={
              e.remainingLeaves > 10
                ? "success"
                : e.remainingLeaves > 5
                ? "warning"
                : "error"
            }
            sx={{ fontWeight: 500 }}
          />
        </Stack>
      ),
    },
    {
      columnKey: "salary",
      header: "Salary",
      cell: (e) => (
        <Stack direction="row" display="flex" alignItems="center" spacing={1}>
          <Typography fontWeight={600} color="primary.main">
            {e.salary.currency}
            {e.salary.amount.toLocaleString("tr-TR")}
          </Typography>
        </Stack>
      ),
    },
    {
      columnKey: "dependents",
      header: "Dependents",
      align: "center",
      cell: (e) => <DependentsCell dependents={e.dependents} />,
    },
    {
      columnKey: "projects",
      header: "Projects",
      align: "right",
      cell: (e) => (
        <Button
          size="small"
          variant="contained"
          onClick={() => setSelectedEmp(e)}
        >
          Manage Projects
        </Button>
      ),
    },
  ];

  const columns = allColumns.filter((col, index) => {
    // first and last always visible
    if (index === 0 || index === allColumns.length - 1) {
      return true;
    }

    return col.columnKey ? isColumnVisible(col.columnKey) : true;
  });

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        py={8}
        sx={{
          background: theme.palette.background.paper,
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <CircularProgress
          size={48}
          sx={{
            color: theme.palette.primary.main,
            mb: 2,
          }}
        />
        <Typography variant="body2" color="text.secondary">
          Loading employee data...
        </Typography>
      </Box>
    );
  }

  if (!employees) {
    return null;
  }

  const configurableColumns = allColumns.slice(1, -1).map((col) => ({
    columnKey: col.columnKey!,
    header: col.header,
  }));

  return (
    <>
      <ColumnConfigButton
        configurableColumns={configurableColumns}
        isColumnVisible={isColumnVisible}
        onToggleColumn={toggleColumn}
      />

      <Table
        columns={columns}
        data={employees}
        rowKey={(e) => e.id}
        initialRowsPerPage={10}
      />

      <EmployeeProjectsDialog
        open={open}
        onClose={handleClose}
        employee={selectedEmp}
      />
    </>
  );
};

export default EmployeeTable;
