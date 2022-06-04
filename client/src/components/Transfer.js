import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { URLApi } from '../utils';

const Transfer = () => {

    const location = useLocation();
    const { state } = location;
    const { nroCliente } = state;
    let navigate = useNavigate();

    const [cuentas, setCuentas] = useState([]);
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            nroCliente: nroCliente,
            cuentaOrigen: e.target.cuentaOrigen.value,
            cuentaDestino: e.target.cuentaDestino.value,
            monto: e.target.monto.value
        }
        if(data.cuentaOrigen === data.cuentaDestino) {
            setMessage('No se puede transferir a la misma cuenta');
        }else{
            if(data.monto<=0){
                setMessage('El monto debe ser mayor a 0');
            }else{
                fetch(`${URLApi}/transferencia`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => {
                    setMessage(data.message);
                })
                .catch(err => {
                    console.log(err);
                })
            }
        }
    }

    useEffect(() => {
        fetch(`${URLApi}/cuentas/${nroCliente}`)
        .then(res => res.json())
        .then(data => {
            setCuentas(data);
        });
    }, []);


  return (
    <div className='transfer-form'>
        <form className='form' onSubmit={handleSubmit}>
            <h1 className='form__title'>Realizar Transferencia</h1>
            <h2 className='form__subtitle'>Selecciona la cuenta de origen</h2>
            <select className='form__select' name="cuentaOrigen">
                {cuentas.map(cuenta => {
                    return (
                    <option key={cuenta.numeroCuenta} value={cuenta.numeroCuenta}>{cuenta.numeroCuenta}</option>
                    );
                }
                )}
            </select>
            <h2 className='form__subtitle'>Selecciona la cuenta de destino</h2>
            <select className='form__select' name="cuentaDestino">
                {cuentas.map(cuenta => {
                    return (
                     <option key={cuenta.numeroCuenta} value={cuenta.numeroCuenta}>{cuenta.numeroCuenta}</option>
                    );
                }
                )}
            </select>
            <h2 className='form__subtitle'>Ingrese el monto a transferir</h2>
            <input className='form__input' type='number' name="monto" placeholder='Monto'/>
            <button className='form__button'>Transferir</button>
        </form>
        <h2 className='message'>{message}</h2>
        <button className='form__salir' onClick={() => navigate("/cliente", {state: {nroCliente: nroCliente}})}>Atras</button>

    </div>
  )
}

export default Transfer