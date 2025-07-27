import type { EmployeeProject } from "@/types/EmployeeProject";
import type { QueueState } from "./queueReducer";
import { RowItem } from "@/types/RowItem";

export const getAssigned = (
  employeeId: string,
  employeeProjects: EmployeeProject[],
) =>
  employeeProjects.filter(
    (ep) => ep.employeeId === employeeId
  );

export const getAssignedIds = (
  assigned: EmployeeProject[],
  queuedAdds: QueueState["queuedAdds"]
) => {
  const set = new Set<string>();
  assigned.forEach((a) => set.add(a.projectId));
  queuedAdds.forEach((q) => set.add(q.projectId));
  
  return set;
};

export const buildRows = (
  assigned: EmployeeProject[],
  queuedAdds: QueueState["queuedAdds"],
  queuedDeletes: string[],
  projectNameById: Map<string, string>
): RowItem[] => [
  ...assigned.map<RowItem>((p) => ({
    id: p.id,
    projectId: p.projectId,
    projectName: projectNameById.get(p.projectId) ?? "Unknown",
    role: p.role,
    queued: false,
    isDeleted: queuedDeletes.includes(p.id),
  })),
  ...queuedAdds.map<RowItem>((q) => ({
    id: q.tmpId,
    projectId: q.projectId,
    projectName: projectNameById.get(q.projectId) ?? "Unknown",
    role: q.role,
    queued: true,
    isDeleted: false,
  })),
];
