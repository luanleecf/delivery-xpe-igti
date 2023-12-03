const mongoose = require('../config/mongoose');

const Pedido = mongoose.model('Pedido', {
    cliente: String,
    produto: String,
    valor: Number,
    entregue: Boolean,
    timestamp: String,
});

async function criarPedido(cliente, produto, valor) {
    const novoPedido = new Pedido({
        cliente,
        produto,
        valor,
        entregue: false,
        timestamp: new Date().toISOString(),
    });

    try {
        await novoPedido.save();
        return novoPedido;
    } catch (error) {
        throw new Error('Erro ao criar o pedido');
    }
}

module.exports = {
    criarPedido,
};