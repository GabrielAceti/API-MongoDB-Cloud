const jwt = require('jsonwebtoken');
const users = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('../../config/config');

const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pwd, { expiresIn: config.jwt_expiresIn });
}

class UserController {

    post(req, res) {
        const { email, passWord } = req.body;
        if (!email || !passWord) { return res.status(412).json({ error: "Dados insuficientes!" }) }

        users.findOne({ email }, (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            else if (data) {
                return res.status(201).json({ error: "Este email ja foi cadastrado" });
            }
            else {

                users.create({ email, passWord }, (err, data) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    else if (!data) {
                        return res.status(400).json({ error: "O usuário não foi criado" });
                    }
                    else {
                        return res.status(200).json({ data, token: createUserToken(data._id) });
                    }
                });
            }
        });


    }

    get(req, res) {

        users.find({}, (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            else if (!data) {
                return res.status(400).json({ error: "Usuário(s) não encontrado(s)!" });
            }
            else {
                return res.status(200).json(data);
            }
        });
    }

    findOne(req, res) {
        const { _id } = req.params;

        users.findOne({ _id }, (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            else if (!data) {
                return res.status(400).json({ error: "Usuário não encontrado!" });
            }
            else {
                return res.status(200).json(data);
            }
        });
    }

    auth(req, res) {
        const { email, passWord } = req.body;

        if (!email || !passWord) return res.send({ error: 'Dados insuficientes!' });

        users.findOne({ email }, (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            else if (!data) {
                return res.status(400).json({ error: "Usuário não registrado!" });
            }
            else {
                bcrypt.compare(passWord, data.passWord, (err, same) => {
                    if (!same) {
                        return res.status(401).json({ error: "Senha incorreta!" });
                    }
                    else {
                        data.passWord = undefined; console.log(data._id);
                        return res.status(200).json({ data, token: createUserToken(data._id) });
                    }
                });
            }
        }).select('+passWord');
    }
}

module.exports = new UserController();