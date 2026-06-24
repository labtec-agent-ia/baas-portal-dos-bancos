import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../config/database';
import { redis } from '../config/redis';

export class PixController {
  async createKey(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) return res.status(401).json({ error: { message: 'Não autenticado' } });

      const { key_type, key_value } = req.body;
      
      const newKey = {
        id: uuidv4(),
        owner_id: userId,
        key_type,
        key_value,
        status: 'active'
      };
      
      await db('pix_keys').insert(newKey);
      
      // Invalida cache de chaves deste usuário
      await redis.del(`pix_keys:${userId}`);

      res.status(201).json(newKey);
    } catch (error) {
      next(error);
    }
  }

  async listKeys(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) return res.status(401).json({ error: { message: 'Não autenticado' } });

      const cacheKey = `pix_keys:${userId}`;
      const cachedKeys = await redis.get(cacheKey);

      if (cachedKeys) {
        return res.status(200).json(JSON.parse(cachedKeys));
      }

      const keys = await db('pix_keys')
        .where({ owner_id: userId })
        .orderBy('created_at', 'desc');
        
      // Guarda no cache por 10 minutos (600 segundos)
      await redis.setex(cacheKey, 600, JSON.stringify(keys));

      res.status(200).json(keys);
    } catch (error) {
      next(error);
    }
  }
}
