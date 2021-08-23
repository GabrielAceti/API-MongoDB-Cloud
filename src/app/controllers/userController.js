
const users = require('../models/user');

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
}

module.exports = new UserController();