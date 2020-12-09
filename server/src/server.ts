import 'dotenv/config';

import express from 'express';
import path from 'path';
import cors from 'cors';
import routes from './routes';
import morgan from 'morgan';


import 'express-async-errors'
import errorHandler from './errors/handler';

const app = express();


app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(morgan('dev'));
app.use('/files', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.listen(process.env.PORT || 3333);
