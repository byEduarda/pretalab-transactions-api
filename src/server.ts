import app from "./app";
import { connectToMongo } from "./database/mongooseConnection";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error("Erro: URL do MongoDB não definida. Verifique seu arquivo .env ou .env.test.");
  process.exit(1);
}

connectToMongo(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch(err => {
    console.error("Falha ao conectar ao MongoDB.", err);
    process.exit(1);
  });

const PORT = parseInt(process.env.PORT || "3000", 10);


