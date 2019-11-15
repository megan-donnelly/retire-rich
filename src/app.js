import React from 'react';

import { Sidebar } from './components';
import Routes from './routes';

function App() {
  return (
    <div id="main">
      <Sidebar />
      <Routes />
    </div>
  );
}

export default App;
