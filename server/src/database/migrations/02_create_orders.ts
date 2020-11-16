import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('orders', table => {
    table.timestamp('created_at')
    .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    .notNullable();

    /* contato */
    table.increments('order_id').primary();   /* numero da compra */
    table.string('email').notNullable();
    table.string('phone').notNullable();

    /* nota fiscal */
    table.string('cpf');
    table.string('cnpj');
    table.string('invoice_name').notNullable();
    table.string('invoice_lastname').notNullable();
    table.string('invoice_cep').notNullable();
    table.string('invoice_street').notNullable();
    table.string('invoice_number').notNullable();
    table.string('invoice_complement').notNullable();
    table.string('invoice_district').notNullable();
    table.string('invoice_city').notNullable();
    table.string('invoice_state', 2).notNullable();

    /* entrega */
    table.string('shipping_category').notNullable();
    table.decimal('shipping_cost').notNullable(); /* frete */

    table.string('shipping_name');
    table.string('shipping_lastname');
    table.string('shipping_cep');
    table.string('shipping_street');
    table.string('shipping_number');
    table.string('shipping_complement');
    table.string('shipping_district');
    table.string('shipping_city');
    table.string('shipping_state', 2);
  });
}

export async function down(knex: Knex){
  return knex.schema.dropTable('orders');
}
