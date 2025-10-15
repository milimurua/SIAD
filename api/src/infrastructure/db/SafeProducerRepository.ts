import { ISafeProducerRepository } from "../../domain/repositories/ISafeProducerRepository";
import { SafeProducer } from "../../domain/entities/SafeProducer";
import { pool } from "./db";

export class SafeProducerRepository implements ISafeProducerRepository {
  async create(data: SafeProducer): Promise<SafeProducer> {
    const res = await pool.query(
      `INSERT INTO insurance_db.safe_producer 
       (tuition, country, emitter_entity, name_producer, dni, phone, email)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [data.tuition, data.country, data.emitter_entity, data.name_producer, data.dni, data.phone, data.email]
    );
    return res.rows[0];
  }
}
