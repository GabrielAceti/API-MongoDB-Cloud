const mongoose = require('../../data/index');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
email: {type: String, require: true, unique: true, lowercase: true},
passWord: {type: String, require: true, select: false },
createdAt: {type: Date, default: Date.now }
});

userSchema.pre('save', async function (next) {
    let user = this;
    if(!user.isModified('passWord')) return next();

    await bcrypt.hash(user.passWord, 10, (err, encrypted) => {
        if(!err){
            user.passWord = encrypted;
            return next();
        }
        else{
            console.log(err);
        }
        
    });
});

module.exports = mongoose.model('User', userSchema);