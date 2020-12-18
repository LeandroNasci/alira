import { ElementCompact } from 'xml-js';

const checkoutResponse = (responseObject: ElementCompact) => {
  return {
    code: responseObject.checkout.code._text,
    date: responseObject.checkout.date._text,
  };
}

export default checkoutResponse;
