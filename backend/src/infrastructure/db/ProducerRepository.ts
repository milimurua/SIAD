import { ProducerData } from "../../domain/shared";
import { prisma } from "./PrismaService";

export class ProducerRepository {
  async create(data: ProducerData): Promise<ProducerData> {
    const producer = await prisma.producer.create({
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

  async findById(id: string): Promise<ProducerData | null> {
    const producer = await prisma.producer.findUnique({
      where: { id }
    });
    
    return producer;
  }

  async findAll(): Promise<ProducerData[]> {
    const producers = await prisma.producer.findMany();
    
    return producers;
  }

  async update(id: string, data: Partial<ProducerData>): Promise<ProducerData> {
    const updatedProducer = await prisma.producer.update({
      where: { id },
      data
    });
    
    return updatedProducer;
  }

  async findByDni(dni: string): Promise<ProducerData | null> {
    const producer = await prisma.producer.findUnique({
      where: { dni }
    });
    
    return producer;
  }

  async findByEmail(email: string): Promise<ProducerData | null> {
    const producer = await prisma.producer.findFirst({
      where: { email }
    });
    
    return producer;
  }
}
