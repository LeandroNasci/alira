import { Request, Response } from 'express';
import * as Yup from 'yup';

import db from '../database/connection';
import productView from '../views/products_view';


export default {
  // Adicionar novo produto ao estoque
  async create(request: Request, response: Response) {
    const {
      code,
      category,
      name,
      description,
      stock,
      price,
      weight,
      length,
      width,
      height,
    } = request.body;

     const trx = await db.transaction();

    const data = {
      code,
      category,
      name,
      description,
      stock,
      price,
      weight,
      length,
      width,
      height
    };

    const productSchema = Yup.object().shape({
      code: Yup.string().required(),
      category: Yup.string().required(),
      name: Yup.string().required(),
      description: Yup.string().required(),
      stock: Yup.number().required(),
      price: Yup.number().required(),
      weight: Yup.number().required(),
      length: Yup.number().required(),
      width: Yup.number().required(),
      height: Yup.number().required()
    });

    await productSchema.validate(data, {
      abortEarly: false,
    })

    try {
      const insertedProductsIds = await trx('products').insert(data).returning('id');

      const product_id = insertedProductsIds[0];

      const requestImages = request.files as Express.Multer.File[];
      const images = requestImages.map(image => {
        return { path: image.filename, product_id }
      });

      console.log(images);

      const imageSchema = Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
          product_id: Yup.number().required()
        })
      )

      await imageSchema.validate(images, {
        abortEarly: false,
      })

      await trx('images').insert(images).returning('id');

      await trx.commit();

      return response.send("done!");
    }
    catch (err) {
      await trx.rollback();
      console.log(err);

      return response.status(400).json({
        error: 'Unexpected error while create new product.'
      })
    }
  }, //create

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
  },

  // async update(request: Request, response: Response) {},
  // async delete(request: Request, response: Response) {},
}
