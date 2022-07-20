const mongoose=require('mongoose')
const { Schema } = mongoose;

const Notes= new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    tag:{
        type:String,
        default:"general"
    },
    time:{
        type: Date,
        default: Date.now
    }

})

module.exports=mongoose.model('notes',Notes)
