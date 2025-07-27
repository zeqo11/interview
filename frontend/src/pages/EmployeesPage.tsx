import {
  Container,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Paper,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "../hooks/useTheme";
import EmployeeTable from "../components/employee-table/EmployeeTable";

const EmployeesPage = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background: (theme) => theme.custom.gradients.primary,
          borderRadius: 2,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                color: "white",
                fontWeight: 700,
                mb: 1,
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Employee Overview
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              Manage your team and track employee information
            </Typography>
          </Box>
          <Tooltip
            title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
          >
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              {mode === "light" ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>

      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <EmployeeTable />
      </Box>
    </Container>
  );
};

export default EmployeesPage;
