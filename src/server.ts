import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

const mongoUri = process.env.MONGO_URI; 
const PORT = process.env.PORT || 3000;

if (!mongoUri) {
  console.error("Erro: A variável de ambiente MONGO_URI não está definida.");
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Conectado ao MongoDB Atlas com sucesso!');
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro de conexão com o MongoDB:', err);
  });