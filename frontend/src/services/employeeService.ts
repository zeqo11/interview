import { api } from '../lib/api'
import type { Employee } from '../types/Employee'


export const getEmployees = () =>
  api.get<Employee[]>('/employees').then((r) => r.data)

export const addEmployee = (payload: Omit<Employee, 'id'>) =>
  api.post<Employee>('/employees', payload).then((r) => r.data)
