import {
  Typography,
  Box,
  IconButton,
  Tooltip,
  Paper,
  Stack,
} from "@mui/material";
import { Brightness4, LightMode } from "@mui/icons-material";
import { useTheme } from "../../hooks/useTheme";
import SettingsButtonWithDrawer from "../settings-button-with-drawer/SettingsButtonWithDrawer";

const PageHeader = () => {
  const { mode, toggleTheme } = useTheme();

  return (
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
        <Stack direction="row" spacing={1}>
          <SettingsButtonWithDrawer />

          <Tooltip
            title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
          >
            <IconButton onClick={toggleTheme} sx={{ color: "white" }}>
              {mode === "light" ? <Brightness4 /> : <LightMode />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </Paper>
  );
};

export default PageHeader;
