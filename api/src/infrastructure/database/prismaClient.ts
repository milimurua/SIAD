import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "warn", "error"], // opcional, útil para debug
});

export default prisma;