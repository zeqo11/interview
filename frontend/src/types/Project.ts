import { ProjectStatus } from "types/ProjectStatus"

export interface Project {
  id: string
  name: string
  budget: number
  status: ProjectStatus
}