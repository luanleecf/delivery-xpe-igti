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

router.put('/atualizarpedido/:id', (req, res) => {
    const { id } = req.params;
    const { cliente, produto, valor, entregue } = req.body;

    try {
        const pedidoAtualizado = pedidoController.atualizarPedido(
            parseInt(id),
            cliente,
            produto,
            parseFloat(valor),
            entregue
        );
        res.json(pedidoAtualizado);
    } catch (error) {
        res.status(404).json({ erro: error.message });
    }
});

router.put('/atualizarstatusentrega/:id', (req, res) => {
    const { id } = req.params;
    const { entregue } = req.body;

    try {
        const pedidoAtualizado = pedidoController.atualizarStatusEntrega(
            parseInt(id),
            entregue
        );
        res.json(pedidoAtualizado);
    } catch (error) {
        res.status(404).json({ erro: error.message });
    }
});

router.delete('/excluirpedido/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const resultado = pedidoController.excluirPedido(parseInt(id));
        res.json(resultado);
    } catch (error) {
        res.status(404).json({ erro: error.message });
    }
});

module.exports = router;
