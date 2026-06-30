import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('transactions').del();
  await knex('pix_keys').del();
  await knex('clients').del();

  const clientId1 = uuidv4();
  const clientId2 = uuidv4();

  // Inserts seed entries
  await knex('clients').insert([
    { id: clientId1, name: 'Ana Silva', cpf: '12345678900', email: 'ana.silva@email.com', phone: '11999999999', status: 'Ativo', balance: 5000.00 },
    { id: clientId2, name: 'Carlos Santos', cpf: '09876543211', email: 'carlos.s@email.com', phone: '11888888888', status: 'Inativo', balance: 1250.50 }
  ]);

  await knex('pix_keys').insert([
    { id: uuidv4(), owner_id: clientId1, key_type: 'email', key_value: 'ana.silva@email.com', status: 'active' },
    { id: uuidv4(), owner_id: clientId2, key_type: 'cpf', key_value: '09876543211', status: 'active' }
  ]);
  
  await knex('transactions').insert([
    { id: 'TRX-1001', client_id: clientId1, type: 'PIX Recebido', amount: 1500.00, origin: 'Empresa XYZ', status: 'Concluído' },
    { id: 'TRX-1002', client_id: clientId1, type: 'PIX Enviado', amount: 350.50, origin: 'Pagamento Fatura', status: 'Concluído' }
  ]);
}
