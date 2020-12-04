
import { Request, Response } from 'express';
import { calcularPrecoPrazo } from 'correios-brasil';

export default {

  async index (request: Request, response: Response) {
    try {
      const shippingData = await calcularPrecoPrazo(request.body)

      return response.status(200).json(shippingData);
    }
    catch (err) {
      console.log(err);
      return response.status(500).json({ error: err });
    }
  },

}
