const express = require('express');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/pedidos', pedidoRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
