const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/delivery-api'; // URL de conexão com o MongoDB

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
    console.log('Conexão bem-sucedida com o MongoDB');
});

module.exports = mongoose;