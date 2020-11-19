import React from 'react';

import Skeleton from '../../Skeketon';

import { Container } from './styles';

const LoadingProduct: React.FC = () => {
  return (
    <Container>
      <div id="loading-product" className="panel-no-shadow">
        <Skeleton className="img-skeleton" />
        <Skeleton className="row-skeleton" />
        <Skeleton className="row-skeleton" />
        <Skeleton className="row-skeleton" />
      </div>
    </Container>
  );
}

export default LoadingProduct;
