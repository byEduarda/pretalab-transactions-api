import dotenv from "dotenv";
import app from "./app";
import { connectToMongo } from "./database/connectToMongo";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectToMongo(); 
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta: ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
};

app.listen(PORT, () => 
  console.log(`Servidor rodando na porta ${PORT}`));

startServer();
