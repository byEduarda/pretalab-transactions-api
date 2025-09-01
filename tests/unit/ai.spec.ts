import { generateResponse } from '../../src/services/aiService';
import { GoogleGenerativeAI } from '@google/generative-ai';

jest.mock('@google/generative-ai');

describe('Testes de Unidade do Serviço de IA', () => {
  it('deve gerar uma resposta da IA', async () => {
    const mockText = 'Resposta mockada da IA';
    
    const mockGenerateContent = jest.fn().mockResolvedValue({
      response: { text: () => mockText },
    });
    
    (GoogleGenerativeAI as jest.Mock).mockImplementation(() => ({
      getGenerativeModel: () => ({
        generateContent: mockGenerateContent,
      }),
    }));

    const response = await generateResponse('Qual foi meu maior gasto?');

    expect(response).toBe(mockText);
    expect(mockGenerateContent).toHaveBeenCalledTimes(1);
  });
});