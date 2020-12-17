import { CartItem } from '../context/shoppingCart';
import { FormData } from '../context/formData'
import { Shipping } from '../context/shippingType';
import { cepSanitization, cpfSanitization } from './sanatizations';

interface Checkout  {
  formData: FormData
  shipping: Shipping
  addedItems: CartItem[];
  cartWeight: number;
  orderId: number;
}

export default function serializeCheckout (props: Checkout) {

  const { formData, shipping, addedItems, cartWeight, orderId } = props;

  const cost = shipping.price
                .toFixed(2)
                .toString();

  const amount = addedItems
                  .reduce( (total, currentItem) => (total + (currentItem.price * currentItem.quantity) ), 0)
                  .toFixed(2)
                  .toString();

  const phone = formData.phone
                  .toString()
                  .trim()
                  .split(") ")
                  .map(element => element.replace(new RegExp(/[()-]/g, ""), ""));

  const postalcode = cepSanitization(formData.shippingAddress.cep);
  const cpfNumber = cpfSanitization(formData.cpf || '');
  // const cnpjNumber = cnpjSanitization(formData.cnpj || '');

  let shippingData;

  if(shipping.category === 3){
    shippingData = {
      addressRequired: { _text: "false" },
      type: { _text: String(shipping.category) },                               // Tipo envio (PAC SEDEX OUTROS)
      cost: { _text: String(shipping.price) }                                   // Frete
    };
  }
  else {
    shippingData = {
      addressRequired: { _text: "true" },
      address: {                                                                // Endereco envio
        street: { _text: formData.shippingAddress.street },
        number: { _text: formData.shippingAddress.number },
        complement: { _text: formData.shippingAddress.complement },
        district: { _text: formData.shippingAddress.district },
        city: { _text: formData.shippingAddress.city},
        state: { _text: formData.shippingAddress.state},
        country: { _text: "BRA" },
        postalCode: { _text: postalcode }
      },
      type: { _text: String(shipping.category) },                               // Tipo envio (PAC SEDEX OUTROS)
      cost: { _text: cost }                                                     // Frete
    };
  }

  const compactJson = {
    _declaration: {
      _attributes: {
        version: "1.0"
      }
    },
    checkout: {
      currency: { _text: "BRL" },                                               // Moeda
      items: {
        item: {
          id: { _text: String(orderId) },                                       // ID do carrinho
          description: { _text: `Pedido ${String(orderId)}` },                  // Descricao carrinho
          amount: { _text: String(amount) },                                    // Preco carrinho
          quantity: { _text: "1" },
          weight: { _text: cartWeight }                                         // Peso carrinho
        }
      },
      shipping: shippingData,
      sender: {
        name: { _text: `${formData.invoice.name} ${formData.invoice.lastname}` }, // Nome nota fiscal
        email: { _text: formData.email },                                       // Email comprador
        phone: {                                                                // Telefone comprador
          areaCode: { _text: phone[0] },
          number: { _text: phone[1] }
        },
        documents: {
          document: {                                                           // Documento nota fiscal
            type: { _text: "CPF" },
            value: { _text: cpfNumber }
          }
        }
      },
      reference: { _text: `Pedido ${String(orderId)}` },                        // ID da compra
      redirectURL: { _text: "http://localhost:3000/about" },
      receiver: {
        email: { _text: "aliranotes@gmail.com" }                                // Email vendedor
      },
      enableRecover: { _text: "false" },                                        // Recuperar carrinho
      timeout: { _text: "25" },                                                 // Expiracao do checkout
      maxUses: { _text: "999" },
      maxAge: { _text: "999999999" },
      extraAmount: { _text: "0.00" }                                           // Taxa ou desconto sobre o total
    }
  }

  return compactJson;
};
