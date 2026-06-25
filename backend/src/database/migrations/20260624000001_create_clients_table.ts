import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('clients', (table) => {
    table.uuid('id').primary(); // Controller will pass UUID
    table.string('name').notNullable();
    table.string('cpf').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('phone').nullable();
    table.string('status').defaultTo('Pendente');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('clients');
}
