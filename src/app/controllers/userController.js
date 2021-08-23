
const users = require('../models/user');
const bcrypt = require('bcrypt');

class UserController {

    async post(req, res) {
       
        try {           
            const createdUser = await users.create(req.body);
            return res.status(200).json(createdUser);
        }
        catch (err) {
            return res.status(400).json(err);
        }

    }

    async get(req, res) {
        try {
            const user = await users.find();            
            return res.status(200).json(user);
        }
        catch (err) {
            return res.status(400).json(err);
        }
    }

    async findOne(req, res){
        const { _id } = req.query;

        try{
            const user = await users.findOne({ _id });
            return res.status(200).json(user);
        }
        catch(err){
            return res.status(400).json(err);
        }
    }

    async auth(req, res){
        const {email, passWord} = req.body;

        if(!email || !passWord) return res.send({error: 'Dados insuficientes!'});

        users.findOne({email}, (err, data) => {
            if(err){
                return res.status(400).json(err);
            }
            else if(!data){
                return res.status(200).json({error: "Usuário não registrado!"});
            }
            else{
                bcrypt.compare(passWord, data.passWord, (err, same) => {
                    if(!same){
                        return res.status(400).json({error: "Senha incorreta!"});
                    }
                    else{
                        data.passWord = undefined;
                        return res.status(200).json(data);
                    }
                });
            }
        }).select('+passWord');
    }
}

module.exports = new UserController();