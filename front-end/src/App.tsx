import './App-Dark.css';
import './App-Light.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing';
import Vending from './pages/Vending';
import {VendingProvider} from './context/VendingContext'

function App() {
  return (
    <BrowserRouter>
      <VendingProvider>
        <Routes>
          <Route path= "/" element= {<Landing/>}/>
          <Route path= "Vending" element= {<Vending/>}/>
        </Routes>
      </VendingProvider>
    </BrowserRouter>
    
  );
}

export default App;
