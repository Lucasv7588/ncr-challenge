import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { URLApi } from '../utils';


const ListTransfer = () => {
    
    const location = useLocation();
    const { state } = location;
    const { nroCliente } = state;
    let navigate = useNavigate();
    
    const [transferencias, setTransferencias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        console.log(`${URLApi}/transferencias/${nroCliente}`)
        fetch(`${URLApi}/transferencias/${nroCliente}`)
        .then(res => res.json())
        .then(data => {
            let res = []
            let cont = 1;
            for (let item of data){
                if( cont <= 5 ){
                    res.push(item);
                    cont++;
                }
            }
            setTransferencias(res);
        })
    }, []);



  return (
    <div className='menu'>
        <h1 className='menu__title'>Transferencias</h1>
        <h2 className='menu__subtitle'>Ultimas 5 Transferencias</h2>
        <div className='menu__items items'>
            {transferencias.map(item => (
                <div className='cuenta'>
                    <div key={item.monto} className='items__item'>
                        <span className='item__client'>Monto: ${item.monto}</span>
                        <span className='item__client'>Cuenta de origen: {item.cuentaOrigen}</span>
                        <span className='item__client'>Cuenta de destino: {item.cuentaDestino}</span>
                    </div>
                </div>
            ))
            }
        </div>
        <button className='form__salir' onClick={() => navigate("/cliente", {state: {nroCliente: nroCliente}})}>Atras</button>
    </div>
  )
}

export default ListTransfer