import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('transactions', (table) => {
    table.string('id').primary();
    table.uuid('client_id').references('id').inTable('clients').onDelete('CASCADE');
    table.string('type').notNullable(); 
    table.decimal('amount', 14, 2).notNullable();
    table.string('origin').notNullable();
    table.string('status').defaultTo('Concluído');
    table.timestamp('date').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('transactions');
}
