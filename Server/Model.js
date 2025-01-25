const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String

})

const Login = mongoose.model("login",loginSchema)

module.exports = Login