
const users = require('../models/user');
const bcrypt = require('bcrypt');

class UserController {

    async post(req, res) {
        const {email, passWord} = req.body;
        if(!email || !passWord){return res.status(412).json({error: "Dados insuficientes!"})}
        await users.findOne({email}, (err, data) => {
            if(err){
                return res.status(400).json(err);
            }
            else if(data){
                return res.status(200).json({error: "Este email ja foi cadastrado"});
            }
            else{

                users.create({email, passWord}, (err, data) => {
                    if (err) {
                        return res.status(400).json(err);
                    }
                    else if (!data) {
                        return res.status(200).json({ error: "O usuário não foi criado" });
                    }
                    else {
                        return res.status(200).json(data);
                    }
                });
            }
        });

        
    }

    async get(req, res) {

        await users.find({}, (err, data) => {
            if (err) {
                return res.status(400).json(err);
            }
            else if (!data) {
                return res.status(200).json({ error: "Usuário(s) não encontrado(s)!" });
            }
            else {
                return res.status(200).json(data);
            }
        });
    }

    async findOne(req, res) {
        const { _id } = req.params;

        await users.findOne({ _id }, (err, data) => {
            if (err) {
                return res.status(400).json(err);
            }
            else if (!data) {
                return res.status(200).json({ error: "Usuário não encontrado!" });
            }
            else {
                return res.status(200).json(data);
            }
        });
    }

    async auth(req, res) {
        const { email, passWord } = req.body;

        if (!email || !passWord) return res.send({ error: 'Dados insuficientes!' });

        users.findOne({ email }, (err, data) => {
            if (err) {
                return res.status(400).json(err);
            }
            else if (!data) {
                return res.status(200).json({ error: "Usuário não registrado!" });
            }
            else {
                bcrypt.compare(passWord, data.passWord, (err, same) => {
                    if (!same) {
                        return res.status(400).json({ error: "Senha incorreta!" });
                    }
                    else {
                        data.passWord = undefined;
                        return res.status(200).json(data);
                    }
                });
            }
        }).select('+passWord');
    }
}

module.exports = new UserController();