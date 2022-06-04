import React from 'react'
import { Link } from 'react-router-dom'

const ListClientes = ({clientes}) => {
  return (
    <div className='menu'>
        <h1 className='menu__title'>Seleccion de clientes</h1>
        <h2 className='menu__subtitle'>Selecciona el cliente a consultar</h2>
        <div className='menu__items items'>
            {clientes.map(cliente => (
                <Link to={'/cliente'} key={cliente.numero} state={{nroCliente: cliente.numero}}>
                    <div className='items__item' key={cliente.id}>
                        <p className='items__title'>{cliente.nombre}</p>
                        <span className='item__client'>Nro: {cliente.numero}</span>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default ListClientes