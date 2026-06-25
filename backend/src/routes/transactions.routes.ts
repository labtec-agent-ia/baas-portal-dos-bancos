import { Router } from 'express';
import { TransactionsController } from '../controllers/TransactionsController';

const router = Router();
const controller = new TransactionsController();

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Lista o histórico de transações do cliente logado
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Histórico retornado com sucesso
 */
router.get('/', controller.listTransactions.bind(controller));

/**
 * @swagger
 * /api/transactions/transfer:
 *   post:
 *     summary: Realiza uma transferência PIX atômica
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 50.00
 *               key_value:
 *                 type: string
 *                 example: '09876543211'
 *     responses:
 *       200:
 *         description: Transferência bem sucedida
 *       400:
 *         description: Erro de negócio (saldo insuficiente, chave não encontrada)
 */
router.post('/transfer', controller.transfer.bind(controller));

export default router;
