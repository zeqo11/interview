import { FC, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
  Chip,
  IconButton,
  Button,
  TextField,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import type { Employee } from "@/types/Employee";
import type { Project } from "@/types/Project";

import { useEmployeeProjectDialog } from "./hooks/useEmployeeProjectDialog";
import { RowItem } from "@/types/RowItem";

interface Props {
  open: boolean;
  onClose: () => void;
  employee: Employee | null;
  doItAllOnce?: boolean;
}

const EmployeeProjectsDialog: FC<Props> = ({
  open,
  onClose,
  employee,
  doItAllOnce = false,
}) => {
  const [selectedProj, setSelectedProj] = useState<Project | null>(null);
  const [role, setRole] = useState("");

  const {
    rows,
    unassignedProjects,
    isLoading,
    queuedAdds,
    queuedDeletes,
    addPending,
    delPending,
    queueAdd,
    removeOrDelete,
    saveQueued,
  } = useEmployeeProjectDialog(employee, doItAllOnce);

  const handleAdd = () => {
    if (selectedProj && role.trim()) {
      queueAdd(selectedProj, role);
      setSelectedProj(null);
      setRole("");
    }
  };

  const handleSave = async () => {
    await saveQueued();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={doItAllOnce ? onClose : handleSave}
      keepMounted={false}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Projects of{" "}
        {employee ? `${employee.firstName} ${employee.lastName}` : ""}
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 2 }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Stack spacing={2}>
            {rows.length === 0 && (
              <Typography color="text.secondary">
                No projects assigned.
              </Typography>
            )}

            {rows.map((row: RowItem) => (
              <Stack
                key={row.id}
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Chip label={row.projectName} color="primary" size="small" />

                <Typography variant="body2" color="text.secondary" flexGrow={1}>
                  {row.role}
                </Typography>

                <IconButton
                  size="small"
                  aria-label="remove project"
                  onClick={() => removeOrDelete(row)}
                  disabled={delPending && !row.queued}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              pt={2}
              alignItems="flex-start"
            >
              <Autocomplete<Project>
                options={unassignedProjects}
                getOptionLabel={(o) => o.name}
                value={selectedProj}
                onChange={(_, v) => setSelectedProj(v)}
                sx={{ minWidth: 160, flex: 1 }}
                renderInput={(params) => (
                  <TextField {...params} label="Project" size="small" />
                )}
              />
              <TextField
                label="Role"
                size="small"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                sx={{ flex: 1 }}
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                disabled={
                  !selectedProj || !role.trim() || (addPending && !doItAllOnce)
                }
                onClick={handleAdd}
              >
                {addPending && !doItAllOnce ? (
                  <CircularProgress size={18} />
                ) : (
                  "Add"
                )}
              </Button>
            </Stack>
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        {doItAllOnce && (
          <Typography
            variant="caption"
            sx={{ mr: "auto", pl: 2 }}
            color="text.secondary"
          >
            Pending: +{queuedAdds.length} / −{queuedDeletes.length}
          </Typography>
        )}
        <Button onClick={onClose} disabled={addPending || delPending}>
          {doItAllOnce ? "Cancel" : "Close"}
        </Button>
        {doItAllOnce && (
          <Button
            variant="contained"
            onClick={() => void handleSave()}
            disabled={
              queuedAdds.length + queuedDeletes.length === 0 ||
              addPending ||
              delPending
            }
          >
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeProjectsDialog;
