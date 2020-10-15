import { Router } from 'express';

import ProductsController from './controllers/ProductsController';
import OrderController from './controllers/OrderController';
import StockController from './controllers/StockController';

const routes = Router();

routes.get('/products', ProductsController.index ); //mostrar todos os produtos
routes.get('/products/:id', ProductsController.show ); //mostrar um unico produtos detalhado

routes.post('/checkout', OrderController.create ); //finalizar a compra

routes.post('/products', StockController.create);

export default routes;
