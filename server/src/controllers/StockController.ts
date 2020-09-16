
import { Request, Response } from 'express';

import db from '../database/connection';

class StockController {

  // Mostrar todo o estoque
  async index (request: Request, response: Response) {

    return response.json();
  }

  // Adicionar novo produto ao estoque
  async create(request: Request, response: Response) {
    const {
      code,
      category,
      name,
      description,
      quantity,
      price,
      weight,
      length,
      width,
      height,
      images
    } = request.body;

    const trx = await db.transaction();

    try {
      const insertedProductsIds = await trx('products').insert({
        code,
        category,
        name,
        description,
        quantity,
        price,
        weight,
        length,
        width,
        height
      });

      const product_id = insertedProductsIds[0];

      await trx('images').insert([
        {
          image: images[0],
          product_id
        },
        {
          image: images[1],
          product_id
        },
        {
          image: images[2],
          product_id
        },
      ]);

      await trx.commit();

      return response.send("done!");
    } catch (err) {
      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while create new product.'
      })
    }


  }

  // Reposicao do estoque
  async update (request: Request, response: Response) {


    return response.json();
  }

  // Remocao de um produto do estoque
  async delete (request: Request, response: Response) {
    const { data } = request.query;

    return response.json();
  }

}

export default StockController;
