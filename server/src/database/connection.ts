import knex from 'knex';
import path from 'path';
import 'dotenv/config'

switch (process.env.NODE_ENV) {
  case 'development':
    var db = knex({
      client: 'pg',
      connection: {
        host : process.env.PG_HOST,
        user : process.env.PG_USER,
        password : process.env.PG_PASSWORD,
        database : process.env.PG_DATABASE,
      },
      useNullAsDefault: true,
    });
    break;

 case 'test':
    var db = knex({
      client: 'sqlite3',
      connection: {
        filename: path.resolve(__dirname, 'teste.sqlite')
      },
      useNullAsDefault: true,
    });
    break;

  case 'production':
  default:
    var db = knex({
      client: 'pg',
      connection: {
        host : process.env.PG_HOST,
        user : process.env.PG_USER,
        password : process.env.PG_PASSWORD,
        database : process.env.PG_DATABASE,
      },
      useNullAsDefault: true
    })
    break;
}

export default db;
