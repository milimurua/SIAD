import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { UserData } from "../../domain/types/shared";
import { prisma } from "./PrismaService";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await (prisma as any).user.findUnique({
      where: { email }
    });
    
    return user;
  }

  async create(user: UserData): Promise<User> {
    const createdUser = await (prisma as any).user.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        type: user.type
      }
    });
    
    return createdUser;
  }

  async findById(id: string): Promise<User | null> {
    const user = await (prisma as any).user.findUnique({
      where: { id }
    });
    
    return user;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const updatedUser = await (prisma as any).user.update({
      where: { id },
      data
    });
    
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await (prisma as any).user.delete({
      where: { id }
    });
  }

  async findAll(): Promise<User[]> {
    const users = await (prisma as any).user.findMany({
      select: {
        id: true,
        email: true,
        type: true,
        // No incluir password por seguridad
      }
    });
    
    return users as User[];
  }
}
