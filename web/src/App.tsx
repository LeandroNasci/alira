import React from 'react';

import Routes from './routes';

import './assets/styles/global.css';
import AppProvider from './context';

function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
