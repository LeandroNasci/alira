import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('images', table => {
    table.increments('id').primary();

    table.string('name').notNullable();
    table.integer('size').notNullable();
    table.string('key').notNullable();
    table.string('url').notNullable();

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
