const express=require("express")
const router=express.Router()
const {handleGenerateNewShortURL,getAnalytics}=require("../Controllers/url")

router.post('/',handleGenerateNewShortURL)

router.get('/analytics/:shortId',getAnalytics)

module.exports=router