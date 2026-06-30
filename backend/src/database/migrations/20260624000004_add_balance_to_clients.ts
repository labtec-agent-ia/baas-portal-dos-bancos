import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('clients', (table) => {
    table.decimal('balance', 14, 2).defaultTo(0.00).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('clients', (table) => {
    table.dropColumn('balance');
  });
}
