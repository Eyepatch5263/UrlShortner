const {getUser}=require("../service/auth")


const restrictToLoggedInUser=async(req,res,next)=>{
    const userId=req.cookies.uuid
    if(!userId){
        return res.redirect('/login')
    }
    const user=getUser(userId)
    if(!user){
        return res.redirect('/login')
    }
    req.user=user
    next()

}

const checkAuth=async(req,res,next)=>{
    const userId=req.cookies.uuid
    const user=getUser(userId)
    req.user=user
    next()
}

module.exports={restrictToLoggedInUser,checkAuth}