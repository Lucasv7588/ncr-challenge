const mongoose = require('mongoose');
const Client = require('../models/models');

const getClientes = (req, res) => {
    Client.find({}, (err, clientes) => {
        err && res.status(500).send(err.message);
        res.status(200).json(clientes);
    });
}


const getCuentas = (req, res) => {
    Client.findOne({ numero: req.params.cliente},(err, client) => {
        err && res.status(500).send(err.message);
        if(client){
            res.status(200).json(client.cuentas);
        }else{
            res.status(200).json({
                message: 'No se encontro el cliente'
            })
        }
    });
};

const getCuenta = (req, res) => {
    Client.findOne({ numero: req.params.cliente, cuenta:{
        $elemMatch: {
            numeroCuenta: req.params.cuenta
        }
    }},(err, client) => {
        err && res.status(500).send(err.message);
        res.status(200).json(client.cuentas.find(cuenta => cuenta.numeroCuenta === req.params.cuenta));
    });
};

const setTransferencia = (req, res) => {
    const { monto, nroCliente, cuentaOrigen, cuentaDestino } = req.body;
    Client.findOne({ numero: nroCliente }, (err, client) => {
        err && res.status(500).send(err.message);
        if (client) {
            const cuentaOrigenIndex = client.cuentas.findIndex(cuenta => cuenta.numeroCuenta === cuentaOrigen);
            const cuentaDestinoIndex = client.cuentas.findIndex(cuenta => cuenta.numeroCuenta === cuentaDestino);
            if (cuentaOrigenIndex !== -1 && cuentaDestinoIndex !== -1) {
                if (client.cuentas[cuentaOrigenIndex].saldo >= monto) {
                    client.cuentas[cuentaOrigenIndex].saldo -= monto;
                    client.cuentas[cuentaDestinoIndex].saldo = parseFloat(client.cuentas[cuentaDestinoIndex].saldo) + parseFloat(monto);
                    client.transferencias = [
                        ...client.transferencias,
                        {
                        monto: monto,
                        cuentaOrigen: cuentaOrigen,
                        cuentaDestino: cuentaDestino
                    }]
                    client.save((err, client) => {
                        err && res.status(500).send(err.message);
                        res.status(200).json({
                            message: 'Transferencia exitosa'
                        })
                    });
                } else {
                    res.status(200).json({
                        message: 'No hay suficiente dinero en la cuenta de origen'
                    })
                }
            } else {
                res.status(200).json({
                    message: 'No se encontro la cuenta de origen o destino'
                })
            }
        } else {
            res.status(200).json({
                message: 'No se encontro el cliente'
            })
        }
    }
    )};

const getTransferencias = (req, res) => {
    Client.findOne({ numero: req.params.nroCliente }, (err, client) => {
        err && res.status(500).send(err.message);
        //comprobar si se encontro cliente
        if (client) {
            res.status(200).json(client.transferencias);
        }else{
            res.status(200).json({
                message: 'No se encontro el cliente'
            })
        }
    });
}


const setClient = (req, res) => {
    let client = new Client({
        nombre: req.body.nombre,
        numero: req.body.numero
    });
    client.save((err, client) => {
        err && res.status(500).send(err.message);
        res.status(200).json(client);
    })
}

const setCuenta = (req, res) => {
    Client.findOneAndUpdate({ numero: req.params.numero }, {
        $push: {
            cuentas: {
                numeroCuenta: req.body.numeroCuenta,
                saldo: req.body.saldo
            }
        }
    }, (err, client) => {
        err && res.status(500).send(err.message);
        res.status(200).json(client.cuentas);
    })
}

module.exports = { getCuentas, getCuenta, setTransferencia, getTransferencias, setClient, setCuenta, getClientes };