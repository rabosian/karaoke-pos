//importing modules
const express = require('express')
const authController = require('../controllers/authController')
const userAuth = require('../middlewares/userAuth')

const router = express.Router()

//passing the middleware function to the signup (checking duplicate username)
router.post('/signup', userAuth.checkUsername, authController.signup)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

router.get('/', authController.getEmployees)
router.get('/:id', authController.getEmployeeById)
router.put('/update/:id', userAuth.checkUsername, authController.updateEmployee)
router.delete('/delete/:id', authController.deleteEmployee)


module.exports = router