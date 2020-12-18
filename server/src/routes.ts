import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/multer';

import ProductsController from './controllers/ProductsController';
import OrderController from './controllers/OrderController';
import ZipCodeController from './controllers/ZipCodeController';
import ShippingController from './controllers/ShippingController';
import CheckoutController from './controllers/CheckoutController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/products', ProductsController.index);                             //mostrar todos os produtos
routes.get('/products/:id', ProductsController.show);                          //mostrar um unico produtos detalhado
routes.post('/products', upload.array('images'), ProductsController.create);    //adicionar novo produto ao estoque
routes.put('/products', ProductsController.update);                             //atualiza estoque apos uma compra
routes.delete('/products/:id', ProductsController.delete);                      //retira do estoque um produto

routes.get('/orders', OrderController.index);                                  //listar pedidos
routes.get('/orders/:id', OrderController.show);                                  //listar pedidos
routes.post('/orders', OrderController.create);                               //finalizar a compra

routes.get('/cep/:cep', ZipCodeController.show);
routes.post('/preco', ShippingController.index);

routes.post('/checkout', CheckoutController.create);

export default routes;
