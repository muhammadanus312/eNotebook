const mongoose=require('mongoose')
const uri='mongodb://localhost:27017/notebook'
const dbConnect=async ()=>{
    await mongoose.connect(uri,()=>{
        console.log("connected")
    })
}
module.exports=dbConnect