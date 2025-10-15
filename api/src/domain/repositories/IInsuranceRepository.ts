import { Insurance } from "../entities/Insurance";

export interface IInsuranceRepository {
  create(data: Insurance): Promise<Insurance>;
}