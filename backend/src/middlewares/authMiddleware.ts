import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../config/database';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: { message: 'Acesso Negado: Token JWT não fornecido. Faça login no Keycloak.' } });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.decode(token); 
    
    if (!decoded) {
      throw new Error('Token estruturalmente inválido');
    }

    const payload = decoded as any;
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      throw new Error('Token expirado');
    }
    
    const userId = payload.sub;
    
    // Verifica se o usuário já existe no banco de dados local
    const existingClient = await db('clients').where({ id: userId }).first();
    
    if (!existingClient) {
      // Upsert: Cria o usuário na primeira vez com R$ 1000 de saldo inicial para testes
      await db('clients').insert({
        id: userId,
        name: payload.name || payload.preferred_username || 'Usuário Keycloak',
        email: payload.email || `${payload.preferred_username}@baas.com`,
        cpf: Math.floor(Math.random() * 100000000000).toString().padStart(11, '0'), // Mock CPF
        phone: '11999999999',
        status: 'Ativo',
        balance: 1000.00
      });
    }

    // Injeta o ID e dados básicos no req.user
    (req as any).user = {
      id: userId,
      name: payload.name || payload.preferred_username,
      email: payload.email
    };
    
    next();
  } catch (error: any) {
    return res.status(401).json({ error: { message: `Autenticação Falhou: ${error.message}` } });
  }
};
