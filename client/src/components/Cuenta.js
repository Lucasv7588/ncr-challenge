import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { URLApi } from '../utils';

const Cuenta = () => {

    const location = useLocation();
    const { state } = location;
    const { nroCliente, nroCuenta } = state;
    let navigate = useNavigate();
    const [cuenta, setCuenta] = useState([]);

    const handleBack = () => {
        navigate("/cliente", {state: {nroCliente: nroCliente}});
    }

    useEffect(() => {
        fetch(`${URLApi}/cuenta/${nroCliente}/${nroCuenta}`)
        .then(res => res.json())
        .then(data => {
            setCuenta(data);
        });
    }, []);

  return (
    <div className='menu'>
        <h2 className='menu__subtitle'>Consulta de saldo</h2>
        <div className='menu__items items'>
            <div className='cuenta'>
                <div className='items__item'>
                    <p className='items__title'>Cuenta nro: {cuenta.numeroCuenta}</p>
                    <span className='items__client'>Saldo: {cuenta.saldo}</span>
                </div>
            </div>
        </div>
        <button className='menu__salir' onClick={() => handleBack()}>Atras</button>
    </div>
  )
}

export default Cuenta