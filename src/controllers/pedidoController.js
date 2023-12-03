const fs = require('fs');
const path = require('path');

const pedidosFilePath = path.join(__dirname, '../', 'data', 'pedidos.json');

function lerArquivoPedidos() {
    const arquivo = fs.readFileSync(pedidosFilePath, 'utf-8');
    return JSON.parse(arquivo);
}

function salvarArquivoPedidos(dados) {
    const arquivo = JSON.stringify(dados, null, 2);
    fs.writeFileSync(pedidosFilePath, arquivo, 'utf-8');
}

function getNextId() {
    const pedidos = lerArquivoPedidos();
    const nextId = pedidos.nextId;
    pedidos.nextId++;
    salvarArquivoPedidos(pedidos);
    return nextId;
}

function criarPedido(cliente, produto, valor) {
    const pedidos = lerArquivoPedidos();

    const novoPedido = {
        id: getNextId(),
        cliente,
        produto,
        valor,
        entregue: false,
        timestamp: new Date().toISOString(),
    };

    pedidos.pedidos.push(novoPedido);
    salvarArquivoPedidos(pedidos);

    return novoPedido;
}

module.exports = {
    criarPedido,
};
