import { Producer } from "../entities/Producer";

export interface IProducerRepository {
  create(data: any): Promise<Producer>;
  findById(id: string): Promise<Producer | null>;
  findAll(): Promise<Producer[]>;
  update(id: string, data: Partial<Producer>): Promise<Producer>;
  delete(id: string): Promise<void>;
  findByDni(dni: string): Promise<Producer | null>;
  findByEmail(email: string): Promise<Producer | null>;
}
