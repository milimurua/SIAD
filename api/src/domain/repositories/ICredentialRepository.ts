import { Credential } from "../entities/Credential";

export interface ICredentialRepository {
  findByEmail(email: string): Promise<Credential | null>;
  create(cred: Credential): Promise<Credential>;
}