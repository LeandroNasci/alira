import Product from "../models/Product";
import Image from "../models/Image";
import imagesView from './images_view';

export default {
  render(product: Product, images: Image[]) {
    return {
      id: product.id,
      code: product.code,
      category: product.category,
      name: product.name,
      description: product.description,
      stock: product.stock,
      price: product.price,
      weight: product.weight,
      length: product.length,
      width: product.width,
      height: product.height,
      images: imagesView.renderMany(images),
    };
  },

  renderMany(allProducts: Product[], allImages: Image[]) {

    return allProducts.map(
      product => {
        const yourImages = allImages.filter(image => image.product_id === product.id );
        return this.render(product, yourImages);
    });
  }
};
