import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/multer';

import ProductsController from './controllers/ProductsController';
import OrderController from './controllers/OrderController';
import ZipCodeController from './controllers/ZipCodeController';
import ShippingController from './controllers/ShippingController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/products', ProductsController.index);                             //mostrar todos os produtos
routes.get('/products/:id', ProductsController.show);                          //mostrar um unico produtos detalhado
routes.post('/products', upload.array('images'), ProductsController.create);    //adicionar novo produto ao estoque
routes.put('/products', ProductsController.update);                             //atualiza estoque apos uma compra
routes.delete('/products/:id', ProductsController.delete);                      //retira do estoque um produto

routes.get('/orders', OrderController.index);                                  //listar pedidos
routes.get('/orders/:id', OrderController.show);                                  //listar pedidos
routes.post('/checkout', OrderController.create);                               //finalizar a compra

routes.get('/cep/:cep', ZipCodeController.show);
routes.get('/preco', ShippingController.index);

export default routes;
