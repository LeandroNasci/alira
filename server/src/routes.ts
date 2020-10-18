import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import StockController from './controllers/StockController';
import ProductsController from './controllers/ProductsController';
import OrderController from './controllers/OrderController';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/products', upload.array('images'), StockController.create);
routes.get('/products', ProductsController.index ); //mostrar todos os produtos
routes.get('/products/:id', ProductsController.show ); //mostrar um unico produtos detalhado

routes.post('/checkout', OrderController.create ); //finalizar a compra

export default routes;
