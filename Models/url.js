const mongoose=require("mongoose")

const UrlSchema= new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    RedirectUrl:{
        type:String,
        required:true
    },
    visitHistory:
        [{timeStamp:Number}],

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }

},{timeStamps:true})

const URL=mongoose.model("URL",UrlSchema)

module.exports=URL;