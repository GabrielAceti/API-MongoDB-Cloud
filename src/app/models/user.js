const mongoose = require('../../data/index');

const userSchema = new mongoose.Schema({
email: {type: String, require: true, unique: true, lowercase: true},
passWord: {type: String, require: true, select: false },
createdAt: {type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);