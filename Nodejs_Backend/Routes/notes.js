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
        tag:req.body.tag,
        user:req.user.id
        
      })
      res.send(note)
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
    const {title,description,tag}=req.body
    const updatednote={}
    if(title){
        updatednote.title=title
    }
    if(description){
        updatednote.description=description
    }
    if(tag){
        updatednote.tag=tag
    }

    let note=await Notes.findById(req.params.id)
    if(!note){
        return res.status(404).send("not found")
    }
    if(note.user.toString()!=req.user.id){
        return res.status(404).send("can't update")
    }
    note= await Notes.findByIdAndUpdate(req.params.id,{$set:updatednote},{new:true})
    res.send({note})

})


// Route:4 delete note using delete method
Router.delete('/deletenote/:id',getuser,async (req,res)=>{
    
    let note=await Notes.findById(req.params.id)
    if(!note){
        return res.status(404).send("not found")
    }
    if(note.user.toString()!=req.user.id){
        return res.status(404).send("can't update")
    }
    note= await Notes.findByIdAndDelete(req.params.id)
    res.send("succesfully deleted")

})

module.exports=Router
