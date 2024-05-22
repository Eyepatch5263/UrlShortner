const express=require("express")
const router=express.Router()
const URL=require("../Models/url")


router.get('/',async(req,res)=>{
    const currUser=req.user
    if(!currUser){
        return res.redirect("/login")
    }
    console.log(currUser._id)
    const allUrls=await URL.find({createdBy:currUser._id})
    console.log(allUrls)
    res.render("home",{urls:allUrls})
})

router.get('/signup',async(req,res)=>{
    res.render("signup")
})

router.get('/login',async(req,res)=>{
    res.render("login")
})
module.exports=router