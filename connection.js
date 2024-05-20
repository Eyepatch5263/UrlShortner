const mongoose=require("mongoose")

const ConnectMongoDb=(url)=>{
    mongoose.connect(url)
    mongoose.connection.on("connected",()=>{
        console.log("connected to mongodb")
    })
    mongoose.connection.on("error",(err)=>{
        console.log("error",err)
    })
}

module.exports={
    ConnectMongoDb
}