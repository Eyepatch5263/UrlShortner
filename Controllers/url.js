const short=require("short-uuid")
const URL=require('../Models/url')

const handleGenerateNewShortURL=async(req,res)=>{
    
    const body=req.body
    if(!body.url){
        return res.status(400).json({
            success:false,
            error:"You must provide a URL"
        })
    }
    
        const shortId=short.generate()
        await URL.create({
            shortId:shortId,
            RedirectUrl:body.url,
            visitHistory:[],
            createdBy:req.user._id
        })
        const temp=res.locals.id=shortId
        console.log(temp)
        res.render('home',{shortId})
        // return res.send(`<h1>${`http://localhost:8000/url/${temp}`}</h1>`)
    
    
}

const getAnalytics=async(req,res)=>{
    const shortId=req.params.shortId
    const result=await URL.findOne({shortId})
    res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory})
}

module.exports={
    handleGenerateNewShortURL,
    getAnalytics
}