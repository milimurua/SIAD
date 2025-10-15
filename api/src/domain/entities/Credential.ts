export type UserRol = "insurer" | "producer";

export interface Credential {
  id: string;
  email: string;
  password: string;
  rol: UserRol;
  reference_id: string; 
}