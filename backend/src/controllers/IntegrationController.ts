import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';
import { RailzService } from '../services/RailzService';

export class IntegrationController {
  private railzService = new RailzService();

  connectRailz = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.id;
      if (!userId) return res.status(401).json({ error: { message: 'Não autenticado' } });

      const client = await db('clients').where({ id: userId }).first();
      if (!client) return res.status(404).json({ error: { message: 'Cliente não encontrado' } });

      let businessUuid = client.railz_business_uuid;

      if (!businessUuid) {
        // Criar o business na Railz
        businessUuid = await this.railzService.createBusiness(client.name);
        
        // Salvar UUID no banco
        await db('clients')
          .where({ id: userId })
          .update({ railz_business_uuid: businessUuid });
      }

      // Gerar a URL de conexão
      const url = await this.railzService.generateConnectUrl(businessUuid);

      res.status(200).json({ url });
    } catch (error: any) {
      if (error.message.includes('Credenciais da Railz não estão configuradas')) {
        return res.status(503).json({ error: { message: error.message } });
      }
      next(error);
    }
  }

  getScore = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user?.id;
      if (!userId) return res.status(401).json({ error: { message: 'Não autenticado' } });

      const client = await db('clients').where({ id: userId }).first();
      
      if (!client || !client.railz_business_uuid) {
        return res.status(200).json({ status: 'not_connected' });
      }

      const scoreData = await this.railzService.getCreditScore(client.railz_business_uuid);
      
      res.status(200).json({ status: 'connected', scoreData });
    } catch (error) {
      next(error);
    }
  }
}
