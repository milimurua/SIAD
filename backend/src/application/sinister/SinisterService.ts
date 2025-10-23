import { SinisterRepository } from "../../infrastructure/db/SinisterRepository";
import { SinisterData } from "../../domain/shared";

export class SinisterService {
  constructor(private readonly sinisterRepo: SinisterRepository) {}

  async createSinister(data: SinisterData, user: any) {
    if (user.type !== "insurance")
      throw new Error("Only 'Insurance' users can create sinisters");

    const insuranceId = user.reference_id || user.id; // fallback for older tokens
    if (!insuranceId) {
      throw new Error("Missing insurance reference in user token");
    }

    const newSinister = await this.sinisterRepo.create({
      ...data,
      insuranceId,
    });

    return newSinister;
  }

  async getAllByInsurance(insuredId: any) {
    if (!insuredId) throw new Error("Missing insured ID");
    return await this.sinisterRepo.findByInsuredId(insuredId);
  }
}
