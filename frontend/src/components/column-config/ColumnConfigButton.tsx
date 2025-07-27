import { useState } from "react";
import {
  Box,
  Button,
  Popover,
  FormControlLabel,
  Checkbox,
  Paper,
  Typography,
} from "@mui/material";
import { Settings as SettingsIcon } from "@mui/icons-material";

export interface ConfigurableColumn {
  key: string;
  header: string;
}

interface ColumnConfigButtonProps {
  configurableColumns: ConfigurableColumn[];
  isColumnVisible: (columnKey: string) => boolean;
  onToggleColumn: (columnKey: string) => void;
}

const ColumnConfigButton = ({
  configurableColumns,
  isColumnVisible,
  onToggleColumn,
}: ColumnConfigButtonProps) => {
  const [configAnchorEl, setConfigAnchorEl] = useState<HTMLButtonElement | null>(null);
  const configOpen = Boolean(configAnchorEl);

  const handleConfigClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setConfigAnchorEl(event.currentTarget);
  };

  const handleConfigClose = () => {
    setConfigAnchorEl(null);
  };

  return (
    <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
      <Button
        onClick={handleConfigClick}
        startIcon={<SettingsIcon />}
        variant="contained"
        size="small"
        sx={{
          textTransform: "none",
          borderRadius: 1,
        }}
      >
        Configure Columns
      </Button>

      <Popover
        open={configOpen}
        anchorEl={configAnchorEl}
        onClose={handleConfigClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Paper sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Configure Columns
          </Typography>
          {configurableColumns.map((col) => (
            <FormControlLabel
              key={col.key}
              control={
                <Checkbox
                  checked={isColumnVisible(col.key)}
                  onChange={() => onToggleColumn(col.key)}
                  size="small"
                />
              }
              label={col.header}
              sx={{ display: "block", mb: 0.5 }}
            />
          ))}
        </Paper>
      </Popover>
    </Box>
  );
};

export default ColumnConfigButton;