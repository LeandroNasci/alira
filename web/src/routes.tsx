import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AboutExchanges from './pages/AboutExchanges';
import AboutPayments from './pages/AboutPayments';
import AboutUs from './pages/AboutUs';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Details from './pages/Details';
import Home from './pages/Home';

function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route path="/details" component={Details} />
      <Route path="/cart" component={Cart} />

      <Route path="/about" component={AboutUs} />
      <Route path="/payments" component={AboutPayments} />
      <Route path="/exchanges" component={AboutExchanges} />
      <Route path="/contact" component={Contact} />

    </BrowserRouter>

  );
}

export default Routes;
