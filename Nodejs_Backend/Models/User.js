const mongoose=require('mongoose')
const { Schema } = mongoose;

const User= new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    time:{
        type: Date,
        default: Date.now
    }

})
const user=mongoose.model('user',User)
// user.createIndexes()
module.exports=user