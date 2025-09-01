import mongoose from "mongoose";

export const connectToMongo = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI;
  const dbName = process.env.TEST_DB_NAME || "test_db";

  if (!mongoUri) {
    throw new Error("A string de conexão do MongoDB (MONGO_URI) não está definida no .env.");
  }

  try {
    await mongoose.connect(mongoUri, {
      dbName, 
    });
    console.log(`Conectado com sucesso ao MongoDB! Banco: ${dbName} `);
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
};
