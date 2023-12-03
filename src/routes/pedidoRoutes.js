const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/criarpedido', async (req, res) => {
    const { cliente, produto, valor } = req.body;

    if (!cliente || !produto || !valor) {
        return res.status(400).json({ erro: 'Os campos cliente, produto e valor são obrigatórios.' });
    }

    try {
        const novoPedido = await pedidoController.criarPedido(cliente, produto, valor);
        res.status(201).json(novoPedido);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar pedido' });
    }
});

router.put('/atualizarpedido/:id', async (req, res) => {
    const { id } = req.params;
    const { cliente, produto, valor, entregue } = req.body;

    try {
        const pedidoAtualizado = await pedidoController.atualizarPedido(
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

router.put('/atualizarstatusentrega/:id', async (req, res) => {
    const { id } = req.params;
    const { entregue } = req.body;

    try {
        const pedidoAtualizado = await pedidoController.atualizarStatusEntrega(
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
        const resultado = await pedidoController.excluirPedido(parseInt(id));
        res.json(resultado);
    } catch (error) {
        res.status(404).json({ erro: error.message });
    }
});


router.get('/consultarpedido/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pedidoConsultado = await pedidoController.consultarPedido(parseInt(id));
        res.json(pedidoConsultado);
    } catch (error) {
        res.status(404).json({ erro: error.message });
    }
});

module.exports = router;
