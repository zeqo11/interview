import { Dependent } from "types/Dependent"
import { Person } from "types/Person"
import { Salary } from "types/Salary"

export interface Employee extends Person {
  department: string
  officeLocation: string
  startDate: string
  remainingLeaves: number
  salary: Salary
  dependents: Dependent[]
}
