import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('pix_keys', (table) => {
    table.uuid('id').primary();
    table.uuid('owner_id').references('id').inTable('clients').onDelete('CASCADE');
    table.enum('key_type', ['cpf', 'email', 'phone', 'random']).notNullable();
    table.string('key_value').notNullable().unique();
    table.string('status').defaultTo('active');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('pix_keys');
}
