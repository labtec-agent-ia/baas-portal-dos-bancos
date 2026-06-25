import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../config/database';

export class ClientController {
  async createClient(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, cpf, email, phone } = req.body;
      const newClient = {
        id: uuidv4(),
        name,
        cpf,
        email,
        phone,
        status: 'Pendente'
      };
      
      await db('clients').insert(newClient);
      res.status(201).json(newClient);
    } catch (error) {
      next(error);
    }
  }

  async listClients(req: Request, res: Response, next: NextFunction) {
    try {
      const clients = await db('clients').select('*').orderBy('created_at', 'desc');
      res.status(200).json(clients);
    } catch (error) {
      next(error);
    }
  }

  async getClient(req: Request, res: Response, next: NextFunction) {
    try {
      const client = await db('clients').where({ id: req.params.id }).first();
      if (!client) {
        return res.status(404).json({ error: { message: 'Cliente não encontrado' } });
      }
      res.status(200).json(client);
    } catch (error) {
      next(error);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) return res.status(401).json({ error: { message: 'Não autenticado' } });

      const client = await db('clients').where({ id: userId }).first();
      if (!client) return res.status(404).json({ error: { message: 'Cliente não encontrado' } });

      res.status(200).json(client);
    } catch (error) {
      next(error);
    }
  }
}
