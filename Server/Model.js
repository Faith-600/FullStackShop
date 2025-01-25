<<<<<<< HEAD
const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String

})

const Login = mongoose.model("login",loginSchema)

module.exports = Login
=======

>>>>>>> 3095e055b233452b3eb2bfe5ddc82c6f173a48c6
