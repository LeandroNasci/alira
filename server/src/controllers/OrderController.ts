import { Request, Response } from 'express';
import * as Yup from 'yup';

import db from '../database/connection';
import Item from '../models/Item';

export default {
  async create(request: Request, response: Response) {
    const {
      email,
      phone,
      cpf,
      invoice,
      shippingCategory,
      shippingCost,
      shipping,
      items
    } = request.body;

    console.log(request.body);

    const trx = await db.transaction();

    const data = {
      email,
      phone,
      cpf,
      invoice_name: invoice.name,
      invoice_lastname: invoice.lastName,
      invoice_cep: invoice.cep,
      invoice_street: invoice.street,
      invoice_number: invoice.number,
      invoice_complement: invoice.complement,
      invoice_district: invoice.district,
      invoice_city: invoice.city,
      invoice_uf: invoice.state,
      shipping_category: shippingCategory,
      shipping_cost: shippingCost,
      shipping_name: shipping.name,
      shipping_lastname: shipping.lastName,
      shipping_cep: shipping.cep,
      shipping_street: shipping.street,
      shipping_number: shipping.number,
      shipping_complement: shipping.complement,
      shipping_district: shipping.district,
      shipping_city: shipping.city,
      shipping_uf: shipping.state,
    }

    const orderSchema = Yup.object().shape({
      email: Yup.string().required().email(),
      phone: Yup.string().required(),
      cpf: Yup.string().required(),
      invoice_name: Yup.string().required(),
      invoice_lastname: Yup.string().required(),
      invoice_cep: Yup.string().required(),
      invoice_street: Yup.string().required(),
      invoice_number: Yup.string().required(),
      invoice_complement: Yup.string().required(),
      invoice_district: Yup.string().required(),
      invoice_city: Yup.string().required(),
      invoice_uf: Yup.string().required().max(2),
      shipping_category: Yup.string().required(),
      shipping_cost: Yup.number().required(),
      shipping_name: Yup.string().required(),
      shipping_lastname: Yup.string().required(),
      shipping_cep: Yup.string().required(),
      shipping_street: Yup.string().required(),
      shipping_number: Yup.string().required(),
      shipping_complement: Yup.string().required(),
      shipping_district: Yup.string().required(),
      shipping_city: Yup.string().required(),
      shipping_uf: Yup.string().required().max(2)
    });

    await orderSchema.validate(data, {
      abortEarly: false,
    })

    try {
      const insertedOrdersIds = await trx('orders').insert(data);

      const order_id = insertedOrdersIds[0];

      await trx('items').insert(
         items.map( (item: Item) => ({
          order_id,
          code: item.code,
          quantity: item.quantity
        }))
      );

      await trx.commit();
      return response.send("Order created!");
    }
    catch (err) {
      await trx.rollback();
      console.log(err);

      return response.status(400).json({
        error: 'Unexpected error while create new order.'
      })
    }

  }//create

}
