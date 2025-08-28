import dotenv from "dotenv";
import app from "./app";
import { connectToMongo } from "./database/connectToMongo";

dotenv.config();

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

connectToMongo()
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

