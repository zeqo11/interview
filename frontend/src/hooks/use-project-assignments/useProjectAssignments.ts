import { useEffect, useReducer } from "react";
import {
  useProjects,
  useEmployeeProjects,
  useAddEmployeeProject,
  useDeleteEmployeeProject,
} from "@/api/useProjects";
import type { Employee } from "@/types/Employee";
import { generateTempId } from "@/utils/generateTempId";
import { queueReducer, initialState } from "./queueReducer";
import { getAssigned, getAssignedIds, buildRows } from "./selectors";
import { RowItem } from "@/types/RowItem";
import { Project } from "@/types/Project";
import { useNotification } from "@/hooks/useNotification";
import { useSettings } from "@/hooks/useSettings";
import { getNotificationMessage } from "@/utils/getNotificationMessage";

export const useProjectAssignments = (employee: Employee | null) => {
  const [state, dispatch] = useReducer(queueReducer, initialState);
  const { showSuccess, showError } = useNotification();
  const { isBatchModeOn } = useSettings();

  const { data: projects = [], isLoading: projLoading } = useProjects();
  const { data: employeeProjects = [], isLoading: epLoading } =
    useEmployeeProjects();

  const isLoading = projLoading || epLoading;
  const employeeId = employee?.id ?? "";

  const addEmployeeProjectMutation = useAddEmployeeProject();
  const deleteEmployeeProjectMutation = useDeleteEmployeeProject();

  const assigned = getAssigned(employeeId, employeeProjects);
  const assignedIds = getAssignedIds(assigned, state.queuedAdditions);
  const unassignedProjects = projects.filter((p) => !assignedIds.has(p.id));
  const projectNameById = new Map(projects.map((p) => [p.id, p.name]));

  const rows = buildRows(
    assigned,
    state.queuedAdditions,
    state.queuedDeletions,
    projectNameById
  );

  const handleAddProjectToQueue = (project: Project, role: string) => {
    if (!employee) {
      return;
    }

    const projectId = project.id;

    if (assignedIds.has(projectId)) {
      return;
    }

    const cleanRole = role.trim();

    if (isBatchModeOn) {
      dispatch({
        type: "addProjectToQueue",
        payload: {
          tmpId: generateTempId(),
          employeeId: employee.id,
          projectId,
          role: cleanRole,
        },
      });
    } else {
      try {
        addEmployeeProjectMutation.mutate({
          employeeId: employee.id,
          projectId,
          role: cleanRole,
        });

        showSuccess("Project assigned successfully.");
      } catch (error) {
        showError("An unexpected error occurred.");
        throw error;
      }
    }
  };

  const handleRemoveOrEdit = (row: RowItem) => {
    if (row.queued) {
      dispatch({ type: "removeQueuedProject", tmpId: row.id });
    } else if (isBatchModeOn) {
      dispatch({ type: "toggleDelete", id: row.id });
    } else {
      try {
        deleteEmployeeProjectMutation.mutate(row.id);
        showSuccess("Project unassigned successfully.");
      } catch (error) {
        showError("An unexpected error occurred.");
        throw error;
      }
    }
  };

  const { queuedAdditions, queuedDeletions } = state;

  const handleSaveQueued = async () => {
    if (!isBatchModeOn) {
      return;
    }

    try {
      await Promise.all([
        ...queuedAdditions.map((q) =>
          addEmployeeProjectMutation.mutateAsync({
            employeeId: q.employeeId,
            projectId: q.projectId,
            role: q.role,
          })
        ),
        ...queuedDeletions.map((id) =>
          deleteEmployeeProjectMutation.mutateAsync(id)
        ),
      ]);

      const message = getNotificationMessage(
        queuedAdditions.length,
        queuedDeletions.length
      );

      if (message) {
        showSuccess(message);
      }
    } catch (error) {
      showError("Failed to save project assignments. Please try again.");
      throw error;
    } finally {
      dispatch({ type: "reset" });
    }
  };

  useEffect(() => {
    dispatch({ type: "reset" });
  }, [employeeId, isBatchModeOn]);

  return {
    rows,
    unassignedProjects,
    isLoading,
    isAdditionPending: addEmployeeProjectMutation.isPending,
    isDeletionPending: deleteEmployeeProjectMutation.isPending,
    queuedAdditions,
    queuedDeletions,
    onAddProjectToQueue: handleAddProjectToQueue,
    onRemoveOrDelete: handleRemoveOrEdit,
    onSaveQueued: handleSaveQueued,
  };
};
