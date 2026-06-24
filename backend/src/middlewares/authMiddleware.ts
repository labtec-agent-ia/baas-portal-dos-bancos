import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: { message: 'Acesso Negado: Token JWT não fornecido. Faça login no Keycloak.' } });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Decodifica o token para testes. Em produção, aqui deve ser usado jwt.verify com a chave pública do Keycloak
    const decoded = jwt.decode(token); 
    
    if (!decoded) {
      throw new Error('Token estruturalmente inválido');
    }

    // Como é um mock local, consideramos o token válido apenas se estiver presente e decodificável.
    // Opcionalmente, pode checar expiração:
    const payload = decoded as any;
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      throw new Error('Token expirado');
    }
    
    // (req as any).user = payload;
    
    next();
  } catch (error: any) {
    return res.status(401).json({ error: { message: `Autenticação Falhou: ${error.message}` } });
  }
};
