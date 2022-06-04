const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    nombre: {type: String},
    numero: {type: String},
    cuentas: [{
        numeroCuenta: {type: String},
        saldo: {type: Number}
    }],
    transferencias: [{
        monto: {type: Number},
        cuentaOrigen: {type: String},
        cuentaDestino: {type: String},
        timeStamp: {type: Date, default: Date.now}
    }],
    timeStamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Client', ClientSchema);