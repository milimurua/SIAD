import { prisma } from "./PrismaService";
import { SinisterData } from "../../domain/shared";

export class SinisterRepository {
  async create(data: SinisterData) {
    const sinister = await prisma.sinister.create({
      data: {
        description: data.description,
        amount: data.amount,
        insuranceId: data.insuranceId,
        insuredId: data.insuredId
      },
      include: {
        insurance: true,
        insured: true
      }
    });
    
    return sinister;
  }

  async findById(id: string) {
    const sinister = await prisma.sinister.findUnique({
      where: { id },
      include: {
        insurance: true,
        insured: true
      }
    });
    
    return sinister;
  }

  async findAll() {
    const sinisters = await prisma.sinister.findMany({
      include: {
        insurance: true,
        insured: true
      },
      orderBy: {
        date: 'desc'
      }
    });
    
    return sinisters;
  }

  async findByInsuranceId(insuranceId: string) {
    const sinisters = await prisma.sinister.findMany({
      where: { insuranceId },
      include: {
        insurance: true,
        insured: true
      },
      orderBy: {
        date: 'desc'
      }
    });
    
    return sinisters;
  }

  async findByInsuredId(insuredId: string) {
    const sinisters = await prisma.sinister.findMany({
      where: { insuredId },
      include: {
        insurance: true,
        insured: true
      },
      orderBy: {
        date: 'desc'
      }
    });
    
    return sinisters;
  }

  async findByInsuredDni(dni: string) {
    const sinisters = await prisma.sinister.findMany({
      where: {
        insured: {
          dni: dni
        }
      },
      include: {
        insurance: true,
        insured: true
      },
      orderBy: {
        date: 'desc'
      }
    });
    
    return sinisters;
  }

  async update(id: string, data: Partial<SinisterData>) {
    const updatedSinister = await prisma.sinister.update({
      where: { id },
      data,
      include: {
        insurance: true,
        insured: true
      }
    });
    
    return updatedSinister;
  }

  async delete(id: string) {
    await prisma.sinister.delete({
      where: { id }
    });
  }

  async getStatistics() {
    const totalSinisters = await prisma.sinister.count();
    const totalAmount = await prisma.sinister.aggregate({
      _sum: {
        amount: true
      }
    });
    
    const sinistersByMonth = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', date) as month,
        COUNT(*) as count,
        SUM(amount) as total_amount
      FROM "Sinister"
      GROUP BY DATE_TRUNC('month', date)
      ORDER BY month DESC
      LIMIT 12
    `;
    
    return {
      totalSinisters,
      totalAmount: totalAmount._sum.amount || 0,
      sinistersByMonth
    };
  }
}