import prisma from "../database/prismaClient";

export class SinisterRepository {
  async findByInsuredDni(dni: string) {
    return prisma.sinister.findMany({
      where: { insured_dni: dni },
      include: {
        insurance: {
          select: { id_insurance: true, name_insurance: true },
        },
        branch: {
          select: { id_branch: true, name_branch: true },
        },
      },
      orderBy: { date_sinister: "desc" },
    });
  }
}
