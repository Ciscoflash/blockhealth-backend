const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    phone: {
        required: true,
        type: Number
    },
    city: {
        type: String,
        required: true,
    },
})

const User = mongoose.model('User', userSchema);

module.exports = User;
