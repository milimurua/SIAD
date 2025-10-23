import { UserData } from "../../domain/shared";
import { prisma } from "./PrismaService";

export class UserRepository{
  async findByEmail(email: string): Promise<UserData | null> {
    const user = await prisma.user.findUnique({ where: { email } });
  
    return user;
  }

  async create(user: UserData): Promise<UserData> {
    const createdUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        type: user.type
      }
    });
    
    return createdUser;
  }

  async findById(id: string): Promise<UserData | null> {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    
    return user;
  }

  async update(id: string, data: Partial<UserData>): Promise<UserData> {
    const updatedUser = await prisma.user.update({
      where: { id },
      data
    });
    
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id }
    });
  }

  async findAll(): Promise<UserData[]> {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        type: true,
      }
    });
    
    return users as UserData[];
  }
}
