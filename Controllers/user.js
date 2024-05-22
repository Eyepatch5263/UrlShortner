const User = require("../Models/user")
const {v4:uuidv4}=require("uuid")
const {setUser, getUser}=require('../service/auth')

const SignUpUser=async(req,res)=>{
    const {name,email,password}=req.body
    await User.create({
        name,
        email,
        password
    })

    res.redirect('/login')
}

const LoginUser=async(req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email,password})

    if(!user){
        res.render('login',{error:"Your email or password is wrong"})
        
    }
    else{
    const sessionId=uuidv4()
    setUser(sessionId,user)
    res.cookie('uuid',sessionId)
    return res.redirect('/')
    
    }
    
}

module.exports={SignUpUser,LoginUser}