import { IInsuranceRepository } from "../../domain/repositories/IInsuranceRepository";
import { Insurance } from "../../domain/entities/Insurance";
import { prisma } from "./PrismaService";

export class InsuranceRepository implements IInsuranceRepository {
  async create(data: any): Promise<Insurance> {
    const insurance = await (prisma as any).insurance.create({
      data: {
        name: data.name,
        email: data.email
      }
    });
    
    return insurance as unknown as Insurance;
  }

  async findById(id: string): Promise<Insurance | null> {
    const insurance = await (prisma as any).insurance.findUnique({
      where: { id }
    });
    
    return insurance as unknown as Insurance | null;
  }

  async findAll(): Promise<Insurance[]> {
    const insurances = await (prisma as any).insurance.findMany();
    
    return insurances as unknown as Insurance[];
  }

  async update(id: string, data: any): Promise<Insurance> {
    const updatedInsurance = await (prisma as any).insurance.update({
      where: { id },
      data
    });
    
    return updatedInsurance as unknown as Insurance;
  }

  async delete(id: string): Promise<void> {
    await (prisma as any).insurance.delete({
      where: { id }
    });
  }

  async findByEmail(email: string): Promise<Insurance | null> {
    const insurance = await (prisma as any).insurance.findFirst({
      where: { email }
    });
    
    return insurance as unknown as Insurance | null;
  }
}