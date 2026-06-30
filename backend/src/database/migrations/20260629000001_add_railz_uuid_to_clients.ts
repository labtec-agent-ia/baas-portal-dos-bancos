import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('clients', (table) => {
    table.string('railz_business_uuid').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('clients', (table) => {
    table.dropColumn('railz_business_uuid');
  });
}
