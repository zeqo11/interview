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
import { formatDisplayName } from "@/utils/formatDisplayName";
import EmployeeProjectsDialog from "../employee-projects-dialog/EmployeeProjectsDialog";
import { useSettings } from "@/hooks/useSettings";

const EmployeeTable = () => {
  const { data: employees, isLoading } = useEmployees();
  const { doItAllOnce } = useSettings();
  const theme = useTheme();

  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const open = !!selectedEmp;
  const handleClose = () => setSelectedEmp(null);

  const columns: Column<Employee>[] = [
    {
      header: "Employee",
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
      header: "Birth Year",
      cell: (e) => (
        <Chip
          label={e.birthYear}
          size="small"
          variant="outlined"
          sx={{ fontWeight: 500 }}
        />
      ),
      align: "center",
    },
    {
      header: "Department",
      cell: (e) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <WorkIcon fontSize="small" color="primary" />
          <Typography fontWeight={500}>{e.department}</Typography>
        </Stack>
      ),
    },
    {
      header: "Office Location",
      cell: (e) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <RoomIcon fontSize="small" color="secondary" />
          <Typography>{e.officeLocation}</Typography>
        </Stack>
      ),
    },
    {
      header: "Start Date",
      cell: (e) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <CalendarIcon fontSize="small" color="action" />
          <Typography>{new Date(e.startDate).toLocaleDateString()}</Typography>
        </Stack>
      ),
      align: "center",
    },
    {
      header: "Remaining Leave",
      cell: (e) => (
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
      ),
      align: "center",
    },
    {
      header: "Salary",
      cell: (e) => (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          justifyContent="flex-end"
        >
          <Typography fontWeight={600} color="primary.main">
            {e.salary.currency}
            {e.salary.amount.toLocaleString("tr-TR")}
          </Typography>
        </Stack>
      ),
      align: "right",
    },
    {
      header: "Dependents",
      align: "center",
      cell: (e) =>
        e.dependents.length ? (
          <AvatarGroup max={4}>
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
          <Chip
            label="No dependents"
            size="small"
            variant="outlined"
            color="default"
          />
        ),
    },
    {
      header: "Projects",
      align: "center",
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
          doItAllOnce={doItAllOnce}
        />
      )}
    </>
  );
};

export default EmployeeTable;
