import { FC } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import type { Theme } from "@mui/material/styles";
import type { Project } from "@/types/Project";
import { useSettings } from "@/hooks/useSettings";

interface AddProjectFormProps {
  unassignedProjects: Project[];
  selectedProject: Project | null;
  role: string;
  isAdditionPending: boolean;
  onProjectChange: (project: Project | null) => void;
  onRoleChange: (role: string) => void;
  onAdd: () => void;
}

const AddProjectForm: FC<AddProjectFormProps> = ({
  unassignedProjects,
  selectedProject,
  role,
  isAdditionPending,
  onProjectChange,
  onRoleChange,
  onAdd,
}) => {
  const { isBatchModeOn } = useSettings();
  const isAddButtonDisabled = !selectedProject || !role.trim() || (isAdditionPending && !isBatchModeOn)
  
  return (
    <Box
      sx={{
        mt: 3,
        p: 2,
        border: "2px dashed",
        borderColor: "primary.light",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="subtitle2"
        color="primary.main"
        mb={2}
        fontWeight={600}
      >
        Add New Project Assignment
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="flex-start"
      >
        <Autocomplete<Project>
          options={unassignedProjects}
          getOptionLabel={(o) => o.name}
          value={selectedProject}
          onChange={(_, v) => onProjectChange(v)}
          sx={{ minWidth: 200, flex: 1 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Project"
              size="small"
              variant="outlined"
            />
          )}
        />
        <TextField
          label="Employee Role"
          size="small"
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
          sx={{ minWidth: 160, flex: 1 }}
          variant="outlined"
          placeholder="e.g. Developer, Manager, Designer"
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          disabled={isAddButtonDisabled}
          onClick={onAdd}
          size="small"
          sx={{
            background: (theme: Theme) => theme.custom.gradients.primary,
            "&:disabled": {
              background: (theme: Theme) => theme.palette.action.disabledBackground,
            },
          }}
        >
          {isAdditionPending && !isBatchModeOn ? (
            <CircularProgress size={18} />
          ) : (
            "Add"
          )}
        </Button>
      </Stack>
    </Box>
  );
};

export default AddProjectForm;
