const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    "username": {
        type: String,
        required: true,
        unique: true
    },
    "firstName": {
        type: String,
        required: true
    },
    "lastName": {
        type: String,
        required: true
    },
    "password": {
        type: String,
        required: true,
        validate: {
            validator: (password) => password.length >= 8,
            message: "Must be at least 8 characters"
        }
    },
    "createdAt": {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;