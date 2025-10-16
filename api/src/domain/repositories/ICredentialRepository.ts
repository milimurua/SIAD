import { Credential } from "../entities/Credential";

export interface ICredentialRepository {
  create(credential: Credential): Promise<Credential>;
  findByEmail(email: string): Promise<Credential | null>;
}