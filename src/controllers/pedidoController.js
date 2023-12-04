// const fs = require('fs').promises;
const fs = require('fs');
const path = require('path');

const pedidosFilePath = path.join(__dirname, '..', 'data', 'pedidos.json');

function lerArquivoPedidos() {
    try {
        const arquivo = fs.readFileSync(pedidosFilePath, 'utf-8');
        return JSON.parse(arquivo);
    } catch (error) {
        console.error('Erro ao ler o arquivo de pedidos:', error.message);
        throw new Error('Erro ao ler o arquivo de pedidos');
    }
}

function salvarArquivoPedidos(dados) {
    try {
        const arquivo = JSON.stringify(dados, null, 2);
        fs.writeFileSync(pedidosFilePath, arquivo, 'utf-8');
    } catch (error) {
        console.error('Erro ao salvar arquivo de pedidos:', error.message);
        throw new Error('Erro ao salvar arquivo de pedidos');
    }
}

function criarPedido(cliente, produto, valor) {
    try {
        const pedidos = lerArquivoPedidos();

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
        salvarArquivoPedidos(pedidos);

        return novoPedido;
    } catch (error) {
        console.error('Erro ao criar pedido:', error.message);
        throw new Error('Erro ao criar pedido');
    }
}

function atualizarPedido(id, cliente, produto, valor, entregue) {
    const pedidos = lerArquivoPedidos();
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

    salvarArquivoPedidos(pedidos);
    return pedidoAtual;
}

function atualizarStatusEntrega(id, entregue) {
    const pedidos = lerArquivoPedidos();
    const index = pedidos.pedidos.findIndex((pedido) => pedido.id === id);
    if (index === -1) {
        throw new Error('Pedido não encontrado');
    }
    pedidos.pedidos[index].entregue = entregue;
    pedidos.pedidos[index].timestamp = new Date().toISOString();
    salvarArquivoPedidos(pedidos);
    return pedidos.pedidos[index];
}

function excluirPedido(id) {
    const pedidos = lerArquivoPedidos();
    pedidos.pedidos = pedidos.pedidos.filter((pedido) => pedido.id !== id);
    salvarArquivoPedidos(pedidos);
    return { mensagem: 'Pedido excluído com sucesso!' };
}

function consultarPedido(id) {
    const pedidos = lerArquivoPedidos();
    const pedido = pedidos.pedidos.find((pedido) => pedido.id === id);
    if (!pedido) {
        throw new Error('Pedido não encontrado');
    }
    return pedido;
}

function calcularTotalPedidosEntreguesPorCliente(cliente) {
    const pedidos = lerArquivoPedidos();
    console.log(pedidos);
    const pedidosEntreguesCliente = pedidos.pedidos.filter(
        (pedido) => pedido.cliente === cliente && pedido.entregue
    );
    if (pedidosEntreguesCliente.length === 0) {
        return 0;
    }
    const totalPedidosCliente = pedidosEntreguesCliente.reduce(
        (total, pedido) => total + pedido.valor,
        0
    );
    return totalPedidosCliente;
}

function calcularTotalPedidosEntreguesPorProduto(nomeProduto) { 
    const pedidos = lerArquivoPedidos();
    console.log(pedidos.length + 'a');
    const pedidosEntreguesCliente = pedidos.produto.filter(
        (pedido) => pedido.produto === produto && pedido.entregue
    );
    console.log(pedidosEntreguesCliente.length)
    if (pedidosEntreguesCliente.length === 0) {
        return 0;
    }
      const totalPedidosCliente = pedidosEntreguesCliente.reduce(
        (total, pedido) => total + pedido.valor,
        0
    );
    return totalPedidosCliente;
}

function calcularTotalPedidosEntreguesPorProduto(nomeProduto) {
    const pedidos = lerArquivoPedidos();
    console.log(pedidos)
    let totalPedidos = 0;
    for (const pedido of pedidos.pedidos) {
        if (pedido.produto === nomeProduto && pedido.entregue) {
            totalPedidos += pedido.valor;
        }
    }
    console.log('valor total: ' + totalPedidos)
    return totalPedidos;
}

function calcularProdutosMaisVendidos() {
    const pedidos = lerArquivoPedidos();
    const pedidosEntregues = pedidos.pedidos.filter((pedido) => pedido.entregue);
    const quantidadePorProduto = {};
    pedidosEntregues.forEach((pedido) => {
        if (!quantidadePorProduto[pedido.produto]) {
            quantidadePorProduto[pedido.produto] = 1;
        } else {
            quantidadePorProduto[pedido.produto]++;
        }
    });
    const produtosMaisVendidos = Object.entries(quantidadePorProduto)
        .sort((a, b) => b[1] - a[1])
        .map(([produto, quantidade]) => `${produto} - ${quantidade}`);
    return produtosMaisVendidos;
}

module.exports = {
    criarPedido,
    atualizarPedido,
    atualizarStatusEntrega,
    excluirPedido,
    consultarPedido,
    calcularTotalPedidosEntreguesPorCliente,
    calcularTotalPedidosEntreguesPorProduto,
    calcularProdutosMaisVendidos
};