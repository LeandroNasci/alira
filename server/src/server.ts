import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes';
import errorHandler from './errors/handler';

import 'express-async-errors'
import 'dotenv/config';


const app = express();

var allowedOrigins = [
  'http://localhost:3000',
  'https://alira.vercel.app',
  'http://sandbox.pagseguro.uol.com.br',
  'https://sandbox.pagseguro.uol.com.br',
];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = `The CORS policy for ${origin} does not ` +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(morgan('dev'));
app.use('/files', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.listen(process.env.PORT || 3333);
