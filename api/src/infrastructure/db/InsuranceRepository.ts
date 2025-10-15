import { IInsuranceRepository } from "../../domain/repositories/IInsuranceRepository";
import { Insurance } from "../../domain/entities/Insurance";
import { pool } from "./db";

export class InsuranceRepository implements IInsuranceRepository {
    async create(data: Insurance): Promise<Insurance> {
        const res = await pool.query(
        `INSERT INTO insurance_db.insurance 
            (cuit, name_insurance, company_name, address, phone, email)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [data.cuit, data.name_insurance, data.company_name, data.address, data.phone, data.email]
        );
        return res.rows[0];
    }
}