import express from 'express';
import multer from 'multer';

import uploadConfig from './config/multer';

import ProductsController from './controllers/ProductsController';
import OrderController from './controllers/OrderController';
import ZipCodeController from './controllers/ZipCodeController';
import ShippingController from './controllers/ShippingController';
import CheckoutController from './controllers/CheckoutController';

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get('/products', ProductsController.index);                              //mostrar todos os produtos
routes.get('/products/:id', ProductsController.show);                           //mostrar um unico produtos detalhado
routes.post('/products', upload.array('images'), ProductsController.create);    //adicionar novo produto ao estoque
routes.put('/products', ProductsController.update);                             //atualiza estoque apos uma compra
routes.delete('/products/:id', ProductsController.delete);

routes.get('/orders', OrderController.index);                                   //listar todos os pedidos
routes.get('/orders/:id', OrderController.show);                                //lista um pedido especifico
routes.post('/orders', OrderController.create);                                 //finalizar a compra

routes.get('/cep/:cep', ZipCodeController.show);                                //consultar cep
routes.post('/preco', ShippingController.show);                                 //calcular frete com api soap dos correios

routes.post('/checkout', CheckoutController.create);                            //checkout do pagseguro em REST

export default routes;
