const config = require('../config/config')
const mongoose = require('mongoose');
const url = config.bd_string;


    mongoose.connect(url, { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true });
    mongoose.set('useCreateIndex', true); //Para não dar mensagem de depreciação

    mongoose.connection.on('error', (err) => {
        console.log("Erro na conexão com o banco de dados" + err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log("Aplicação desconectada do banco de dados!");
    });

    mongoose.connection.on('connected', () => { console.log("CONECTADO COM SUCESSO") });

    module.exports = mongoose;
