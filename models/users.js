const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username: String,
    password: String,
    admin: {type: Boolean, required: false, default: false}
})

module.exports = mongoose.model('register', userSchema, 'register')
