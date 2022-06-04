const Controllers = require('../controllers/controllers');
const express = require('express');

const router = express.Router();

router.get('/clientes', Controllers.getClientes);
router.get('/cuentas/:cliente', Controllers.getCuentas);
router.get('/cuenta/:cliente/:cuenta', Controllers.getCuenta);
router.post('/transferencia', Controllers.setTransferencia);
router.get('/transferencias/:nroCliente', Controllers.getTransferencias);
router.post('/cliente', Controllers.setClient);
router.post('/cuenta/:numero', Controllers.setCuenta);

module.exports = router;