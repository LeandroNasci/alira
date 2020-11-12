import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/multer';

import ProductsController from './controllers/ProductsController';
import OrderController from './controllers/OrderController';
import ImagesController from './controllers/ImagesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/products', ProductsController.index );                             //mostrar todos os produtos
routes.get('/products/:id', ProductsController.show );                          //mostrar um unico produtos detalhado
routes.post('/products', upload.array('images'), ProductsController.create);    //adicionar novo produto ao estoque
routes.put('/products', ProductsController.update);                             //atualiza estoque apos uma compra
routes.delete('/products/:id', ProductsController.delete);                      //retira do estoque um produto

routes.post('/images', upload.array('image'), ImagesController.create);          //adicionar uma nova foto
routes.get('/images', ImagesController.index);                                   //mostrar info das fotos
routes.delete('/images/:id', ImagesController.delete);                           //apagar uma foto

routes.post('/checkout', OrderController.create );                              //finalizar a compra

export default routes;
