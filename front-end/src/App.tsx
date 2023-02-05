import React from 'react';
import './App.css';
import Interface from './components/Interface';
import Items from './components/Items'
import {VendingProvider} from './context/VendingContext'

function App() {
  return (
    <VendingProvider>
      <div
      style={{height: "100%", width: "100%"}}
      >
        <div className='Vending'>
          <div className='Vending-Inner'>
            <Items/>
          </div>
        </div>
        <Interface/>

      </div>
    </VendingProvider>
    
  );
}

export default App;
