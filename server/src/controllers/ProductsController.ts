import { Request, Response } from 'express';

import db from '../database/connection';
import productView from '../views/products_view';

export default {
  async index(request: Request, response: Response) {
    const { type } = request.query;

    if(type) {
      const products = await db('products')
        .select('*')
        .where('category', String(type) );
      const images = await db('products')
        .select('images.*')
        .join('images', 'products.id', '=', 'images.product_id')
        .where('category', String(type));
      console.log(images);

      return response.json(productView.renderMany(products, images));
    }

    const products = await db('products').select('*');
    const images = await db('images').select('*');

    return response.json(productView.renderMany(products, images));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const product = await db('products').where('id', id).first();

    if (!product) {
      return response.status(400).json({ message: 'Product not found.' });
    }

    const images = await db('products')
        .select('*')
        .join('images', 'products.id', '=', 'images.product_id')
        .where('product_id', id);

    return response.json(productView.render(product, images));
  }
}
