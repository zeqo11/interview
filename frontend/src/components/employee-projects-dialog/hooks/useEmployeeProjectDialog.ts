import { useReducer, useMemo, useCallback, useEffect } from "react";
import {
  useProjects,
  useEmployeeProjects,
  useAddEmployeeProject,
  useDeleteEmployeeProject,
} from "@/api/useProjects";
import type { Employee } from "@/types/Employee";
import { generateTempId } from "@/utils/generateTempId";
import { queueReducer, initialState } from "../queueReducer";
import { getAssigned, getAssignedIds, buildRows } from "../selectors";
import { RowItem } from "@/types/RowItem";
import { Project } from "@/types/Project";
import { useNotification } from "@/hooks/useNotification";

export const useEmployeeProjectDialog = (
  employee: Employee | null,
  doItAllOnce = false
) => {
  const [state, dispatch] = useReducer(queueReducer, initialState);
  const { showSuccess, showError } = useNotification();

  const { data: projects = [], isLoading: projLoading } = useProjects();
  const { data: employeeProjects = [], isLoading: epLoading } =
    useEmployeeProjects();

  const isLoading = projLoading || epLoading;
  const employeeId = employee?.id ?? "";

  const addMutation = useAddEmployeeProject();
  const delMutation = useDeleteEmployeeProject();

  const assigned = useMemo(
    () => getAssigned(employeeId, employeeProjects),
    [employeeId, employeeProjects]
  );

  const assignedIds = useMemo(
    () => getAssignedIds(assigned, state.queuedAdds),
    [assigned, state.queuedAdds]
  );

  const unassignedProjects = useMemo(
    () => projects.filter((p) => !assignedIds.has(p.id)),
    [projects, assignedIds]
  );

  const projectNameById = useMemo(
    () => new Map(projects.map((p) => [p.id, p.name])),
    [projects]
  );

  const rows = useMemo(
    () =>
      buildRows(
        assigned,
        state.queuedAdds,
        state.queuedDeletes,
        projectNameById
      ),
    [assigned, state.queuedAdds, state.queuedDeletes, projectNameById]
  );

  const queueAdd = useCallback(
    (project: Project, role: string) => {
      if (!employee) {
        return;
      }

      const projectId = project.id;

      if (assignedIds.has(projectId)) {
        return;
      }

      const cleanRole = role.trim();

      if (doItAllOnce) {
        dispatch({
          type: "queueAdd",
          payload: {
            tmpId: generateTempId(),
            employeeId: employee.id,
            projectId,
            role: cleanRole,
          },
        });
      } else {
        addMutation.mutate({
          employeeId: employee.id,
          projectId,
          role: cleanRole,
        });
      }
    },
    [employee, doItAllOnce, addMutation, assignedIds]
  );

  const removeOrDelete = useCallback(
    (row: RowItem) => {
      if (row.queued) {
        dispatch({ type: "removeQueuedAdd", tmpId: row.id });
      } else if (doItAllOnce) {
        dispatch({ type: "toggleDelete", id: row.id });
      } else {
        delMutation.mutate(row.id);
      }
    },
    [dispatch, doItAllOnce, delMutation]
  );

  const { queuedAdds, queuedDeletes } = state;

  const saveQueued = useCallback(async () => {
    if (!doItAllOnce) return;
    try {
      await Promise.all([
        ...queuedAdds.map((q) =>
          addMutation.mutateAsync({
            employeeId: q.employeeId,
            projectId: q.projectId,
            role: q.role,
          })
        ),
        ...queuedDeletes.map((id) => delMutation.mutateAsync(id)),
      ]);
      
      const addCount = queuedAdds.length;
      const deleteCount = queuedDeletes.length;
      
      if (addCount > 0 && deleteCount > 0) {
        showSuccess(`Successfully added ${addCount} and removed ${deleteCount} project assignments`);
      } else if (addCount > 0) {
        showSuccess(`Successfully added ${addCount} project assignment${addCount > 1 ? 's' : ''}`);
      } else if (deleteCount > 0) {
        showSuccess(`Successfully removed ${deleteCount} project assignment${deleteCount > 1 ? 's' : ''}`);
      }
    } catch (error) {
      showError('Failed to save project assignments. Please try again.');
      throw error;
    } finally {
      dispatch({ type: "reset" });
    }
  }, [doItAllOnce, queuedAdds, queuedDeletes, addMutation, delMutation, showSuccess, showError]);

  useEffect(() => {
    dispatch({ type: "reset" });
  }, [employeeId, doItAllOnce]);

  return {
    rows,
    unassignedProjects,
    isLoading,
    addPending: addMutation.isPending,
    delPending: delMutation.isPending,
    queuedAdds,
    queuedDeletes,
    queueAdd,
    removeOrDelete,
    saveQueued,
  };
};
