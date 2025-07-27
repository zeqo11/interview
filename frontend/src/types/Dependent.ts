import { Person } from "types/Person";
import { Relationship } from "types/Relationship";

export interface Dependent extends Person {
  relationship?: Relationship;
}
