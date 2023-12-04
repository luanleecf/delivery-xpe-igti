const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/criarpedido', (req, res) => {
    const { cliente, produto, valor } = req.body;

    if (!cliente || !produto || !valor) {
        return res.status(400).json({ erro: 'Os campos cliente, produto e valor são obrigatórios.' });
    }

    try {
        const novoPedido = pedidoController.criarPedido(cliente, produto, valor);
        res.status(201).json(novoPedido);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar pedido' });
    }
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

router.delete('/excluirpedido/:id', (req, res) => {
    const { id } = req.params;
    try {
        const resultado = pedidoController.excluirPedido(parseInt(id));
        res.json(resultado);
    } catch (error) {
        res.status(404).json({ erro: error.message });
    }
});

router.get('/consultarpedido/:id', (req, res) => {
    const { id } = req.params;
    try {
        const pedidoConsultado = pedidoController.consultarPedido(parseInt(id));
        res.json(pedidoConsultado);
    } catch (error) {
        res.status(404).json({ erro: error.message });
    }
});

router.get('/totalpedidos/:cliente', (req, res) => {
    const { cliente } = req.params;
    try {
        const totalPedidosCliente = pedidoController.calcularTotalPedidosEntreguesPorCliente(
            cliente
        );
        res.json({ cliente, totalPedidosCliente });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao calcular total de pedidos entregues por cliente' });
    }
});

router.get('/totalpedidosporproduto/:produto', (req, res) => {
    const { produto } = req.params;
    try {
        const totalPedidos = pedidoController.calcularTotalPedidosEntreguesPorProduto(produto);
        res.json({ produto, totalPedidos });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao calcular total de pedidos entregues por produto' });
    }
});

router.get('/produtosmaisvendidos', (req, res) => {
    try {
        const produtosMaisVendidos = pedidoController.calcularProdutosMaisVendidos();
        res.json(produtosMaisVendidos);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao calcular produtos mais vendidos' });
    }
});

module.exports = router;
