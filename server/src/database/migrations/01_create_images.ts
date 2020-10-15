import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('images', table => {
    table.increments('id').primary();
    table.string('path').notNullable();

    table.integer('product_id').notNullable();
    table.foreign('product_id')
      .references('id')
      .inTable('products')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex){
  return knex.schema.dropTable('images');
}
