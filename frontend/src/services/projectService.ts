import { api } from '@/lib/api'
import type { Project } from '@/types/Project'
import type { EmployeeProject } from '@/types/EmployeeProject'

export const getProjects = () =>
  api.get<Project[]>('/projects').then((r) => r.data)

export const addProject = (payload: Omit<Project, 'id'>) =>
  api.post<Project>('/projects', payload).then((r) => r.data)

export const getEmployeeProjects = () =>
  api.get<EmployeeProject[]>('/employeeProjects').then((r) => r.data)

export const addEmployeeProject = (payload: Omit<EmployeeProject, 'id'>) =>
  api.post<EmployeeProject>('/employeeProjects', payload).then((r) => r.data)

export const deleteEmployeeProject = (id: string) =>
  api.delete<void>(`/employeeProjects/${id}`).then(() => id)