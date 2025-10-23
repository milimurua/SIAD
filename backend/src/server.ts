import app from "./app";
import { prismaService } from "./infrastructure/db/PrismaService";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Conectar a la base de datos
    await prismaService.connect();
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Database connected successfully`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Cierre del server
process.on('SIGINT', async () => {
  console.log('\n Shutting down server');
  await prismaService.disconnect();
  process.exit(0);
});

startServer();
