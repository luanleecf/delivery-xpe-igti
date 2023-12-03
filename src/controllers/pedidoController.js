const fs = require('fs').promises;
const path = require('path');

const pedidosFilePath = path.join(__dirname, '../', 'data', 'pedidos.json');

async function lerArquivoPedidos() {
    try {
        const arquivo = await fs.readFile(pedidosFilePath, 'utf-8');
        return JSON.parse(arquivo);
    } catch (error) {
        throw new Error('Erro ao ler arquivo de pedidos');
    }
}

async function salvarArquivoPedidos(dados) {
    try {
        const arquivo = JSON.stringify(dados, null, 2);
        await fs.writeFile(pedidosFilePath, arquivo, 'utf-8');
    } catch (error) {
        throw new Error('Erro ao salvar arquivo de pedidos');
    }
}

async function criarPedido(cliente, produto, valor) {
    const pedidos = await lerArquivoPedidos();
    const novoPedido = {
        id: pedidos.nextId,
        cliente,
        produto,
        valor,
        entregue: false,
        timestamp: new Date().toISOString(),
    };
    pedidos.pedidos.push(novoPedido);
    pedidos.nextId++;
    await salvarArquivoPedidos(pedidos);
    return novoPedido;
}

async function atualizarPedido(id, cliente, produto, valor, entregue) {
    const pedidos = await lerArquivoPedidos();
    const index = pedidos.pedidos.findIndex((pedido) => pedido.id === id);

    if (index === -1) {
        throw new Error('Pedido não encontrado');
    }

    const pedidoAtual = pedidos.pedidos[index];
    pedidoAtual.cliente = cliente !== undefined ? cliente : pedidoAtual.cliente;
    pedidoAtual.produto = produto !== undefined ? produto : pedidoAtual.produto;
    pedidoAtual.valor = valor !== undefined ? valor : pedidoAtual.valor;
    pedidoAtual.entregue = entregue !== undefined ? entregue : pedidoAtual.entregue;
    pedidoAtual.timestamp = new Date().toISOString();

    await salvarArquivoPedidos(pedidos);
    return pedidoAtual;
}

async function atualizarStatusEntrega(id, entregue) {
    const pedidos = await lerArquivoPedidos();
    const index = pedidos.pedidos.findIndex((pedido) => pedido.id === id);
    if (index === -1) {
        throw new Error('Pedido não encontrado');
    }
    pedidos.pedidos[index].entregue = entregue;
    pedidos.pedidos[index].timestamp = new Date().toISOString();
    await salvarArquivoPedidos(pedidos);
    return pedidos.pedidos[index];
}

async function excluirPedido(id) {
    const pedidos = await lerArquivoPedidos();
    pedidos.pedidos = pedidos.pedidos.filter((pedido) => pedido.id !== id);
    await salvarArquivoPedidos(pedidos);
    return { mensagem: 'Pedido excluído com sucesso!' };
}

async function consultarPedido(id) {
    const pedidos = await lerArquivoPedidos();

    // Encontrar o pedido com o ID fornecido
    const pedido = pedidos.pedidos.find((pedido) => pedido.id === id);

    if (!pedido) {
        throw new Error('Pedido não encontrado');
    }

    return pedido;
}

module.exports = {
    criarPedido,
    atualizarPedido,
    atualizarStatusEntrega,
    excluirPedido,
    consultarPedido,
};