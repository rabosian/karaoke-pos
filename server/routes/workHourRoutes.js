//importing modules
const express = require('express')
const workHourController = require('../controllers/workHourController')

const router = express.Router()

router.get('/', workHourController.workHour_get)
router.post('/create', workHourController.workHour_post)
router.put('/update/:id', workHourController.workHour_update)
router.delete('/delete/:id', workHourController.workHour_delete)

module.exports = router