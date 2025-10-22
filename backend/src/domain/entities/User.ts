import { UserRole } from "../types/roles";

export interface User {
  id: string;
  email: string;
  password: string;
  type: UserRole;
}