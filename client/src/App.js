import React, { useState, useEffect } from 'react';
import Logo from './img/logo.png'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import { URLApi } from './utils';
import ListClientes from './components/ListClientes';
import ListCuentas from './components/ListCuentas';
import Cuenta from './components/Cuenta';
import Transfer from './components/Transfer';
import ListTransfer from './components/ListTransfer';

function App() {

  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    setLoading(true);
    fetch(`${URLApi}/clientes`)
    .then(res => res.json())
    .then(data => {
      setClientes(data);
      setLoading(false);
    });
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <header className='header'>
        <img src={Logo} alt="logo img" className='header__img' />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListClientes clientes={clientes} />} />
          <Route path="/cliente/" element={<ListCuentas />} />
          <Route path="/cuenta/" element={<Cuenta />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/transferencias" element={<ListTransfer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
