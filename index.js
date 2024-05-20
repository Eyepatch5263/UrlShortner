const express=require("express")
const mongoose=require("mongoose")
const PORT=8000
const urlRoute=require("./Routes/url")
const app=express()
const {ConnectMongoDb}=require("./connection")
const URL=require('./Models/url')
app.use(express.json())

ConnectMongoDb("mongodb+srv://Eyepatch:<password>@cluster0.d1jhb3w.mongodb.net/ShortUrl")

app.use('/url',urlRoute)

app.get("/:shortId",async(req,res)=>{
    const shortId=req.params.shortId
    const url=await URL.findOneAndUpdate(
        {shortId},
        {
            $push:{
                visitHistory:{timeStamp:Date.now()}
            },
        }
    )
    if(url){
        res.redirect(url.RedirectUrl)
    }else{
        res.send("url not found")
    }
})
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
