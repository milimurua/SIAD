import { prisma } from "./PrismaService";
import { InsuredData } from "../../domain/shared";

export class InsuredRepository {
  async create(data: InsuredData) {
    const insured = await prisma.insured.create({
      data: {
        name: data.name,
        surname: data.surname,
        dni: data.dni,
        email: data.email,
        insuranceId: data.insuranceId
      }
    });
    
    return insured;
  }

  async findById(id: string) {
    const insured = await prisma.insured.findUnique({
      where: { id },
      include: {
        insurance: true,
        sinisters: true
      }
    });
    
    return insured;
  }

  async findByDni(dni: string) {
    const insured = await prisma.insured.findUnique({
      where: { dni },
      include: {
        insurance: true,
        sinisters: true
      }
    });
    
    return insured;
  }

  async findAll() {
    const insureds = await prisma.insured.findMany({
      include: {
        insurance: true,
        sinisters: true
      }
    });
    
    return insureds;
  }

  async update(id: string, data: Partial<InsuredData>) {
    const updatedInsured = await prisma.insured.update({
      where: { id },
      data
    });
    
    return updatedInsured;
  }

  async findByInsuranceId(insuranceId: string) {
    const insureds = await prisma.insured.findMany({
      where: { insuranceId },
      include: {
        insurance: true,
        sinisters: true
      }
    });
    
    return insureds;
  }
}