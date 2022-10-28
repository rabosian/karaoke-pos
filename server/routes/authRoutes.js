const { Router } = require('express')
const authController = require("../controllers/authController")

const router = Router()

router.post('/api/login', authController.login)

router.post('/api/signup', authController.signup)

// router.put('/api/employees/:id', authController)
// router.delete('/api/employees/:id')

module.exports = router