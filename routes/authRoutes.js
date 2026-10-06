const express = require('express')
const router = express.router()
const{registeredUser,loginUser, regUser}=require('../middleware/controller/authController')

router.post('/register',regUser)
router.post('./login',loginUser)

module.exports=router