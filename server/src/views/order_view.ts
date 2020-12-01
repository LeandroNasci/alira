import Order from 'src/models/Order';
import Item from 'src/models/Item'

export default {
  render(order: Order, items: Item[]) {
    return {
      order_id: order.order_id,
      email: order.email,
      phone: order.phone,
      cpf: order.cpf,
      cnpj: order.cnpj,
      invoice: {
        name: order.invoice_name,
        lastname: order.invoice_lastname,
        cep: order.invoice_cep,
        street: order.invoice_street,
        number: order.invoice_number,
        complement: order.invoice_complement,
        district: order.invoice_district,
        city: order.invoice_city,
        state: order.invoice_state,
      },
      shippingCategory: order.shipping_category,
      shippingCost: order.shipping_cost,
      shipping: {
        name: order.shipping_name,
        lastname: order.shipping_lastname,
        cep: order.shipping_cep,
        street: order.shipping_street,
        number: order.shipping_number,
        complement: order.shipping_complement,
        district: order.shipping_district,
        city: order.shipping_city,
        state: order.shipping_state,
      },
      items: items.map(item => ({
        code: item.code,
        quantity: item.quantity,
      }))
    };
  },

  renderMany(orders: Order[], allItems: Item[]) {
    return orders.map(
      order => {
        const yourItems = allItems.filter(item => item.order_id === order.order_id );
        return this.render(order, yourItems);
    });
  }
};
