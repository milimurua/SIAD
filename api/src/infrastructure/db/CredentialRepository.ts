import { ICredentialRepository } from "../../domain/repositories/ICredentialRepository";
import { Credential } from "../../domain/entities/Credential";
import { pool } from "./db";

export class CredentialRepository implements ICredentialRepository {
  async findByEmail(email: string): Promise<Credential | null> {
    const res = await pool.query("SELECT * FROM insurance_db.credentials WHERE email = $1", [email]);
    return res.rows[0] || null;
  }

  async create(cred: Credential): Promise<Credential> {
    const res = await pool.query(
      `INSERT INTO insurance_db.credentials (email, password, type, reference_id)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [cred.email, cred.password, cred.type, cred.reference_id]
    );
    return res.rows[0];
  }
}
