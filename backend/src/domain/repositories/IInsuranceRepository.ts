import { Insurance } from "../entities/Insurance";

export interface IInsuranceRepository {
  create(data: any): Promise<Insurance>;
  findById(id: string): Promise<Insurance | null>;
  findAll(): Promise<Insurance[]>;
  update(id: string, data: any): Promise<Insurance>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<Insurance | null>;
}