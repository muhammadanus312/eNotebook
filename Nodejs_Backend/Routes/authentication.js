const express=require('express')
const Router=express.Router()
const User=require('../Models/User')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const getuser=require('../middleware/getuser')
const { body, validationResult } = require('express-validator');
let JWT_SECRET='iamanas'

//Route:1 create user using post method 
Router.post('/createuser',[
    body('name','enter valid email address').isLength({min:4}),
    body('email','enter valid email address').isEmail(),
    body('password').isLength({min:5}),
],async (req,res)=>{
    let output=false
    //if validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //chaeck users exist or not
    let user= await User.findOne({email:req.body.email})
    console.log(user)
    if(user){
        res.status(400).json({error:true})
    }

    let salt= await bcrypt.genSalt(10)
    let securepassword= await bcrypt.hash(req.body.password,salt)

    //add data in user
    user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securepassword,
      })
    
    let data={
        user:{
            id:user.id
        }
    }
      const token=jwt.sign(data,JWT_SECRET)
      output=true
      res.send({output})
    })


//Route 2: Authenticate user (login required)
Router.post('/login',[
    body('email','enter valid email address').isEmail(),
    body('password','password can\'t be blank').exists()
],async (req,res)=>{
    //if validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const{email,password}=req.body
    try{
        let output=false
        let user= await User.findOne({email:req.body.email})
        if(!user){
            res.status(400).json({error:"Email or password invalid"})
        }
        const pass=await bcrypt.compare(password,user.password)
        if(!pass){
            res.status(400).json({error:"Email or password invalid"})
        }

        // let data=user.id
        let data={
            user:{
                id:user.id
            }
        }
        const token=jwt.sign(data,JWT_SECRET)
        output=true
        res.json({token,output})
    }
    catch(err){
        console.error(error.message)
        res.ststus(500).send("server error")
    }
})



// Router 3:  get user using token
Router.post('/getuser',getuser,async (req,res)=>{
    
    try{
        let userid=req.user.id
        console.log()
        let user= await User.findOne({_id:userid}).select("-password")
        res.send(user)
        
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("server error")
    }
})

module.exports=Router
