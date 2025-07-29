import { FC, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import type { Employee } from "@/types/Employee";
import type { Project } from "@/types/Project";
import { RowItem } from "@/types/RowItem";
import ProjectItem from "./ProjectItem";
import EmptyProjectsState from "./EmptyProjectsState";
import AddProjectForm from "./AddProjectForm";
import { useProjectAssignments } from "@/hooks/use-project-assignments/useProjectAssignments";
import { useSettings } from "@/hooks/useSettings";
import ProjectsSkeleton from "@/components/skeletons/ProjectsSkeleton";

interface Props {
  open: boolean;
  employee: Employee | null;
  onClose: () => void;
}

const EmployeeProjectsDialog: FC<Props> = ({ open, employee, onClose }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [role, setRole] = useState("");
  const { isBatchModeOn } = useSettings();

  const {
    rows,
    unassignedProjects,
    isLoading,
    queuedAdditions,
    queuedDeletions,
    isAdditionPending,
    isDeletionPending,
    onAddProjectToQueue,
    onRemoveOrDelete,
    onSaveQueued,
  } = useProjectAssignments(employee);

  const handleAddProject = () => {
    if (selectedProject && role.trim()) {
      onAddProjectToQueue(selectedProject, role);
      setSelectedProject(null);
      setRole("");
    }
  };

  const handleSaveAssignments = async () => {
    await onSaveQueued();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={isBatchModeOn ? onClose : handleSaveAssignments}
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
          <ProjectsSkeleton items={5} />
        ) : (
          <Stack spacing={2}>
            {rows.length === 0 && <EmptyProjectsState />}

            {rows.map((row: RowItem) => (
              <ProjectItem
                key={row.id}
                row={row}
                queuedAdds={queuedAdditions}
                onRemove={onRemoveOrDelete}
                delPending={isDeletionPending}
              />
            ))}

            <AddProjectForm
              unassignedProjects={unassignedProjects}
              selectedProject={selectedProject}
              role={role}
              isAdditionPending={isAdditionPending}
              onProjectChange={setSelectedProject}
              onRoleChange={setRole}
              onAdd={handleAddProject}
            />
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        {isBatchModeOn && (
          <Typography
            variant="caption"
            sx={{ mr: "auto", pl: 2 }}
            color="text.secondary"
          >
            Pending: +{queuedAdditions.length} / −{queuedDeletions.length}
          </Typography>
        )}

        <Button onClick={onClose} disabled={isAdditionPending || isDeletionPending}>
          {isBatchModeOn ? "Cancel" : "Close"}
        </Button>

        {isBatchModeOn && (
          <Button
            variant="contained"
            onClick={() => void handleSaveAssignments()}
            disabled={
              queuedAdditions.length + queuedDeletions.length === 0 ||
              isAdditionPending ||
              isDeletionPending
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
