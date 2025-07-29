import { EmployeeProject } from "@/types/EmployeeProject";

export interface LocalProject extends Omit<EmployeeProject, "id"> {
  tmpId: string;
}