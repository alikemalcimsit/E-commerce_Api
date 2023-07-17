const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },

    desc:{
        type:String,
        required:true
    },

    photos:{
        type:[String],
    
    },
    
    rating:{
        type:Number,
        min:0,
        max:5
    },

    price:{
        type:Number,
        required:true
    }


},{timestamps:true})


module.exports = mongoose.model("product", productSchema)