const express = require('express');
const pedidoController = require('../controllers/pedidoController');

const router = express.Router();

router.post('/criarpedido', async (req, res) => {
    const { cliente, produto, valor } = req.body;

    if (!cliente || !produto || !valor) {
        return res.status(400).json({ erro: 'Os campos cliente, produto e valor são obrigatórios.' });
    }

    try {
        const novoPedido = await pedidoController.criarPedido(cliente, produto, valor);
        res.status(201).json(novoPedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro interno ao criar o pedido.' });
    }
});

module.exports = router;