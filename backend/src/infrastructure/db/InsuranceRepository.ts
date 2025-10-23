import { InsuranceData } from "../../domain/shared";
import { prisma } from "./PrismaService";

export class InsuranceRepository {
  async create(data: any): Promise<InsuranceData> {
    const insurance = await prisma.insurance.create({
      data: {
        name: data.name,
        email: data.email
      }
    });
    
    return insurance as unknown as InsuranceData;
  }

  async findById(id: string): Promise<InsuranceData | null> {
    const insurance = await prisma.insurance.findUnique({
      where: { id }
    });
    
    return insurance as unknown as InsuranceData | null;
  }

  async findAll(): Promise<InsuranceData[]> {
    const insurances = await prisma.insurance.findMany();
    
    return insurances as unknown as InsuranceData[];
  }

  async update(id: string, data: any): Promise<InsuranceData> {
    const updatedInsurance = await prisma.insurance.update({
      where: { id },
      data
    });
    
    return updatedInsurance as unknown as InsuranceData;
  }
  
  async findByEmail(email: string): Promise<InsuranceData | null> {
    const insurance = await prisma.insurance.findFirst({
      where: { email }
    });
    
    return insurance as unknown as InsuranceData | null;
  }
}