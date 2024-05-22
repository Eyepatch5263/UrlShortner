const express=require('express')
const {SignUpUser,LoginUser} = require('../Controllers/user')
const router=express.Router()

router.post('/',SignUpUser)
router.post('/login',LoginUser)
module.exports=router