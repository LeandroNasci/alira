import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('products', table => {
    table.increments('id').primary();
    table.string('code').notNullable();
    table.string('category').notNullable();
    table.string('name').notNullable();
    table.text('description').notNullable();
    table.integer('stock').notNullable();
    table.decimal('price').notNullable();
    table.decimal('weight').notNullable();
    table.decimal('length').notNullable();
    table.decimal('width').notNullable();
    table.decimal('height').notNullable();
  });
}

export async function down(knex: Knex){
  return knex.schema.dropTable('products');
}
