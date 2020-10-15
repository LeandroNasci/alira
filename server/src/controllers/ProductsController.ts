import { Request, Response } from 'express';

import db from '../database/connection';

export default {
  async index(request: Request, response: Response) {
    const { type } = request.query;

    if(type) {
      const filteredProducts = await db('products').select('*').where('category', String(type) );
      const images = await db('products')
        .select('code', 'product_id', 'image')
        .join('images', 'products.id', '=', 'images.product_id')
        .where('category', String(type));

      return (response.json({filteredProducts, images}));
    }
    else {
      const products = await db('products').select('*');
      const images = await db('products')
        .select('code', 'product_id', 'image')
        .join('images', 'products.id', '=', 'images.product_id');
      return (response.json({products, images}));
    }

  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const product = await db('products').where('id', id).first();

    if (!product) {
      return response.status(400).json({ message: 'Product not found.' });
    }

    const images = await db('products')
        .select('code', 'product_id', 'image')
        .join('images', 'products.id', '=', 'images.product_id')
        .where('product_id', id);


    return (response.json({...product, images}));
  }
}
