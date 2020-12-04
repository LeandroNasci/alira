
import { Request, Response } from 'express';
import { consultarCep } from 'correios-brasil';

export default {

  async show (request: Request, response: Response) {
    try {
      const zipCodeData = await consultarCep(request.params.cep);

      return response.status(200).json(zipCodeData);
    }
    catch (err) {
      console.log(err);
      return response.status(500).json({ error: err });
    }
  },

}
