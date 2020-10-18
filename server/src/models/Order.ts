export default interface Order {
  order_id: number;
  email: string;
  phone: string;
  cpf: string;
  invoice: {
    name: string;
    lastname: string;
    cep: string;
    street: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    uf: string;
  };
  shippingCategory: string;
  shippingCost: string;
  shipping: {
    name: string;
    lastname: string;
    cep: string;
    street: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    uf: string;
  };
}
