import request from 'supertest';
import app from '../../src/app';
import * as aiService from '../../src/services/aiService';

jest.mock('../../services/aiService');

describe('Integração das Rotas de IA', () => {
  it('POST /api/chat deve retornar uma resposta do serviço de IA', async () => {
    const mockReply = 'Esta é uma resposta simulada.';
    (aiService.generateResponse as jest.Mock).mockResolvedValue(mockReply);
    
    const response = await request(app)
      .post('/api/chat')
      .send({ message: 'Olá, IA' });

    expect(response.status).toBe(200);
    expect(response.body.reply).toBe(mockReply);
    expect(aiService.generateResponse).toHaveBeenCalledWith('Olá, IA');
  });
  
  it('POST /api/chat deve retornar 400 se a mensagem estiver faltando', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({});
      
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("A chave 'message' é obrigatória no corpo da requisição.");
  });
});