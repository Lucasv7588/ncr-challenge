import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { URLApi } from '../utils';

const ListCuentas = () => {

    const location = useLocation();
    const { state } = location;
    const nroCliente = state.nroCliente;
    let navigate = useNavigate();

    const [cuentas, setCuentas] = useState([]);

    useEffect(() => {
        fetch(`${URLApi}/cuentas/${nroCliente}`)
        .then(res => res.json())
        .then(data => {
            setCuentas(data);
        });
    }, [nroCliente])
    
    const handleTransferButton = () => {
        navigate("/transfer", {state: {nroCliente: nroCliente}});
    }
    const handleVerTransfer = () => {
        navigate("/transferencias", {state: {nroCliente: nroCliente}});
    }

  return (
    <div className='menu'>
        <h1 className='menu__title'>Consulta de saldo</h1>
        <h2 className='menu__subtitle'>Selecciona la cuenta a consultar</h2>
        <div className='menu__items items'>
            {
                cuentas.map(cuenta => (
                    <Link to={'/cuenta'}  state={{nroCliente: nroCliente, nroCuenta: cuenta.numeroCuenta}}>
                        <div key={cuenta.numeroCuenta} className='items__item'>
                            <p className='items__title'>Numero de cuenta:</p>
                            <span className='items__client'>{cuenta.numeroCuenta}</span>
                        </div>
                    </Link>
                ))
            }
            
        </div>
        <button className='menu__salir' onClick={() => navigate("/")}>Atras</button>
        <div className='transferencias'>
            <button className='transferencias__boton' onClick={() => handleVerTransfer()}>Ver Transferencias</button>
            <button className='transferencias__boton' onClick={() => handleTransferButton()}>Realizar Transferencia</button>
        </div>
      </div>
  )
}

export default ListCuentas