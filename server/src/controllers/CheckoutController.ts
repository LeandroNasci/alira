
import { Request, Response } from 'express';
import fetch, { Headers } from 'node-fetch';
import querystring from 'querystring';

import xmlToJson from '../utils/xmlToJson';
import createXml from '../utils/createXml';
import checkoutResponse from '../utils/checkoutResponse';

export default {

  async create(request: Request, response: Response) {

    const xmlBody = createXml(request.body);

    const params = querystring.stringify({
      email: process.env.CHECKOUT_EMAIL,
      token: process.env.CHECKOUT_TOKEN
    });

    let fetchStatus: number;

    await fetch(`https://ws.sandbox.pagseguro.uol.com.br/v2/checkout?${params}`, {
      method: "POST",
      body: xmlBody,
      headers: new Headers({ "content-type": "application/xml; charset=ISO-8859-1", }),
    }).then( res => {
      fetchStatus = Number(res.status);
      return res.text();
    }).then( (xml: string) => {
      return response.status(fetchStatus).json(xmlToJson(xml));
    }).catch((error) => {
      console.log(error);
      return response.status(400).json({
        error: 'Unexpected error while request checkout.'
      })
    });
  }
}
