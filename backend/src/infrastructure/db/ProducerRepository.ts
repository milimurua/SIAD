import { IProducerRepository } from "../../domain/repositories/IProducerRepository";
import { Producer } from "../../domain/entities/Producer";
import { ProducerData } from "../../domain/types/shared";
import { prisma } from "./PrismaService";

export class ProducerRepository implements IProducerRepository {
  async create(data: ProducerData): Promise<Producer> {
    const producer = await (prisma as any).producer.create({
      data: {
        name: data.name,
        number: data.number,
        dni: data.dni,
        phone: data.phone,
        email: data.email
      }
    });
    
    return producer;
  }

  async findById(id: string): Promise<Producer | null> {
    const producer = await (prisma as any).producer.findUnique({
      where: { id }
    });
    
    return producer;
  }

  async findAll(): Promise<Producer[]> {
    const producers = await (prisma as any).producer.findMany();
    
    return producers;
  }

  async update(id: string, data: Partial<Producer>): Promise<Producer> {
    const updatedProducer = await (prisma as any).producer.update({
      where: { id },
      data
    });
    
    return updatedProducer;
  }

  async delete(id: string): Promise<void> {
    await (prisma as any).producer.delete({
      where: { id }
    });
  }

  async findByDni(dni: string): Promise<Producer | null> {
    const producer = await (prisma as any).producer.findUnique({
      where: { dni }
    });
    
    return producer;
  }

  async findByEmail(email: string): Promise<Producer | null> {
    const producer = await (prisma as any).producer.findFirst({
      where: { email }
    });
    
    return producer;
  }
}
