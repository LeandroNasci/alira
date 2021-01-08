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

  const cpfNumber = cpfSanitization(formData.cpf);
  // const cnpjNumber = cnpjSanitization(formData.cnpj || '');

  const postalcode = (shipping.category === 3)
    ? '13560049'
    : cepSanitization(formData.shippingAddress.cep);

  const urlSearchParams = (shipping.category === 3)
    ? {
      currency: 'BRL',
      itemId1: String(orderId),
      itemDescription1: `Pedido ${String(orderId)}`,
      itemAmount1: String(amount),
      itemQuantity1: '1',
      itemWeight1: String(cartWeight),
      shippingAddressRequired: 'false',
      senderName: `${formData.invoice.name} ${formData.invoice.lastname}`,
      senderEmail: formData.email,
      senderAreaCode: phone[0],
      senderPhone: phone[1],
      senderCPF: cpfNumber,
      reference: `orderId=${String(orderId)}`,
      receiverEmail: 'aliranotes@gmail.com',
      enableRecover: 'false',
      timeout: '30',
      maxUses: '999',
      maxAge: '999999999',
      extraAmount: '0.00',
    }
    : {
      currency: 'BRL',
      itemId1: String(orderId),
      itemDescription1: `Pedido ${String(orderId)}`,
      itemAmount1: String(amount),
      itemQuantity1: '1',
      itemWeight1: String(cartWeight),
      shippingAddressRequired: 'true',
      shippingAddressStreet: formData.shippingAddress.street,
      shippingAddressNumber: formData.shippingAddress.number,
      shippingAddressComplement: formData.shippingAddress.complement,
      shippingAddressDistrict: formData.shippingAddress.district,
      shippingAddressCity: formData.shippingAddress.city,
      shippingAddressState: formData.shippingAddress.state,
      shippingAddressCountry: 'BRA',
      shippingAddressPostalCode: postalcode,
      shippingType: String(shipping.category),
      shippingCost: cost,
      senderName: `${formData.invoice.name} ${formData.invoice.lastname}`,
      senderEmail: formData.email,
      senderAreaCode: phone[0],
      senderPhone: phone[1],
      senderCPF: cpfNumber,
      reference: `orderId=${String(orderId)}`,
      receiverEmail: 'aliranotes@gmail.com',
      enableRecover: 'false',
      timeout: '30',
      maxUses: '999',
      maxAge: '999999999',
      extraAmount: '0.00',
    }

  return urlSearchParams;
};
