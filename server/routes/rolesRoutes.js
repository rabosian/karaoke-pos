//importing modules
const express = require('express')
const rolesController = require('../controllers/rolesController')

const router = express.Router()

router.get('/', rolesController.roles_get)
router.post('/create', rolesController.roles_post)
router.put('/update/:id', rolesController.roles_update)
router.delete('/delete/:id', rolesController.roles_delete)

module.exports = router