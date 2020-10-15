import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('items', table => {
    table.integer('order_id')
      .references('order_id')
      .inTable('orders')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .primary();

    table.integer('quantity').notNullable();
    table.string('code').notNullable();
  });
}

export async function down(knex: Knex){
  return knex.schema.dropTable('items');
}
