import express from 'express';
import StockController from './controllers/StockController';



const routes = express.Router();
const stockController = new StockController();

routes.get('/'); //mostrar todos os produtos

routes.get('/details/:code'); //mostrar um unico produtos detalhado

routes.get('/cart'); //mostrar produtos contidos no carrinho

//routes.get // calcular frete

// routes.post('') // correios


routes.get('/products/:user/:key', stockController.index); //mostrar estoque
routes.post('/products/:user/:key', stockController.create); //adicionar ao estoque
routes.put('/products/:user/:key', stockController.update); //atualizar estoque
routes.delete('/products/:user/:key', stockController.delete); //removerdo estoque



export default routes;
