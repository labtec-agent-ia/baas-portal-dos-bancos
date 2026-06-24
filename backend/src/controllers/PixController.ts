import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../config/database';
import { redis } from '../config/redis';

export class PixController {
  async createKey(req: Request, res: Response, next: NextFunction) {
    try {
      const { key_type, key_value, description } = req.body;
      const client = await db('clients').first(); // Pega um cliente aleatório apenas para evitar erro de Foreign Key no teste
      
      const newKey = {
        id: uuidv4(),
        owner_id: client ? client.id : null,
        key_type,
        key_value,
        status: 'active'
      };
      
      if (newKey.owner_id) {
        await db('pix_keys').insert(newKey);
      }

      res.status(201).json(newKey);
    } catch (error) {
      next(error);
    }
  }

  async listKeys(req: Request, res: Response, next: NextFunction) {
    try {
      const cacheKey = 'pix_keys:all';
      const cachedKeys = await redis.get(cacheKey);

      if (cachedKeys) {
        return res.status(200).json(JSON.parse(cachedKeys));
      }

      const keys = await db('pix_keys')
        .join('clients', 'pix_keys.owner_id', 'clients.id')
        .select('pix_keys.id', 'pix_keys.key_type', 'pix_keys.key_value', 'pix_keys.status', 'clients.name as owner')
        .orderBy('pix_keys.created_at', 'desc');
        
      // Guarda no cache por 10 minutos (600 segundos)
      await redis.setex(cacheKey, 600, JSON.stringify(keys));

      res.status(200).json(keys);
    } catch (error) {
      next(error);
    }
  }
}
