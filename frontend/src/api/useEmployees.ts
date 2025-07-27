import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getEmployees, addEmployee } from '../services/employeeService'

export const useEmployees = () =>
  useQuery({ queryKey: ['employees'], queryFn: getEmployees })

export const useAddEmployee = () => {
  const qc = useQueryClient()
  
  return useMutation({
    mutationFn: addEmployee,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['employees'] }),
  })
}
