const express=require('express')
const Router=express.Router()
const { body, validationResult } = require('express-validator');
const Notes=require('../Models/Notes')
const getuser=require('../middleware/getuser');
const { findById, findByIdAndUpdate } = require('../Models/Notes');
const { findOneAndUpdate } = require('../Models/User');

//Route:1 get all notes using get method 

Router.get('/getallnotes',getuser,async (req,res)=>{
    const notes=await Notes.find({user:req.user.id})
    res.json(notes)
})


// Route:2 add note using post method
Router.post('/addnote',getuser,[
    body('title','enter valid title').isLength({min:4}),
    body('description','enter valid description').isLength({min:5})
],async (req,res)=>{
    let output=false
    // const {title,description,tag}=req.body
    //if validation error
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    // addnote
    const note=await Notes.create({
        title: req.body.title,
        description: req.body.description,
        user:req.user.id
        
      })
      output=true
      res.send({note,output})
    } catch (error) {
        console.error(error.message)
        // res.status(500).send("server error")
    }
    
    
})
// Route:3 update note using put method
Router.put('/updatenote/:id',getuser,[
    body('title','enter valid title').isLength({min:4}),
    body('description','enter valid description').isLength({min:5})
],async (req,res)=>{
    const {title,description}=req.body
    const updatednote={}
    let output=false
    if(title){
        updatednote.title=title
    }
    if(description){
        updatednote.description=description
    }

    let note=await Notes.findById(req.params.id)
    if(!note){
        return res.status(404).send("not found")
    }
    if(note.user.toString()!=req.user.id){
        return res.status(404).send("can't update")
    }
    note= await Notes.findByIdAndUpdate(req.params.id,{$set:updatednote},{new:true})
    output=true
    res.send({note,output})

})


// Route:4 delete note using delete method
Router.delete('/deletenote/:id',getuser,async (req,res)=>{
    let output=false
    let note=await Notes.findById(req.params.id)
    if(!note){
        return res.status(404).send("not found")
    }
    if(note.user.toString()!=req.user.id){
        return res.status(404).send("can't update")
    }
    note= await Notes.findByIdAndDelete(req.params.id)
    output=true
    res.send({output})

})

module.exports=Router
