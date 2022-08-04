const express=require('express')
const router=express.Router()

const {register,login,getUser}=require('../controllers/user.controller');
const { authenticateUser } = require('../middleware/isAuthenticated');


router.post('/login',login);
router.post('/register',authenticateUser,register)
router.get('/',getUser)


module.exports=router