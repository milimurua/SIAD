import { SinisterRepository } from "../../infrastructure/db/SinisterRepository";

export class GetSinistersByInsuredDni {
  private repository: SinisterRepository;

  constructor() {
    this.repository = new SinisterRepository();
  }

  async execute(dni: string) {
    if (!dni) throw new Error("Debe proporcionar un DNI válido");
    const sinisters = await this.repository.findByInsuredDni(dni);

    return {
      dni,
      total: sinisters.length,
      sinisters,
    };
  }
}
