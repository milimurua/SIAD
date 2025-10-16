export type UserType = "insurance" | "producer";

export interface Credential {
  id: string;
  email: string;
  password: string;
  type: UserType;
  reference_id: string; 
}