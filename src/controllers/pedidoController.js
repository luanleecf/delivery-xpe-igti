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
function atualizarPedido(id, cliente, produto, valor, entregue) {
    const pedidos = lerArquivoPedidos();
    // Encontrar o índice do pedido com o ID fornecido
    const index = pedidos.pedidos.findIndex((pedido) => pedido.id === id);
    // Verificar se o pedido existe
    if (index === -1) {
        throw new Error('Pedido não encontrado');
    }
    // Atualizar os campos fornecidos
    pedidos.pedidos[index].cliente = cliente;
    pedidos.pedidos[index].produto = produto;
    pedidos.pedidos[index].valor = valor;
    pedidos.pedidos[index].entregue = entregue;
    pedidos.pedidos[index].timestamp = new Date().toISOString();
    // Salvar as alterações no arquivo
    salvarArquivoPedidos(pedidos);
    return pedidos.pedidos[index];
}

module.exports = {
    criarPedido,
    atualizarPedido, // Adicionado para suportar a atualização de pedidos
};