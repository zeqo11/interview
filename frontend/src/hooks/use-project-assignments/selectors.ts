import type { EmployeeProject } from "@/types/EmployeeProject";
import type { QueueState } from "./queueReducer";
import { RowItem } from "@/types/RowItem";

export const getAssigned = (
  employeeId: string,
  employeeProjects: EmployeeProject[]
) => employeeProjects.filter((ep) => ep.employeeId === employeeId);

export const getAssignedIds = (
  assigned: EmployeeProject[],
  queuedAdditions: QueueState["queuedAdditions"]
) => {
  const set = new Set<string>();
  assigned.forEach((a) => set.add(a.projectId));
  queuedAdditions.forEach((q) => set.add(q.projectId));

  return set;
};

export const buildRows = (
  assigned: EmployeeProject[],
  queuedAdditions: QueueState["queuedAdditions"],
  queuedDeletions: string[],
  projectNameById: Map<string, string>
): RowItem[] => [
  ...assigned.map<RowItem>((p) => ({
    id: p.id,
    projectId: p.projectId,
    projectName: projectNameById.get(p.projectId) ?? "Unknown",
    role: p.role,
    queued: false,
    isDeleted: queuedDeletions.includes(p.id),
  })),
  ...queuedAdditions.map<RowItem>((q) => ({
    id: q.tmpId,
    projectId: q.projectId,
    projectName: projectNameById.get(q.projectId) ?? "Unknown",
    role: q.role,
    queued: true,
    isDeleted: false,
  })),
];
