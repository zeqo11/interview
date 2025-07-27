import { FC, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

import type { Employee } from "@/types/Employee";
import type { Project } from "@/types/Project";

import { useEmployeeProjectDialog } from "./hooks/useEmployeeProjectDialog";
import { RowItem } from "@/types/RowItem";
import ProjectItem from "./ProjectItem";
import EmptyProjectsState from "./EmptyProjectsState";
import AddProjectForm from "./AddProjectForm";

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
      maxWidth="md"
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
            {rows.length === 0 && <EmptyProjectsState />}

            {rows.map((row: RowItem) => (
              <ProjectItem
                key={row.id}
                row={row}
                queuedAdds={queuedAdds}
                onRemove={removeOrDelete}
                delPending={delPending}
              />
            ))}

            <AddProjectForm
              unassignedProjects={unassignedProjects}
              selectedProj={selectedProj}
              role={role}
              addPending={addPending}
              doItAllOnce={doItAllOnce}
              onProjectChange={setSelectedProj}
              onRoleChange={setRole}
              onAdd={handleAdd}
            />
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
