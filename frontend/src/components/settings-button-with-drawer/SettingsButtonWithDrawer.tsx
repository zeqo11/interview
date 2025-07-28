import { useState } from "react";
import {
  Drawer,
  Typography,
  Switch,
  FormControlLabel,
  Box,
  Stack,
  IconButton,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useSettings } from "@/hooks/useSettings";

const SettingsButtonWithDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isBatchModeOn, onChangeBatchMode } = useSettings();

  const handleOpenDrawer = () => setIsOpen(true);
  const handleCloseDrawer = () => setIsOpen(false);

  return (
    <>
      <Tooltip title="Settings">
        <IconButton onClick={handleOpenDrawer} sx={{ color: "white" }}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={handleCloseDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: 350,
            p: 0,
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <SettingsIcon color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Settings
              </Typography>
            </Stack>
            <IconButton onClick={handleCloseDrawer} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider sx={{ mb: 3 }} />

          <Box>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Employee Project Management
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={isBatchModeOn}
                  onChange={(e) => onChangeBatchMode(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Batch Mode
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Queue changes and apply them all at once when editing
                    employee projects
                  </Typography>
                </Box>
              }
              sx={{ alignItems: "flex-start", mb: 2 }}
            />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default SettingsButtonWithDrawer;
