
import { Request, Response } from 'express';
import * as Yup from 'yup';

import db from '../database/connection';

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
      const insertedProductsIds = await trx('products').insert(data);

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

      await trx('images').insert(images);

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
  } //create
};
