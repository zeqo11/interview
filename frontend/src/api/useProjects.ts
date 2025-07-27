import { addEmployeeProject, addProject, deleteEmployeeProject, getEmployeeProjects, getProjects } from "@/services/projectService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const PROJECTS_KEY = ['projects'] as const
export const EMPLOYEE_PROJECTS_KEY = ['employee-projects'] as const

export const useProjects = () =>
  useQuery({ queryKey: PROJECTS_KEY, queryFn: getProjects, staleTime: 300_000 })

export const useEmployeeProjects = () =>
  useQuery({ queryKey: EMPLOYEE_PROJECTS_KEY, queryFn: getEmployeeProjects, staleTime: 300_000 })

export const useAddProject = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: addProject,
    onSuccess: () => qc.invalidateQueries({ queryKey: PROJECTS_KEY }),
  })
}

export const useAddEmployeeProject = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: addEmployeeProject,
    onSuccess: () => qc.invalidateQueries({ queryKey: EMPLOYEE_PROJECTS_KEY }),
  })
}

export const useDeleteEmployeeProject = () => {
  const qc = useQueryClient()
  
  return useMutation({
    mutationFn: deleteEmployeeProject,
    onSuccess: () => qc.invalidateQueries({ queryKey: EMPLOYEE_PROJECTS_KEY }),
  })
}