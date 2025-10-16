import { pool } from "./db";
import { ISinisterRepository } from "../../domain/repositories/ISinisterRepository";
import { Sinister } from "../../domain/entities/Sinister";

export class SinisterRepository implements ISinisterRepository {
  async create(sinister: Sinister): Promise<Sinister> {
    const res = await pool.query(
      `INSERT INTO insurance_db.sinister
        (insured_dni, insurance_id, branch_id, date_sinister, description_sinister, amount_sinister, stay_sinister)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        sinister.insured_dni,
        sinister.insurance_id,
        sinister.branch_id,
        sinister.date_sinister,
        sinister.description_sinister,
        sinister.amount_sinister,
        sinister.stay_sinister ?? false,
      ]
    );
    return res.rows[0];
  }

  async findAllByInsurance(insurance_id: string): Promise<Sinister[]> {
    const res = await pool.query(
      "SELECT * FROM insurance_db.sinister WHERE insurance_id = $1 ORDER BY date_sinister DESC",
      [insurance_id]
    );
    return res.rows;
  }
}
