import Order from "src/models/Order";

export default {
  render(order: Order) {
    return {
      order_id: order.order_id,
      email: order.email,
      phone: order.phone,
      cpf: order.cpf,
      invoice: order.invoice,
      shippingCategory: order.shippingCategory,
      shippingCost: order.shippingCost,
      shipping: order.shipping,
    };
  },

  renderMany(orders: Order[]) {
    return orders.map(order => {
        return this.render(order);
    });
  }
};
