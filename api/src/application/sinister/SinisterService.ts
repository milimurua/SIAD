import { ISinisterRepository } from "../../domain/repositories/ISinisterRepository";
import { Sinister } from "../../domain/entities/Sinister";

export class SinisterService {
  constructor(private readonly sinisterRepo: ISinisterRepository) {}

  async createSinister(data: Sinister, user: any) {
    if (user.type !== "insurance")
      throw new Error("Only 'Insurance' users can create sinisters");

    const insuranceId = user.reference_id || user.id; // fallback for older tokens
    if (!insuranceId) {
      throw new Error("Missing insurance reference in user token");
    }

    const newSinister = await this.sinisterRepo.create({
      ...data,
      insurance_id: insuranceId,
    });

    return newSinister;
  }

  async getAllByInsurance(user: any) {
    if (user.type !== "insurance")
      throw new Error("Access denied: only Insurances can view their sinisters");

    return await this.sinisterRepo.findAllByInsurance(user.id);
  }
}
