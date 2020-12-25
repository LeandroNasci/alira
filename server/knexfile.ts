import path from 'path';
import 'dotenv/config'

switch (process.env.NODE_ENV) {
  case 'development' :
    module.exports = {
      // client: 'sqlite3',
      // connection: {
      //   filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
      // },
      client: 'pg',
      connection: {
        host : process.env.PG_HOST,
        user : process.env.PG_USER,
        password : process.env.PG_PASSWORD,
        database : process.env.PG_DATABASE,
      },
      migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
      },
      useNullAsDefault: true,
    };
    break;

    case 'test':
    module.exports = {
      client: 'sqlite3',
      connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'teste.sqlite')
      },
      migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
      },
      useNullAsDefault: true,
    };
    break;

    case 'production' :
    module.exports = {
      client: 'pg',
      connection: {
        host : process.env.PG_HOST,
        user : process.env.PG_USER,
        password : process.env.PG_PASSWORD,
        database : process.env.PG_DATABASE,
      },
      migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
      },
      useNullAsDefault: true,
    };
    break;

  default:
    break;
}
