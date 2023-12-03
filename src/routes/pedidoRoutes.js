const express = require('express');
const pedidoController = require('../controllers/pedidoController');

const router = express.Router();

router.post('/criarpedido', (req, res) => {
    const { cliente, produto, valor } = req.body;

    if (!cliente || !produto || !valor) {
        return res.status(400).json({ erro: 'Os campos cliente, produto e valor são obrigatórios.' });
    }

    const novoPedido = pedidoController.criarPedido(cliente, produto, valor);
    res.status(201).json(novoPedido);
});

module.exports = router;
