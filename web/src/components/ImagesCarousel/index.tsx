import React from 'react';
import { Carousel } from "react-responsive-carousel";

import 'react-responsive-carousel/lib/styles/carousel.min.css';

function ImagesCarousel() {
  return (

    <Carousel
      showArrows={false}
      showStatus={false}
      showIndicators={false}
      infiniteLoop
      showThumbs
      thumbWidth={64}
      useKeyboardArrows
      stopOnHover
    >

      <div>
        <img src="https://www.inspirapersonalizados.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/c/a/caderno-de-anota_es-personalizado-mini-garden-01.jpg" alt="img1"/>
      </div>

      <div>
        <img src="https://www.inspirapersonalizados.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/c/a/caderno-de-anota_es-personalizado-mini-garden-08.jpg" alt="img1"/>
      </div>

      <div>
        <img src="https://www.inspirapersonalizados.com/media/catalog/product/cache/1/thumbnail/303x/9df78eab33525d08d6e5fb8d27136e95/c/o/controle-di_rio-do-beb_-personalizado-mini-garden-01.jpg" alt="img1"/>
      </div>

      <div>
        <img src="https://www.inspirapersonalizados.com/media/catalog/product/cache/1/thumbnail/303x/9df78eab33525d08d6e5fb8d27136e95/c/a/caderno-de-receitas-personalizado-mini-garden-01_1.jpg" alt="img1"/>
      </div>

      <div>
        <img src="https://www.inspirapersonalizados.com/media/catalog/product/cache/1/thumbnail/303x/9df78eab33525d08d6e5fb8d27136e95/a/g/agenda-2021-personalizada-mini-garden-01.jpg" alt="img1"/>
      </div>

    </Carousel>

  );
}

export default ImagesCarousel;

