import { PrismaClient } from "@prisma/client";

class PrismaService {
  private static instance: PrismaClient;

  constructor() {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaClient({
        // Configuración explícita del esquema predeterminado
        datasources: {
          db: {
            url: process.env.DATABASE_URL || 
              ""
          },
        },
        log: ["query", "info", "warn", "error"], //depurar querys
      });
    }
  }

  get client(): PrismaClient {
    return PrismaService.instance;
  }

  async connect(): Promise<void> {
    try {
      await PrismaService.instance.$connect();
      console.log("Connected to database (schema: insurance)");
    } catch (error) {
      console.error("Failed to connect to database:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await PrismaService.instance.$disconnect();
  }
}

export const prismaService = new PrismaService();
export const prisma = prismaService.client;