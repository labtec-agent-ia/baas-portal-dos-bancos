import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../config/database';

export class TransactionsController {
  async listTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) return res.status(401).json({ error: { message: 'Não autenticado' } });

      const transactions = await db('transactions')
        .where({ client_id: userId })
        .orderBy('created_at', 'desc');

      res.status(200).json(transactions);
    } catch (error) {
      next(error);
    }
  }

  async transfer(req: Request, res: Response, next: NextFunction) {
    const trx = await db.transaction();
    try {
      const senderId = (req as any).user?.id;
      if (!senderId) throw new Error('Não autenticado');

      const { amount, key_value } = req.body;
      const parsedAmount = parseFloat(amount);

      if (!parsedAmount || parsedAmount <= 0) {
        throw new Error('Valor inválido para transferência.');
      }
      
      // Select sender locking the row for update (Pessimistic Locking)
      const sender = await trx('clients').where({ id: senderId }).first().forUpdate();
      if (!sender) throw new Error('Remetente não encontrado.');
      if (Number(sender.balance) < parsedAmount) throw new Error('Saldo insuficiente.');

      const pixKey = await trx('pix_keys').where({ key_value }).first();
      if (!pixKey) throw new Error('Chave PIX não encontrada no sistema.');
      if (pixKey.owner_id === sender.id) throw new Error('Você não pode transferir para si mesmo usando esta chave.');

      // Select receiver locking the row
      const receiver = await trx('clients').where({ id: pixKey.owner_id }).first().forUpdate();
      if (!receiver) throw new Error('Conta destinatária não encontrada.');

      // Update saldos
      await trx('clients').where({ id: sender.id }).update({ balance: Number(sender.balance) - parsedAmount });
      await trx('clients').where({ id: receiver.id }).update({ balance: Number(receiver.balance) + parsedAmount });

      // Insert transação de saída (Sender)
      const txIdOut = `TRX-${uuidv4().substring(0, 8).toUpperCase()}`;
      await trx('transactions').insert({
        id: txIdOut,
        client_id: sender.id,
        type: 'PIX Enviado',
        amount: parsedAmount,
        origin: receiver.name,
        status: 'Concluído'
      });

      // Insert transação de entrada (Receiver)
      const txIdIn = `TRX-${uuidv4().substring(0, 8).toUpperCase()}`;
      await trx('transactions').insert({
        id: txIdIn,
        client_id: receiver.id,
        type: 'PIX Recebido',
        amount: parsedAmount,
        origin: sender.name,
        status: 'Concluído'
      });

      await trx.commit();
      res.status(200).json({ message: 'Transferência PIX realizada com sucesso!', transaction_id: txIdOut });
    } catch (error: any) {
      await trx.rollback();
      res.status(400).json({ error: { message: error.message } });
    }
  }
}
