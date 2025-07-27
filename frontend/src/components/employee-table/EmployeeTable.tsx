import { useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  CircularProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import PersonIcon from "@mui/icons-material/Person";
import type { Employee } from "@/types/Employee";
import Table, { Column } from "@/common/Table";
import { useEmployees } from "@/api/useEmployees";
import { formatDisplayName } from "@/utils/formatDisplayName";
import EmployeeProjectsDialog from "../employee-projects-dialog/EmployeeProjectsDialog";

const EmployeeTable = () => {
  const { data: employees, isLoading } = useEmployees();

  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const open = !!selectedEmp;
  const handleClose = () => setSelectedEmp(null);

  const columns: Column<Employee>[] = [
    {
      header: "Employee",
      cell: (e) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar>
            <PersonIcon />
          </Avatar>
          <Typography>
            {e.firstName} {e.lastName}
          </Typography>
        </Stack>
      ),
    },
    { header: "Birth Year", cell: (e) => e.birthYear, align: "center" },
    { header: "Department", cell: (e) => e.department },
    {
      header: "Office Location",
      cell: (e) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <RoomIcon fontSize="small" color="action" />
          <Typography>{e.officeLocation}</Typography>
        </Stack>
      ),
    },
    {
      header: "Start Date",
      cell: (e) => new Date(e.startDate).toLocaleDateString(),
      align: "center",
    },
    {
      header: "Remaining Leave",
      cell: (e) => e.remainingLeaves,
      align: "center",
    },
    {
      header: "Salary",
      cell: (e) =>
        `${e.salary.currency}${e.salary.amount.toLocaleString("tr-TR")}`,
      align: "right",
    },
    {
      header: "Dependents",
      align: "center",
      cell: (e) =>
        e.dependents.length ? (
          <AvatarGroup max={4} sx={{ justifyContent: "center" }}>
            {e.dependents.map((d) => (
              <Tooltip key={d.id} title={formatDisplayName(d)}>
                <Avatar>
                  {d.firstName[0]}
                  {d.lastName[0]}
                </Avatar>
              </Tooltip>
            ))}
          </AvatarGroup>
        ) : (
          <Typography variant="body2" color="text.secondary">
            —
          </Typography>
        ),
    },
    {
      header: "Projects",
      align: "center",
      cell: (e) => (
        <Button
          size="small"
          variant="outlined"
          onClick={() => setSelectedEmp(e)}
        >
          Manage Projects
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!employees) {
    return null;
  }

  return (
    <>
      <Table
        columns={columns}
        data={employees}
        rowKey={(e) => e.id}
        initialRowsPerPage={10}
      />

      {selectedEmp && (
        <EmployeeProjectsDialog
          open={open}
          onClose={handleClose}
          employee={selectedEmp}
          doItAllOnce={true}
        />
      )}
    </>
  );
};

export default EmployeeTable;
