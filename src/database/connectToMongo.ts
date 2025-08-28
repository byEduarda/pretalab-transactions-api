import mongoose from "mongoose";

export const connectToMongo = async (): Promise<void> => {
  const mongoURL = process.env.MONGO_URL; 

  if (!mongoURL) {
    throw new Error("A URL de conexão do MongoDB (MONGO_URL) não está definida no .env.");
  }

  try {
    await mongoose.connect(mongoURL); 
    console.log("Conectado com sucesso ao MongoDB!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
};
