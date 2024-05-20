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
    const url=body.url
    
    if(!found){
        return res.status(400).json({
            success:false,
            error:"URL already exists"
        })
    }
    else{
        const shortId=short.generate()
        await URL.create({
            shortId:shortId,
            RedirectUrl:body.url,
            visitHistory:[]
        })
        return res.json({id:shortId})
    }
    
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