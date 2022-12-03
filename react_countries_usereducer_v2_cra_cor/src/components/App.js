import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import SearchPage from './SearchPage'

function App() {
  return (
    <BrowserRouter>
      <SearchPage />
    </BrowserRouter>
  );
}

export default App;
