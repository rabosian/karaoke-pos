//importing modules
const express = require('express')
const roomsController = require('../controllers/roomsController')

const router = express.Router()

router.get('/', roomsController.rooms_get)
router.post('/create', roomsController.rooms_post)
router.put('/update/:id', roomsController.rooms_update)
router.delete('/delete/:id', roomsController.rooms_delete)

module.exports = router