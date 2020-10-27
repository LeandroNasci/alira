import React from 'react';
import { Carousel } from "react-responsive-carousel";

import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface ImageCarouselProps {
  images: Array<{
    url: string;
  }>;
}

function ImagesCarousel({ images }: ImageCarouselProps) {
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
      {images.map((image, index) => {
        return (
          <div key={image.url}>
            <img src={image.url} alt={`imagem_${index}`}/>
          </div>
        );
      })}
    </Carousel>

  );
}

export default ImagesCarousel;

