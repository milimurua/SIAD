import { Sinister } from "../entities/Sinister";

export interface ISinisterRepository {
  create(sinister: Sinister): Promise<Sinister>;
  findAllByInsurance(insurance_id: string): Promise<Sinister[]>;
}