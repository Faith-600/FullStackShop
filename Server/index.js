require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const cors = require ('cors')

const loginModel = require('./Model')


const app = express()
app.use(cors())
app.use(express.json())

const port =process.env.PORT || 3001;
const mongoConnectionString = process.env.URI
mongoose.connect(mongoConnectionString)


.then(()=>{
    console.log("mongoose connected");

    app.listen(port, ()=>{
        console.log("server is running on port" + port)

    });

}).catch((err)=>{
    console.log("Error connecting to mongdb",err)
})

app.post('/sign',(req,res)=>{
    const {email,password}= req.body

    loginModel.findOne({email:email})
    .then(user=>{
        if(user){
          if(user.password === password){
            res.json({ status: "success", name: user.name });
          }else{
            res.json({ status: "error", message: "The password is incorrect" });
          }
        }else{
          res.json({ status: "error", message: "No records existed" })
          }
    })
})

app.post('/logins',(req,res)=>{
   const {name,email,password} =req.body


   loginModel.findOne({email:email})
   .then(user=>{
    if(user){
        res.json("Already have an account")
    }else{
      loginModel.create({name:name,email:email,password:password})
      .then(result=>res.json('account created'))
      .catch(err=>res.json(err))  
    }
   
}).catch(err=>res.json(err))
})



  


// app.listen(3001,()=>{
//     console.log("server is running")
// })