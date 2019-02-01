const mongoose = require('mongoose')

const { Schema } = mongoose

const user = Schema({
    email: {
        type: String,
        required:true,
        unique:true
    },
    firstName: {
        type: String,
        required:true,
    },
    lastName: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required: true,
    },
    imageSrc: {
        type: String,
        default: ""
    }

})

module.exports = mongoose.model('user', user)
