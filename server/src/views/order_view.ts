import Order from "src/models/Order";

export default {
  render(order: Order) {
    return {
      order_id: order.order_id,
      email: order.email,
      phone: order.phone,
      cpf: order.cpf,
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
    };
  },

  renderMany(orders: Order[]) {
    return orders.map(order => {
        return this.render(order);
    });
  }
};
