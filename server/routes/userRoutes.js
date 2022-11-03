//importing modules
const express = require('express')
const userController = require('../controllers/userController')
const userAuth = require('../middlewares/userAuth')

const router = express.Router()

//signup / login route endpoint
//passing the middleware function to the signup (checking duplicate username)
router.post('/signup', userAuth.checkUsername, userController.signup)
router.post('/login', userController.login)
router.get('/logout', userController.logout)


module.exports = router