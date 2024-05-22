const express=require("express")
const path=require("path")
const PORT=8000
const app=express()
const {ConnectMongoDb}=require("./connection")
const URL=require('./Models/url')
const cookieParser=require('cookie-parser')
const {checkAuth,restrictToLoggedInUser}=require('./middleware/auth')

const urlRoute=require("./Routes/url")
const StaticRouter=require('./Routes/StaticRouter')
const userRoute=require('./Routes/user')


ConnectMongoDb("mongodb+srv://<password>@cluster0.d1jhb3w.mongodb.net/ShortUrl")

app.set("view engine","ejs")
app.set('views',path.resolve('./views'))

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false})) //this middle ware is used to parse data that is coming from a form(form data)
app.use(cookieParser())


app.use('/url',restrictToLoggedInUser ,urlRoute)
app.use('/user',userRoute)
app.use('/',checkAuth,StaticRouter)


app.get("/test",async(req,res)=>{
    const allUrls=await URL.find({})
    res.render('home',{
        urls:allUrls
    })
})
app.get("/url/:shortId",async(req,res)=>{
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
